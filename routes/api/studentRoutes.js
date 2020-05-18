const express = require('express');
const Student = require('../../controllers/studentController');
const verify = require('../../middlewares/auth');
const Validation = require('../../validation');
const method = require('../../utils/method');

const router = express.Router();

router.route('/student-data').get(verify, Student.studentData).all(method);

router.route('/student-data/:id').get(verify, Student.aStudentData);

router.route('/student-data/:id').delete(verify, Student.removeStudentData);

// router
//   .route('/student-data/:id')
//   .patch(verify, Validation.validateFormData, Student.editStudentData);

module.exports = router;
