const mongoose = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
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
        completedVideos: [subsectionId],
      });

      return res.status(200).json({
        success: true,
        message: "Course progress created and updated",
      });
    } else {
      // Check if already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" });
      }

      // Add to completed videos
      courseProgress.completedVideos.push(subsectionId);
      await courseProgress.save();

      return res.status(200).json({
        success: true,
        message: "Course progress updated",
      });
    }
  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};