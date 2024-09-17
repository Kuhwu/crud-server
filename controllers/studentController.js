const Student = require('../models/studentModel');

// Add a student
const addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all students
const getAllStudent = async (req, res) => {
    try {
        const students = await Student.find();
        console.log(students); // Add this line
        res.status(200).json({ students });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Update a student
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(400).json({ error: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json({ message: 'Student successfully deleted', student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addStudent,
    getAllStudent,
    updateStudent,
    deleteStudent,
};
