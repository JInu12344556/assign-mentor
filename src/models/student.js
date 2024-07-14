const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
    previousMentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }],
});

module.exports = mongoose.model('Student', StudentSchema);
