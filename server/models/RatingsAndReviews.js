const mongoose = require("mongoose");

const ratingsAndReviewsSchema = new mongoose.Schema({
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
ratingsAndReviewsSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("RatingsAndReviews", ratingsAndReviewsSchema);
