const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');

// Create a Mentor
router.post('/', async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).send(mentor);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
