const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    course: {type: String, required: true},
    year: {type: Number, required: true},
    enrolled: {type: Boolean, required: true},
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;