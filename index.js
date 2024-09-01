const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Student = require('./model/studentModel');

mongoose.connect('mongodb+srv://jhcentino2003:H3lcrmEHLaFNC2Yt@crud.klbqg.mongodb.net/?retryWrites=true&w=majority&appName=CRUD')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const studentData = [];

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// POST API
app.post("/api/add_student", async (req, res) => {
  const student = new Student({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    course: req.body.course,
    year: req.body.year,
    enrolled: req.body.enrolled === 'true',
  });

  try {
    const savedStudent = await student.save();
    res.status(200).send({
      statusCode: 200,
      message: "Student has been added successfully",
      student: savedStudent,
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: "Error saving student",
      error: err.message,
    });
  }
});

// GET API
app.get("/api/get_student", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send({
      statusCode: 200,
      students: students,
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: "Error retrieving students",
      error: err.message,
    });
  }
});

//UPDATE API
app.put("/api/update_student/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      course: req.body.course,
      year: req.body.year,
      enrolled: req.body.enrolled === 'true',
    }, { new: true });

    if (!student) return res.status(404).send({
      statusCode: 404,
      message: "Student not found",
    });

    res.status(200).send({
      statusCode: 200,
      message: "Student Information Successfully Updated",
      student: student,
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: "Error updating student",
      error: err.message,
    });
  }
});
// DELETE API
app.delete("/api/delete_student/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);

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

