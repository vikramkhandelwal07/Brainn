const Course = require("../models/Course");
const RatingAndReviews = require("../models/RatingAndReviews");

exports.createRatingReviews = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body;
    const userId = req.user.id;

    if (!rating || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Rating and Course ID are required",
      });
    }

    // Checking if user already reviewed this course
    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    // Creating and save review
    const newReview = await RatingAndReviews.create({
      user: userId,
      course: courseId,
      rating,
      review,
    });

    // Pushing into course's ratingAndReviews array
    await Course.findByIdAndUpdate(courseId, {
      $push: { ratingAndReviews: newReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating rating and review:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const reviews = await RatingAndReviews.find({})
      .populate("user", "firstName lastName email image")
      .populate("course", "courseName thumbnail");

    res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

exports.getAvgRatingReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const result = await RatingAndReviews.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      {
        $group: {
          _id: "$course",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        averageRating: 0,
        message: "No ratings yet for this course",
      });
    }

    res.status(200).json({
      success: true,
      averageRating: result[0].averageRating.toFixed(1),
    });
    
  } catch (error) {
    console.error("Error getting average rating:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get average rating",
    });
  }
};

exports.getCourseRatingAndReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await RatingAndReviews.find({ course: courseId }).populate(
      "user",
      "firstName lastName image email"
    );

    res.status(200).json({
      success: true,
      message: "Course reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course reviews",
    });
  }
};

exports.updateRatingReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user.id;

    const updatedReview = await RatingAndReviews.findOneAndUpdate(
      { _id: reviewId, user: userId },
      { rating, review },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review",
    });
  }
};

exports.deleteRatingReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await RatingAndReviews.findOneAndDelete({
      _id: reviewId,
      user: userId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or unauthorized",
      });
    }

    // Remove from course too
    await Course.findByIdAndUpdate(review.course, {
      $pull: { ratingAndReviews: review._id },
    });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};

exports.getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const myReviews = await RatingAndReviews.find({ user: userId }).populate(
      "course",
      "courseName thumbnail"
    );

    res.status(200).json({
      success: true,
      data: myReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your reviews",
    });
  }
};

exports.getTopRatedCourses = async (req, res) => {
  try {
    const result = await RatingAndReviews.aggregate([
      {
        $group: {
          _id: "$course",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgRating: -1, count: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch top rated courses",
    });
  }
};

