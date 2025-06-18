/* eslint-disable no-undef */
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/sendMail");
const mongoose = require("mongoose");
const { courseEnrollmentEmail } = require("../mails/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mails/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayments = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (!courses || courses.length === 0) {
    return res.json({ success: false, message: "Please Provide CourseId" });
  }

  let total_amount = 0;

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      console.log(
        "[CAPTURE PAYMENTS] Found course:",
        course ? course.courseName : "Not found"
      );
      if (!course) {
        console.log(`[CAPTURE PAYMENTS] Course not found for ID: ${course_id}`);
        return res.status(404).json({
          success: false,
          message: "Could not find the Course",
        });
      }
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student is already Enrolled",
        });
      }
      total_amount += course.price;
      console.log(`[CAPTURE PAYMENTS] Total amount so far: ${total_amount}`);
    } catch (error) {
      console.error("[CAPTURE PAYMENTS] Error in course processing:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  console.log(`[CAPTURE PAYMENTS] Final total amount: ${total_amount}`);

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random().toString() + Date.now().toString(), // Fixed: Math.random(Date.now()) is invalid
  };

  try {
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
    // Enhanced debugging
    console.log("DEBUG - Full request body:", JSON.stringify(req.body, null, 2));
    console.log("DEBUG - req.user:", req.user);
    console.log("DEBUG - req.user.id:", req.user?.id);
    console.log("DEBUG - req.user._id:", req.user?._id);

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    
    // More flexible user ID extraction
    const userId = req.user?.id || req.user?._id || req.user?.userId;

    console.log("DEBUG - Extracted values:");
    console.log("- razorpay_order_id:", razorpay_order_id);
    console.log("- razorpay_payment_id:", razorpay_payment_id);
    console.log("- razorpay_signature:", razorpay_signature);
    console.log("- courses:", courses);
    console.log("- userId:", userId);

    // Validation with detailed error messages
    const missingFields = [];
    if (!razorpay_order_id) missingFields.push("razorpay_order_id");
    if (!razorpay_payment_id) missingFields.push("razorpay_payment_id");
    if (!razorpay_signature) missingFields.push("razorpay_signature");
    if (!courses || (Array.isArray(courses) && courses.length === 0)) missingFields.push("courses");
    if (!userId) missingFields.push("userId");

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      return res.status(400).json({
        success: false,
        message: `Payment Failed - Missing required fields: ${missingFields.join(", ")}`,
        debug: {
          received: {
            razorpay_order_id: !!razorpay_order_id,
            razorpay_payment_id: !!razorpay_payment_id,
            razorpay_signature: !!razorpay_signature,
            courses: courses ? courses.length : 0,
            userId: !!userId,
          },
          missing: missingFields,
        },
      });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("DEBUG - Signature verification:");
    console.log("- Expected:", expectedSignature);
    console.log("- Received:", razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.error("Signature verification failed");
      return res.status(400).json({
        success: false,
        message: "Payment verification failed - Invalid signature",
      });
    }

    console.log("✅ Signature verified successfully");

    // Proceed with enrollment
    try {
      const enrolledCourses = await enrollStudents(courses, userId);
      
      console.log("✅ Enrollment successful");
      
      return res.status(200).json({
        success: true,
        message: "Payment verified and courses enrolled successfully",
        data: enrolledCourses,
      });
    } catch (enrollmentError) {
      console.error("❌ Enrollment error:", enrollmentError);
      return res.status(500).json({
        success: false,
        message: enrollmentError.message || "Enrollment failed",
        error: enrollmentError.message,
      });
    }

  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during payment verification",
      error: error.message,
    });
  }
};


exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

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
        amount / 100,
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

// Fixed enrollStudents function - removed unused 'res' parameter
const enrollStudents = async (courses, userId) => {
  if (!courses || !userId) {
    throw new Error("Please Provide Course ID and User ID");
  }

  const enrolledCourses = [];

  for (const courseId of courses) {
    try {
      // Find and update course
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        throw new Error(`Course not found: ${courseId}`);
      }

      // Create course progress
      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      });

      // Update user
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
        throw new Error(`User not found: ${userId}`);
      }

      enrolledCourses.push(enrolledCourse);

      // Send enrollment email - wrapped in try-catch to prevent failure from breaking enrollment
      try {
        await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        );
        console.log(
          `Enrollment email sent for course: ${enrolledCourse.courseName}`
        );
      } catch (emailError) {
        console.error("Failed to send enrollment email:", emailError);
        
      }
    } catch (courseError) {
      console.error(`Error enrolling in course ${courseId}:`, courseError);
      throw courseError; 
    }
  }

  return enrolledCourses;
};
