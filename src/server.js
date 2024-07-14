const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mentor_student_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const assignmentRoutes = require('./routes/assignmentroutes');

app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);
app.use('/assignments', assignmentRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
