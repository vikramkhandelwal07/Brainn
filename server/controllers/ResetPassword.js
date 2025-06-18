const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/sendMail");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Generate secure token
    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpiresIn = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    const url = `${process.env.FRONTEND_URL}/update-password/${token}`;


    const subject = "Brainn | Password Reset Link";
    const body = `
      <h2>Reset Your Password</h2>
      <p>Click on the link below to reset your password:</p>
      <a href="${url}" style="color:blue;">${url}</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    await mailSender(email, subject, body);

    return res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    console.error("Error in resetPasswordToken:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send reset email",
    });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    // 1. Fetch data
    const { token, password, confirmPassword } = req.body;

    // 2. Validate
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // 3. Find user with the token
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 4. Token time check
    if (user.resetPasswordExpiresIn < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token has expired, please request a new one",
      });
    }

    // 5. Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Update password and remove reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresIn = undefined;
    await user.save();

    // 7. Respond
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
    
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",
    });
  }
};
