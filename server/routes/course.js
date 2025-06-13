const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCompleteCourseDetails,
  getCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");

const {
  createCategory,
  getAllCategories,
  completeCategoryPageDetails,
} = require("../controllers/Category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Sections");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSections");

const {
  createRatingReviews,
  getAllRatingAndReviews,
  getAvgRatingReviews,
  getCourseRatingAndReviews,
  updateRatingReview,
  deleteRatingReview,
  getMyReviews,
  getTopRatedCourses,
} = require("../controllers/RatingAndReviews");

const { updateCourseProgress } = require("../controllers/CourseProgress");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// ----------------------------------------
// Course Routes
// ----------------------------------------

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getCompleteCourseDetails", auth, getCompleteCourseDetails);
router.put("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// ----------------------------------------
// Section Routes
// ----------------------------------------

router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// ----------------------------------------
// Sub-Section Routes
// ----------------------------------------

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// ----------------------------------------
// Course Progress Route
// ----------------------------------------

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ----------------------------------------
// Category Routes (Admin Only)
// ----------------------------------------

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/getAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", completeCategoryPageDetails);

// ----------------------------------------
// Rating & Review Routes
// ----------------------------------------

router.post("/createRating", auth, isStudent, createRatingReviews);
router.get("/getAverageRating", getAvgRatingReviews);
router.get("/getReviews", getAllRatingAndReviews);
router.get("/getCourseReviews/:courseId", getCourseRatingAndReviews);
router.put("/updateReview", auth, isStudent, updateRatingReview);
router.delete("/deleteReview/:reviewId", auth, isStudent, deleteRatingReview);
router.get("/getMyReviews", auth, isStudent, getMyReviews);
router.get("/topRatedCourses", getTopRatedCourses);

module.exports = router;
