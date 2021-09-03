const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  scheduleTime: {
    type: String,
    required: true,
  },
  scheduleDate: {
    type: Date,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adType: {
    type: String,
    required: true,
  },
});

const Advertisement = mongoose.model("Advertisement", AdvertisementSchema);
module.exports = Advertisement;
