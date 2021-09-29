const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
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
      default: 0,
    },
    packageVenue: {
      type: String,
      required: false,
    },
    participants: {
      type: Number,
      required: true,
    },
    packageType: {
      type: String,
      required: true,
      trim: true,
    },
    packagePrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", PackageSchema);
module.exports = Package;
