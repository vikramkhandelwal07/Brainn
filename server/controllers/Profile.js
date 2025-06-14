const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { imageUploadCloudinary } = require("../utils/CloudinaryUploader");
const mongoose = require("mongoose");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Handle both flat and nested data structures
    let profileData = {};

    // Check if data comes in nested format (from your frontend)
    if (req.body.additionalInfo) {
      profileData = req.body.additionalInfo;
    } else {
      // Handle flat format (direct fields)
      const {
        gender = "",
        dateOfBirth = "",
        contactNumber = "",
        about = "",
        location = "",
        socialLinks = {},
      } = req.body;

      profileData = {
        gender,
        dateOfBirth: dateOfBirth,
        contactNumber,
        about,
        location,
        socialLinks,
      };
    }

    // Fetch user and their profile
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profile = await Profile.findById(userDetails.additionalInfo);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Update fields only if they have valid values
    if (profileData.gender && profileData.gender.trim() !== "") {
      profile.gender = profileData.gender;
    }

    if (profileData.dateOfBirth && profileData.dateOfBirth.trim() !== "") {
      profile.dateOfBirth = profileData.dateOfBirth;
    }

    if (profileData.contactNumber && profileData.contactNumber.trim() !== "") {
      profile.contactNumber = profileData.contactNumber;
    }

    if (profileData.about && profileData.about.trim() !== "") {
      profile.about = profileData.about;
    }

    if (profileData.location && profileData.location.trim() !== "") {
      profile.location = profileData.location;
    }

    // Handle social links - only update non-empty values
    if (
      profileData.socialLinks &&
      typeof profileData.socialLinks === "object"
    ) {
      const currentSocialLinks = profile.socialLinks || {};

      if (
        profileData.socialLinks.linkedin &&
        profileData.socialLinks.linkedin.trim() !== ""
      ) {
        currentSocialLinks.linkedin = profileData.socialLinks.linkedin;
      }

      if (
        profileData.socialLinks.github &&
        profileData.socialLinks.github.trim() !== ""
      ) {
        currentSocialLinks.github = profileData.socialLinks.github;
      }

      if (
        profileData.socialLinks.twitter &&
        profileData.socialLinks.twitter.trim() !== ""
      ) {
        currentSocialLinks.twitter = profileData.socialLinks.twitter;
      }

      profile.socialLinks = currentSocialLinks;
    }

    // Also update user's first and last name if provided
    if (req.body.firstName && req.body.firstName.trim() !== "") {
      userDetails.firstName = req.body.firstName;
    }

    if (req.body.lastName && req.body.lastName.trim() !== "") {
      userDetails.lastName = req.body.lastName;
    }

    // Save both profile and user
    await profile.save();
    await userDetails.save();

    // Fetch updated user with populated profile
    const updatedUserDetails = await User.findById(userId)
      .populate("additionalInfo")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    // Handle validation errors specifically
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the profile",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Profile.findByIdAndDelete(user.profile);

    await Course.updateMany(
      { studentsEnrolled: userId },
      { $pull: { studentsEnrolled: userId } }
    );

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting account",
    });
  }
};

exports.getAllDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    // fetching user and populating profile
    const user = await User.findById(userId)
      .populate("additionalInfo")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching user details",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await imageUploadCloudinary(
      displayPicture,
      process.env.FOLDER_STORAGE_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    // Try different user ID sources
    const userId = req.user.id || req.user._id;

    console.log("=== DEBUGGING ENROLLED COURSES ===");
    console.log("req.user:", req.user);
    console.log("userId:", userId);

    // Try multiple query approaches
    let courses = [];

    // Approach 1: Direct match with original userId
    courses = await Course.find({
      studentsEnrolled: userId,
    });

    if (courses.length === 0) {
      // Approach 2: Try with ObjectId conversion
      const objectId = new mongoose.Types.ObjectId(userId);
      courses = await Course.find({
        studentsEnrolled: objectId,
      });
    }

    if (courses.length === 0) {
      // Approach 3: Try with $in operator
      courses = await Course.find({
        studentsEnrolled: {
          $in: [userId, new mongoose.Types.ObjectId(userId)],
        },
      });
    }

    console.log("Found courses:", courses.length);

    // Apply selections and population
    const finalCourses = await Course.find({
      _id: { $in: courses.map((c) => c._id) },
    })
      .select(
        "courseName courseDescription price thumbnail instructor courseContent"
      )
      .populate("instructor", "name email")
      .populate("courseContent");

    return res.json({ enrolledCourses: finalCourses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Also add this helper function to check your data
exports.debugEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    // Get sample courses to see data structure
    const sampleCourses = await Course.find({})
      .limit(5)
      .select("courseName studentsEnrolled");

    // Check if user exists in any course
    const userInCourses = await Course.find({
      $or: [
        { studentsEnrolled: userId },
        { studentsEnrolled: userId.toString() },
        { studentsEnrolled: new mongoose.Types.ObjectId(userId) },
      ],
    }).select("courseName studentsEnrolled");

    return res.json({
      userId,
      userIdType: typeof userId,
      sampleCourses,
      userInCourses,
      totalCourses: await Course.countDocuments(),
    });
  } catch (error) {
    console.error("Debug error:", error);
    return res.status(500).json({ error: error.message });
  }
};


// Instructor dashboard data — summary stats about courses, students, earnings, etc.
exports.instructorDashboard = async (req, res) => {
  try {
    const instructorId = req.user._id;

    // Get all courses taught by this instructor
    const courses = await Course.find({ instructor: instructorId });

    // Calculate total students enrolled across all courses
    const totalStudents = courses.reduce(
      (acc, course) => acc + course.studentsEnrolled.length,
      0
    );

    const totalRevenue = courses.reduce(
      (acc, course) => acc + course.price * course.studentsEnrolled.length,
      0
    );

    return res.json({
      totalCourses: courses.length,
      totalStudents,
      totalRevenue,
      courses,
    });
  } catch (error) {
    console.error("Error loading instructor dashboard:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
