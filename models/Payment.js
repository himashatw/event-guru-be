const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    cardNo: {
        type: String,
        required: true,
        trim: true
    },
    cardHolderName: {
        type: String,
        required: true,
        trim: true
    },
    expireDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    state: {
        type: String,
        require: true,
        default: "pending"
    },
    users: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    advert: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Advertisement' }
});

const Payment = mongoose.model('Payments', PaymentSchema);
module.exports = Payment;