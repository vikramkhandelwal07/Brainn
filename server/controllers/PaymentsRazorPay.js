const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/sendMail");
const mongoose = require("mongoose");
const { courseEnrollmentEmail } = require("../mails/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mails/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

// Capture the payment and initiate the Razorpay order
exports.capturePayments = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  console.log("[CAPTURE PAYMENTS] Starting payment capture");
  console.log("[CAPTURE PAYMENTS] User ID:", userId);
  console.log("[CAPTURE PAYMENTS] Courses:", courses);

  // Check if courses array exists and has content
  if (!courses || courses.length === 0) {
    console.log("[CAPTURE PAYMENTS] No courses provided");
    return res.json({ success: false, message: "Please Provide Course ID" });
  }

  let total_amount = 0;

  for (const course_id of courses) {
    let course;
    try {
      console.log(`[CAPTURE PAYMENTS] Processing course ID: ${course_id}`);

      // Find the course by its ID
      course = await Course.findById(course_id);
      console.log(
        "[CAPTURE PAYMENTS] Found course:",
        course ? course.courseName : "Not found"
      );

      // If the course is not found, return an error
      if (!course) {
        console.log(`[CAPTURE PAYMENTS] Course not found for ID: ${course_id}`);
        return res.status(404).json({
          success: false,
          message: "Could not find the Course",
        });
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      console.log("[CAPTURE PAYMENTS] User ObjectId:", uid);
      console.log(
        "[CAPTURE PAYMENTS] Students enrolled:",
        course.studentsEnrolled
      );

      if (course.studentsEnrolled.includes(uid)) {
        console.log("[CAPTURE PAYMENTS] Student already enrolled");
        return res.status(400).json({
          success: false,
          message: "Student is already Enrolled",
        });
      }

      // Add the price of the course to the total amount
      console.log(`[CAPTURE PAYMENTS] Course price: ${course.price}`);
      total_amount += course.price;
      console.log(`[CAPTURE PAYMENTS] Total amount so far: ${total_amount}`);
    } catch (error) {
      console.error("[CAPTURE PAYMENTS] Error in course processing:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  console.log(`[CAPTURE PAYMENTS] Final total amount: ${total_amount}`);

  const options = {
    amount: total_amount * 100, // Amount in paise
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  console.log("[CAPTURE PAYMENTS] Razorpay options:", options);

  try {
    // Check if Razorpay instance is properly configured
    if (!instance) {
      throw new Error("Razorpay instance not configured");
    }

    console.log("[CAPTURE PAYMENTS] Creating Razorpay order...");
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log("[CAPTURE PAYMENTS] Razorpay response:", paymentResponse);

    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.error("[CAPTURE PAYMENTS] Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Could not initiate order.",
      error: error.message,
    });
  }
};

// Verify the payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;
    const userId = req.user.id;

    console.log("[VERIFY PAYMENT] Starting payment verification");
    console.log("[VERIFY PAYMENT] Request body:", req.body);
    console.log("[VERIFY PAYMENT] User ID:", userId);

    // Validate required fields
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      console.log("[VERIFY PAYMENT] Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Payment Failed - Missing required fields",
      });
    }

    // Create signature for verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("[VERIFY PAYMENT] Generated signature:", expectedSignature);
    console.log("[VERIFY PAYMENT] Received signature:", razorpay_signature);

    if (expectedSignature === razorpay_signature) {
      console.log("[VERIFY PAYMENT] Signature verified successfully");
      // Enroll students
      await enrollStudents(courses, userId, res);
    } else {
      console.log("[VERIFY PAYMENT] Signature verification failed");
      return res.status(400).json({
        success: false,
        message: "Payment Failed - Invalid signature",
      });
    }
  } catch (error) {
    console.error("[VERIFY PAYMENT] Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// Enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  console.log("[ENROLL STUDENTS] Starting enrollment process");
  console.log("[ENROLL STUDENTS] Courses:", courses);
  console.log("[ENROLL STUDENTS] User ID:", userId);

  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Course ID and User ID",
    });
  }

  try {
    const enrolledCourses = [];

    for (const courseId of courses) {
      console.log(`[ENROLL STUDENTS] Processing course: ${courseId}`);

      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        console.error(`[ENROLL STUDENTS] Course not found: ${courseId}`);
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      console.log(
        "[ENROLL STUDENTS] Updated course:",
        enrolledCourse.courseName
      );

      const courseProgress = await CourseProgress.create({
        courseId: courseId, 
        userId: userId,
        completedVideos: [],
      });

      console.log(
        "[ENROLL STUDENTS] Created course progress:",
        courseProgress._id
      );

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      if (!enrolledStudent) {
        console.error(`[ENROLL STUDENTS] User not found: ${userId}`);
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      console.log(
        "[ENROLL STUDENTS] Updated student courses count:",
        enrolledStudent.courses.length
      );

      enrolledCourses.push(enrolledCourse);

      // Send enrollment email
      try {
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        );
        console.log(
          "[ENROLL STUDENTS] Enrollment email sent:",
          emailResponse.response
        );
      } catch (emailError) {
        console.error(
          "[ENROLL STUDENTS] Failed to send enrollment email:",
          emailError
        );
        // Don't fail the enrollment if email fails
      }
    }

    console.log(
      `[ENROLL STUDENTS] Successfully enrolled in ${enrolledCourses.length} courses`
    );

    // Send success response after all courses are processed
    return res.status(200).json({
      success: true,
      message: "Payment Verified and Student Enrolled Successfully",
      data: {
        enrolledCourses: enrolledCourses.length,
        courses: enrolledCourses.map((course) => ({
          id: course._id,
          name: course.courseName,
        })),
      },
    });
  } catch (error) {
    console.error("[ENROLL STUDENTS] Error:", error);
    return res.status(500).json({
      success: false,
      message: "Enrollment failed",
      error: error.message,
    });
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    console.log("[PAYMENT SUCCESS EMAIL] Request received");
    console.log("[PAYMENT SUCCESS EMAIL] User ID:", userId);
    console.log("[PAYMENT SUCCESS EMAIL] Order ID:", orderId);
    console.log("[PAYMENT SUCCESS EMAIL] Payment ID:", paymentId);
    console.log("[PAYMENT SUCCESS EMAIL] Amount:", amount);

    // Validate required fields
    if (!orderId || !paymentId || !amount || !userId) {
      console.log("[PAYMENT SUCCESS EMAIL] Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    // Find the user
    const enrolledStudent = await User.findById(userId);
    if (!enrolledStudent) {
      console.log("[PAYMENT SUCCESS EMAIL] User not found");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("[PAYMENT SUCCESS EMAIL] Found user:", enrolledStudent.email);

    // Send payment success email
    const emailResponse = await mailSender(
      enrolledStudent.email,
      `Payment Received - Welcome to Brainn!`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100, // Convert from paise to rupees
        orderId,
        paymentId
      )
    );

    console.log(
      "[PAYMENT SUCCESS EMAIL] Email sent successfully:",
      emailResponse.response
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent successfully",
    });
  } catch (error) {
    console.error("[PAYMENT SUCCESS EMAIL] Error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not send email",
      error: error.message,
    });
  }
};
