const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    trim: true,
  },
  packageDetails: {
    type: String,
    required: true,
    trim: true,
  },
  packageImageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  packageOffer: {
    type: Number,
    required: false,
  },
  packageVenue: {
    type: String,
    required: true,
    rim: true,
  },
});

const Package = mongoose.model("Package", PackageSchema);
module.exports = Package;