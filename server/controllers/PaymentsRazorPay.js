const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/sendMail");
const coursePurchasedEmail = require("../mails/coursePurchasedEmail");
const crypto = require("crypto");

exports.capturePayments = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Checking if user is already enrolled
    const user = await User.findById(userId);
    if (user.courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // Creating Razorpay order
    const amount = course.price * 100; //ye paise mai hota haai issliye multiply by 100
    const currency = "INR";
    const options = {
      amount,
      currency,
      receipt: `receipt_${Math.random().toString(36).substring(2, 10)}`,
      notes: {
        courseId: courseId,
        userId: userId,
      },
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
      courseName: course.title,
      courseDescription: course.description,
      thumbnail: course.thumbnail,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error in capturePayments:", error);
    res.status(500).json({
      success: false,
      message: "Unable to initiate order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const razorpaySignature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (razorpaySignature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature. Unauthorized webhook request.",
      });
    }

    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    if (event === "payment.captured") {
      const userId = payment.notes?.userId;
      const courseId = payment.notes?.courseId;

      if (!userId || !courseId) {
        return res
          .status(400)
          .json({ success: false, message: "Missing data in notes." });
      }

      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user || !course) {
        return res
          .status(404)
          .json({ success: false, message: "User or Course not found." });
      }

      // Add course to user
      user.courses.push(courseId);
      await user.save();

      // Add user to course
      course.studentsEnrolled.push(userId);
      await course.save();

      // Compose and send email
      const courseLink = `https://brainn.com/course/${course._id}`;
      const emailBody = coursePurchasedEmail(
        user.firstName,
        course.title,
        courseLink
      );

      await mailSender(user.email, "🎉 You’re enrolled!", emailBody);

      return res.status(200).json({
        success: true,
        message: "Payment verified, course enrolled, and email sent.",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Unhandled webhook event type." });
  } catch (error) {
    console.error("Webhook verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while verifying signature.",
    });
  }
};

// router.post("/razorpay/webhook", express.json({ type: "*/*" }), verifyWebhook);
