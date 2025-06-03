const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    courseDescription: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    whatWillYouLearn: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],

    ratingsAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingsAndReviews",
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    thumbnail: {
      type: String,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    instructions: {
      type: [String],
    },
    
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
