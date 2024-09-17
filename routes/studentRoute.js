const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/add_student', studentController.addStudent);
router.get('/get_student', studentController.getAllStudent);
router.put('/update_student/:id', studentController.updateStudent);
router.delete('/delete_student/:id', studentController.deleteStudent);

module.exports = router;