const User = require("../models/User");
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/sendMail");
const otpTemplate = require("../mails/emailVerificationTemplate");
// SendOtp
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // 2. Generate unique OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let existingOtp = await Otp.findOne({ otp });
    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOtp = await Otp.findOne({ otp });
    }

    // 3. Save OTP in DB
    const otpPayload = { email, otp };
    await Otp.create(otpPayload);
    await mailSender(email, "OTP Verification - Brainn", otpTemplate(otp));

    // 4. Respond
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
    });
  }
};

// signup controllers

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !contactNumber ||
      !otp
    ) {
      return res.status(403).json({
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp || otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please enter the latest OTP.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: contactNumber,
      about: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalInfo: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error in signUp:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in both email and password",
      });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email }).populate("additionalInfo");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered. Please sign up first.",
      });
    }

    // 3. Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 4. Generate JWT token - FIXED: Use consistent field names
    const payload = {
      id: user._id, // Use 'id' for consistency
      _id: user._id, // Keep _id as backup
      email: user.email,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Debug log to verify token structure
    console.log("JWT Payload:", payload);
    console.log("Token created successfully");

    user.token = token;
    user.password = undefined;

    // 5. Send cookie and response
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        token,
        user,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, login failure please try again",
    });
  }
};
// controller for changing password

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password, newPassword, confirmNewPassword } = req.body;

    if (!password || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    const user = await User.findById(userId);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await mailSender(
      user.email,
      "Password Changed Successfully",
      `<p>Your password was changed successfully at ${new Date().toLocaleString()}.</p>`
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while changing password",
    });
  }
};
