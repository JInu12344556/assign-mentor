1.Create a Mentor:

POST /mentors
Body: { "name": "John Doe", "email": "john@example.com" }

2.Create a Student:

POST /students
Body: { "name": "Jane Doe", "email": "jane@example.com" }

3.Assign Students to Mentor:

POST /assignments/assign
Body: { "mentorId": "mentorId", "studentIds": ["studentId1", "studentId2"] }

4.Show all Students for a Mentor:

GET /assignments/mentor/:mentorId/students

5.Show Previous Mentors for a Student:

GET /assignments/student/:studentId/previous-mentors

6.Reassign Mentor for a Student:

POST /assignments/student/:studentId/mentor
Body: { "mentorId": "newMentorId" }
"# assign-mentor" 
"# assign-mentor" 
