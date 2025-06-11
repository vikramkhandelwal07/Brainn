const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const { videoUploadCloudinary } = require("../utils/CloudinaryUploader");

exports.createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description } = req.body;
    const video = req.files?.video; // Use optional chaining

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
      return res
        .status(400) // Changed from 404 to 400 (Bad Request)
        .json({ success: false, message: "All Fields are Required" });
    }

    console.log(video);

    const uploadDetails = await videoUploadCloudinary(
      video,
      process.env.FOLDER_STORAGE_NAME
    );
    console.log(uploadDetails);

    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSections: subSectionDetails._id } }, 
      { new: true }
    ).populate("subSections"); 

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, timeDuration, description } = req.body;
    const video = req.files?.video; // Fixed: should be 'video' not 'videoFile'

    // validating subsection ID
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Subsection ID is required",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (timeDuration) updateData.timeDuration = timeDuration;

    // if video is present, upload new video
    if (video) {
      const uploadDetails = await videoUploadCloudinary(
        video,
        process.env.FOLDER_STORAGE_NAME
      );
      updateData.videoUrl = uploadDetails.secure_url;
      updateData.timeDuration = `${uploadDetails.duration}`; // Update duration from new video
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updateData,
      { new: true }
    );

    if (!updatedSubSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSubSection,
    });
  } catch (error) {
    console.error("Error updating subsection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating subsection",
      error: error.message, // Added error details
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.params;

    // validating IDs
    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Subsection ID and Section ID are required",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSections: subSectionId }, 
      },
      { new: true }
    ).populate("subSections");

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // delete subsection from DB
    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedSection, // Return updated section for frontend to update state
    });
  } catch (error) {
    console.error("Error deleting subsection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting subsection",
      error: error.message, // Added error details
    });
  }
};
