require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');
const Course = require('./models/course');


const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Example Routes (you can add your own routes)
app.get('/', (req, res) => {
  res.send('🎉 Student Management System Backend Running');
});

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a student with enrolled courses
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('enrolledCourses');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listen on the correct port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// You can create courses and students initially using a script if needed, 
// but make sure it doesn't interfere with the server logic in production.
async function createInitialData() {
  const course1 = await Course.create({ courseName: 'Math 101', instructor: 'Dr. Smith', credits: 3 });
  const course2 = await Course.create({ courseName: 'Physics 101', instructor: 'Dr. Jane', credits: 4 });

  const student = await Student.create({
    name: 'Alice',
    email: 'alice@example.com',
    age: 20,
    enrolledCourses: [course1._id, course2._id]
  });

  console.log('Student Created:', student);
}

createInitialData().catch((err) => console.error('Error creating initial data:', err));
