const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
    default: "Prefer not to say",
  },

  dob: {
    type: String,
  },

  contact: {
    type: String,
    trim: true,
    minlength: 8,
    maxlength: 15,
  },

  about: {
    type: String,
    trim: true,
    maxlength: 1000,
  },

  location: {
    type: String,
    trim: true,
  },

  socialLinks: {
    linkedin: { type: String, trim: true, default: "" },
    github: { type: String, trim: true, default: "" },
    twitter: { type: String, trim: true, default: "" },
  },

}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
