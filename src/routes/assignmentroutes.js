const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const Student = require('../models/student');

// Assign students to mentor
router.post('/assign', async (req, res) => {
    const { mentorId, studentIds } = req.body;
    try {
        const mentor = await Mentor.findById(mentorId);
        const students = await Student.find({ _id: { $in: studentIds }, mentor: null });

        if (!mentor || students.length !== studentIds.length) {
            return res.status(404).send({ message: 'Mentor or some Students not found or already assigned' });
        }

        students.forEach(async (student) => {
            student.mentor = mentor._id;
            student.previousMentors.push(mentor._id);
            await student.save();
        });

        mentor.students.push(...studentIds);
        await mentor.save();

        res.status(200).send(mentor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Show all students for a mentor with student names populated
router.get('/assignments/mentors/:mentorId/students', async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.mentorId).populate('students', 'name email');
        if (!mentor) {
            return res.status(404).send({ message: 'Mentor not found' });
        }
        res.status(200).send(mentor.students);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Show previous mentors for a student
router.get('/student/:studentId/previous-mentors', async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate('previousMentors');
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }
        res.status(200).send(student.previousMentors);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Reassign mentor for a student
router.post('/student/:studentId/mentor', async (req, res) => {
    const { mentorId } = req.body;
    try {
        const student = await Student.findById(req.params.studentId);
        const newMentor = await Mentor.findById(mentorId);

        if (!student || !newMentor) {
            return res.status(404).send({ message: 'Student or Mentor not found' });
        }

        if (student.mentor) {
            const oldMentor = await Mentor.findById(student.mentor);
            oldMentor.students.pull(student._id);
            await oldMentor.save();
        }

        student.mentor = mentorId;
        student.previousMentors.push(mentorId);
        await student.save();

        newMentor.students.push(student._id);
        await newMentor.save();

        res.status(200).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get students without mentors
router.get('/students/without-mentors', async (req, res) => {
    try {
        const students = await Student.find({ mentor: null });
        res.status(200).send(students);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
