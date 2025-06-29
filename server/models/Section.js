const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },

  subSections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
      ref: "SubSection",
    }
  ],

  // track order for UI display
  // order: {
  //   type: Number,
  //   default: 0,
  // }
}, { timestamps: true });

module.exports = mongoose.model("Section", sectionSchema);
