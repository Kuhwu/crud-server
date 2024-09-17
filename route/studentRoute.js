const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/add_student', studentController.addStudent);
router.post('/get_student', studentController.getAllStudent);
router.post('/update_student/:id', studentController.updateStudent);
router.post('/delete_student/:id', studentController.deleteStudent);

module.exports = router;