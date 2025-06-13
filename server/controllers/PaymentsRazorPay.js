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
  console.log("=== CAPTURE PAYMENTS DEBUG ===");
  console.log("Request body:", req.body);
  console.log("User ID:", req.user?.id);

  const { courses } = req.body;
  const userId = req.user.id;

  // Check if courses array exists and has content
  if (!courses || courses.length === 0) {
    console.log("No courses provided");
    return res.json({ success: false, message: "Please Provide Course ID" });
  }

  console.log("Courses to process:", courses);

  let total_amount = 0;

  for (const course_id of courses) {
    let course;
    try {
      console.log(`Processing course ID: ${course_id}`);

      // Find the course by its ID
      course = await Course.findById(course_id);
      console.log("Found course:", course ? course.courseName : "Not found");

      // If the course is not found, return an error
      if (!course) {
        console.log(`Course not found for ID: ${course_id}`);
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" });
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      console.log("User ObjectId:", uid);
      console.log("Students enrolled:", course.studentsEnrolled);

      if (course.studentsEnrolled.includes(uid)) {
        console.log("Student already enrolled");
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }

      // Add the price of the course to the total amount
      console.log(`Course price: ${course.price}`);
      total_amount += course.price;
      console.log(`Total amount so far: ${total_amount}`);
    } catch (error) {
      console.log("Error in course processing:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  console.log(`Final total amount: ${total_amount}`);

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  console.log("Razorpay options:", options);
  console.log("Razorpay instance:", instance ? "Available" : "Not available");

  try {
    // Check if Razorpay instance is properly configured
    if (!instance) {
      throw new Error("Razorpay instance not configured");
    }

    console.log("Creating Razorpay order...");
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log("Razorpay response:", paymentResponse);

    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log("Error creating Razorpay order:", error);
    console.log("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    res.status(500).json({
      success: false,
      message: "Could not initiate order.",
      error: error.message, // Add this for debugging
    });
  }
};

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;

  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Enroll students and let it handle the response
    await enrollStudents(courses, userId, res);
  } else {
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }
};

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Course ID and User ID",
    });
  }

  try {
    for (const courseId of courses) {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" });
      }
      console.log("Updated course: ", enrolledCourse);

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      });

      // Find the student and add the course to their list of enrolled courses
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

      console.log("Enrolled student: ", enrolledStudent);

      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Email sent successfully: ", emailResponse.response);
    }

    // Send success response after all courses are processed
    return res.status(200).json({
      success: true,
      message: "Payment Verified and Student Enrolled Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};
