const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store
const studentData = [];

// Server setup
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// POST API - Add Student
app.post("/api/add_student", (req, res) => {
  console.log("Request Body:", req.body);

  const sdata = {
    id: studentData.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    course: req.body.course,
    year: req.body.year,
    enrolled: req.body.enrolled === 'true', // Convert string to boolean if needed
  };

  studentData.push(sdata);
  console.log("Student Added:", sdata);

  res.status(200).send({
    statusCode: 200,
    message: "Student has been added successfully",
    student: sdata,
  });
});

// GET API - Get Students
app.get("/api/get_student", (req, res) => {
  if (studentData.length > 0) {
    res.status(200).send({
      statusCode: 200,
      students: studentData,
    });
  } else {
    res.status(200).send({
      statusCode: 200,
      students: [],
    });
  }
});
