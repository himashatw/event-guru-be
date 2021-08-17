const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
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