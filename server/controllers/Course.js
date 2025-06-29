const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { imageUploadCloudinary } = require("../utils/CloudinaryUploader");

exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    let {
      courseName,
      courseDescription,
      whatWillYouLearn,
      price,
      tags: _tags,
      category: categoryId,
      instructions: _instructions,
      published,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    // Parse stringified array inputs
    const tags = JSON.parse(_tags || "[]");
    const instructions = JSON.parse(_instructions || "[]");

    // Validate required fields
    if (
      !courseName ||
      !courseDescription ||
      !whatWillYouLearn ||
      !price ||
      !tags.length ||
      !thumbnail ||
      !categoryId ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // Check instructor validity
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    // Validate category existence
    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Upload thumbnail to Cloudinary
    const uploadedThumbnail = await imageUploadCloudinary(
      thumbnail,
      process.env.FOLDER_STORAGE_NAME
    );

    // Create course document
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatWillYouLearn,
      price,
      tags,
      category: categoryId,
      thumbnail: uploadedThumbnail.secure_url,
      instructions,
      published: published || false,
    });

    // Add course to instructor's list
    await User.findByIdAndUpdate(userId, {
      $push: { courses: newCourse._id },
    });

    // Add course to category
    await Category.findByIdAndUpdate(categoryId, {
      $push: { courses: newCourse._id },
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .select(
        "courseName price thumbnail instructor ratingAndReviews category"
      )
      .populate("instructor", "firstName lastName")
      .populate("category", "name");

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

exports.getCompleteCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        select: "firstName lastName email image about contactNumber",
      })
      .populate("category", "name description")
      .populate("studentsEnrolled", "firstName lastName email image")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
          select: "-__v -createdAt -updatedAt",
        },
      })
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
          select: "firstName lastName email image",
        },
        options: { sort: { createdAt: -1 } },
      });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.error("Error in getCompleteCourseDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course details",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId)
      .populate("instructor", "firstName lastName email about")
      .populate("category", "name")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
          model: "SubSection",
        },
      })
      .populate("ratingAndReviews")
      .exec();

    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    return res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error("Error getting course details", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.editCourse = async (req, res) => {
  try {
    console.log("🟡 [editCourse] Body received:", req.body);
    console.log("🟡 [editCourse] Files received:", req.files);

    const { courseId } = req.body;
    if (!courseId) {
      console.error("❌ No courseId received");
      return res
        .status(400)
        .json({ success: false, message: "Missing courseId" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      console.error("❌ Course not found for ID:", courseId);
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const updates = req.body;

    const allowedFields = [
      "courseName",
      "courseDescription",
      "price",
      "tags",
      "instructions",
      "whatWillYouLearn",
      "published",
      "category",
      "status",
    ];

    for (const key of allowedFields) {
      if (
        Object.prototype.hasOwnProperty.call(updates, key) ||
        key in updates
      ) {
        if (key === "tags" || key === "instructions") {
          try {
            course[key] =
              typeof updates[key] === "string"
                ? JSON.parse(updates[key])
                : updates[key];
          } catch {
            course[key] = updates[key];
          }
        } else if (key === "status") {
          course.status = updates[key];
          course.published = updates[key] === "Published";
        } else {
          course[key] = updates[key];
        }
      }
    }

    if (req.files?.thumbnailImage) {
      console.log("🖼️ Updating thumbnail...");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await imageUploadCloudinary(
        thumbnail,
        process.env.FOLDER_STORAGE_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    console.log("🟢 Final course object before saving:", course);

    try {
      await course.save();
    } catch (err) {
      console.error("❌ Error during course.save():", err);
      return res.status(500).json({
        success: false,
        message: "Error saving course",
        error: err.message,
      });
    }

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalInfo",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("❌ Error updating course:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({ instructor: instructorId })
      .populate("category", "name")
      .select("-studentsEnrolled");

    return res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching instructor courses", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Remove course from enrolled students
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and their subSections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSections; // ✅ Correct field usage
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      await Section.findByIdAndDelete(sectionId);
    }

    // Finally delete the course itself
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting course:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
