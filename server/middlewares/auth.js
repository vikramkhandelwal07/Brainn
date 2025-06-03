require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// <======= Middleware: isAuthenticated  =======> 


exports.auth = async (req, res, next) => {
  try {
    // Get token from headers
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token missing, please login" });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong during authentication",
      });
  }
};

// <======= Middleware: isStudent  =======> 


exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res
        .status(403)
        .json({ success: false, message: "Access restricted to students" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error validating student role" });
  }
};

// <======= Middleware: isInstructor  =======> 

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res
        .status(403)
        .json({ success: false, message: "Access restricted to instructors" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error validating instructor role" });
  }
};


// <======= Middleware: isAdmin  =======> 

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access restricted to admins" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error validating admin role" });
  }
};
