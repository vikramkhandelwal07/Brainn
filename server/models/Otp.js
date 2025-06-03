const mongoose = require("mongoose");
const mailSender = require("../utils/sendMail");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes
  },
});

async function sendOtpVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification email from Brainn Team",
      otp
    );
    console.log("Mail sent successfully:", mailResponse);
  } catch (err) {
    console.error("Error sending OTP email:", err);
  }
}

otpSchema.pre("save", async function (next) {
  await sendOtpVerificationEmail(this.email, this.otp);
  next(); 
});

module.exports = mongoose.model("Otp", otpSchema);
