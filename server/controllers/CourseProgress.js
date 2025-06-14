const mongoose = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

exports.updateCourseProgress = async (req, res) => {
  console.log("Request body:", req.body); // Debug log
  console.log("User from req.user:", req.user); // Debug log

  const { courseId, subSectionId } = req.body;
  const userId = req.user?.id;

  // Check if user is authenticated
  if (!req.user || !userId) {
    return res.status(401).json({
      success: false,
      error: "User not authenticated",
    });
  }

  try {
    // Validate input
    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        error: "CourseId and subSectionId are required",
      });
    }

    // Check if the subsection is valid
    const subsection = await SubSection.findById(subSectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        error: "Invalid subsection",
      });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Invalid course",
      });
    }

    // Find or create the course progress document
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      // Create new course progress if it doesn't exist
      courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [subSectionId],
      });

      return res.status(200).json({
        success: true,
        message: "Course progress created and updated",
        data: courseProgress,
      });
    } else {
      // Check if already completed
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(200).json({
          success: true,
          message: "Subsection already completed",
          data: courseProgress,
        });
      }

      // Add to completed videos
      courseProgress.completedVideos.push(subSectionId);
      await courseProgress.save();

      return res.status(200).json({
        success: true,
        message: "Course progress updated",
        data: courseProgress,
      });
    }
  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
    });
  }
};