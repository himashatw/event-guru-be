const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    ImageUrl: {
        type: String,
        required: false,
        trim: true,
      },
});

const User = mongoose.model('Users', UserSchema);
module.exports = User;