const mongoose = require('mongoose')
const eventOrganizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
});
const EventOrganizer = mongoose.model('EventOrganizer', eventOrganizerSchema);
module.exports = EventOrganizer;