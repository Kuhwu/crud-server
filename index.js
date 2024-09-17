const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Student = require('./model/studentModel');

mongoose.connect('mongodb+srv://jhcentino2003:H3lcrmEHLaFNC2Yt@crud.klbqg.mongodb.net/?retryWrites=true&w=majority&appName=CRUD')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });



app.use(express.json());

app.post('/api/add_student', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/get_student', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/update_student/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE API
app.delete("/api/delete_student/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) return res.status(404).send({
      statusCode: 404,
      message: "Student not found",
    });

    res.status(200).send({
      statusCode: 200,
      message: "Student successfully deleted",
      student: student,
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: "Error deleting student",
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get('/', (req, res) => {
  res.redirect('/api/student');
});
