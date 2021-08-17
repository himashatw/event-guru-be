const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' }]
});

const Enquiry = mongoose.model('Enquiries', EnquirySchema);
module.exports = Enquiry;