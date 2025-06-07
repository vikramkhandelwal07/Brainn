const mongoose = require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  review: {
    type: String,
    trim: true,
    maxlength: 1000,
  },

}, { timestamps: true });

// Optional: create a compound index to prevent duplicate reviews
ratingAndReviewsSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("RatingAndReviews", ratingAndReviewsSchema);
