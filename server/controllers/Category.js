const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields of Category are required",
      });
    }

    const CategoryDetail = await Category.create({
      name: name.trim(),
      description: description.trim(),
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: CategoryDetail,
    });
  } catch (error) {
    console.error("Error creating Category:", error);
    return res.status(500).json({
      success: false,
      message: "Category creation failed",
      error: error.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const Categorys = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: "All Categorys fetched successfully",
      data: Categorys,
    });
  } catch (error) {
    console.error("Error fetching Categorys:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Categorys",
      error: error.message,
    });
  }
};

exports.completeCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Validate category
    const selectedCategory = await Category.findById(categoryId);
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Selected category not found",
      });
    }

    // Get all published courses in the selected category
    const selectedCategoryCourses = await Course.find({
      category: categoryId,
      published: true,
    })
      .populate("instructor", "firstName lastName email")
      .populate("ratingAndReviews");

    // Get courses from other categories (limit to 5 categories randomly)
    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    });

    const otherCategoryCourses = [];

    for (let i = 0; i < Math.min(otherCategories.length, 5); i++) {
      const courses = await Course.find({
        category: otherCategories[i]._id,
        published: true,
      })
        .populate("instructor", "firstName lastName")
        .limit(4);

      if (courses.length > 0) {
        otherCategoryCourses.push({
          category: otherCategories[i].name,
          courses,
        });
      }
    }

    // Get top-selling courses across all categories (based on studentsEnrolled)
    const topSellingCourses = await Course.find({ published: true })
      .sort({ studentsEnrolled: -1 })
      .limit(10)
      .populate("instructor", "firstName lastName");

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory: {
          _id: selectedCategory._id,
          name: selectedCategory.name,
          description: selectedCategory.description || "",
          courses: selectedCategoryCourses,
        },
        otherCategories: otherCategoryCourses,
        topSellingCourses,
      },
    });
  } catch (error) {
    console.error("Error in completeCategoryPageDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
