const express = require('express');
const Form = require('../../controllers/formController');
const method = require('../../utils/method');
const Validation = require('../../validation');

const router = express.Router();

router
  .route('/')
  .post(Validation.validateFormData, Form.insertData)
  .all(method);

module.exports = router;
