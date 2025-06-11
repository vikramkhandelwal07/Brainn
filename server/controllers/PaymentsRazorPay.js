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
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" });
  }

  let total_amount = 0;

  for (const course_id of courses) {
    let course;
    try {
      // Find the course by its ID
      course = await Course.findById(course_id);

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" });
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }

      // Add the price of the course to the total amount
      total_amount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." });
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
    await enrollStudents(courses, userId, res);
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }

  return res.status(200).json({ success: false, message: "Payment Failed" });
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

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Course ID and User ID",
    });
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" });
      }
      console.log("Updated course: ", enrolledCourse);

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
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
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }
};

// const express = require("express");
// const { instance } = require("../config/razorpay");
// const Course = require("../models/Course");
// const User = require("../models/User");
// const mailSender = require("../utils/sendMail");
// const coursePurchasedEmail = require("../mails/coursePurchasedEmail");
// const crypto = require("crypto");
// const router = express.Router();

// exports.capturePayments = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const userId = req.user.id;

//     if (!courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Course ID is required",
//       });
//     }

//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     // Checking if user is already enrolled
//     const user = await User.findById(userId);
//     if (user.courses.includes(courseId)) {
//       return res.status(400).json({
//         success: false,
//         message: "You are already enrolled in this course",
//       });
//     }

//     // Creating Razorpay order
//     const amount = course.price * 100; //ye paise mai hota haai issliye multiply by 100
//     const currency = "INR";
//     const options = {
//       amount,
//       currency,
//       receipt: `receipt_${Math.random().toString(36).substring(2, 10)}`,
//       notes: {
//         courseId: courseId,
//         userId: userId,
//       },
//     };

//     const order = await instance.orders.create(options);

//     res.status(200).json({
//       success: true,
//       message: "Order created successfully",
//       order,
//       courseName: course.title,
//       courseDescription: course.description,
//       thumbnail: course.thumbnail,
//       amount: order.amount,
//       currency: order.currency,
//     });
//   } catch (error) {
//     console.error("Error in capturePayments:", error);
//     res.status(500).json({
//       success: false,
//       message: "Unable to initiate order",
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   try {
//     const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
//     const razorpaySignature = req.headers["x-razorpay-signature"];

//     const expectedSignature = crypto
//       .createHmac("sha256", webhookSecret)
//       .update(JSON.stringify(req.body))
//       .digest("hex");

//     if (razorpaySignature !== expectedSignature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature. Unauthorized webhook request.",
//       });
//     }

//     const event = req.body.event;
//     const payment = req.body.payload.payment.entity;

//     if (event === "payment.captured") {
//       const userId = payment.notes?.userId;
//       const courseId = payment.notes?.courseId;

//       if (!userId || !courseId) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Missing data in notes." });
//       }

//       const user = await User.findById(userId);
//       const course = await Course.findById(courseId);

//       if (!user || !course) {
//         return res
//           .status(404)
//           .json({ success: false, message: "User or Course not found." });
//       }

//       // Add course to user
//       user.courses.push(courseId);
//       await user.save();

//       // Add user to course
//       course.studentsEnrolled.push(userId);
//       await course.save();

//       // Compose and send email
//       const courseLink = `https://brainn.com/course/${course._id}`;
//       const emailBody = coursePurchasedEmail(
//         user.firstName,
//         course.title,
//         courseLink
//       );

//       await mailSender(user.email, "🎉 You’re enrolled!", emailBody);

//       return res.status(200).json({
//         success: true,
//         message: "Payment verified, course enrolled, and email sent.",
//       });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Unhandled webhook event type." });
//   } catch (error) {
//     console.error("Webhook verification error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error while verifying signature.",
//     });
//   }
// };

// // router.post("/razorpay/webhook", express.json({ type: "*/*" }), verifyWebhook);
