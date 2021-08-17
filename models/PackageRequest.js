const mongoose = require('mongoose')
const packageRequestSchema = new mongoose.Schema({
    venue: { type: String, required: true },
    noOfParticipants: { type: String, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true },
    message: { type: String, required: false },
    approve: { type: String, required: true, default: "pending" }
});
const PackageRequest = mongoose.model('packagerequests', packageRequestSchema);
module.exports = PackageRequest;