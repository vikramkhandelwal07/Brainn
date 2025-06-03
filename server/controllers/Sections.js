const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {

    const { sectionName, courseId } = req.body;


    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section name and course ID are required",
      });
    }


    const newSection = await Section.create({ sectionName });


    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    ).populate("courseContent"); 

    return res.status(201).json({
      success: true,
      message: "Section created and added to course successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error creating section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating section",
    });
  }
};

// <===== update Section Controller ================>

exports.updateSection = async (req, res) => {
  try {

    const { sectionId, sectionName } = req.body;

    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "Section ID and new section name are required",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // If section not found
    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });

  } catch (error) {
    console.error("Error updating section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating section",
    });
  }
};


// <========= delete Section ============> 

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    
    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and Course ID are required",
      });
    }

    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });


    const deletedSection = await Section.findByIdAndDelete(sectionId);

    // if section not found

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // sending success response

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });

  } catch (error) {
    // handling server error

    console.error("Error deleting section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting section",
    });
  }
};
