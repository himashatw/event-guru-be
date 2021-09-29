const mongoose = require("mongoose");

const PropertyOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  propertyType: {
    type: String,
    required: true,
    trim: true,
  },
  accountActive: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  bioDetails: {
    type: String,
    required: false,
    trim: true,
  },
  propertyImageUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

const PropertyOwner = mongoose.model("PropertyOwner", PropertyOwnerSchema);
module.exports = PropertyOwner;
