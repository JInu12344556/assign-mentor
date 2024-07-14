const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
    name: String,
    email: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Mentor', MentorSchema);
