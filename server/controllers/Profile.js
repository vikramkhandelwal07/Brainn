const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { imageUploadCloudinary } = require("../utils/CloudinaryUploader");

exports.updateProfile = async (req, res) => {
  try {
    const {
      gender = "",
      dob = "",
      contactNumber = "",
      about = "",
      location = "",
      socialLinks = {},
    } = req.body;

    const userId = req.user.id;

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

    // Update fields
    profile.gender = gender;
    profile.dateOfBirth = dob;
    profile.contactNumber = contactNumber;
    profile.about = about;
    profile.location = location;
    profile.socialLinks = socialLinks;

    await profile.save();

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
    const userId = req.user._id;

    // Find courses where the student is enrolled
    const courses = await Course.find({ studentsEnrolled: userId })
      .select("courseName courseDescription price thumbnail instructor")
      .populate("instructor", "name email"); // populate instructor's basic info

    return res.json({ enrolledCourses: courses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({ message: "Server error." });
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
