import mongoose from "mongoose";

const PackageSchema = new mongoose.model({
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
      required:true,
      rim: true,
  },
});

const Package = mongoose.model("Package", PackageSchema);
export default Package;