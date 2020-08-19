const express = require('express');
const Admin = require('../../controllers/adminController');
const method = require('../../utils/method');
const Validation = require('../../validation');
const Access = require('../../middlewares/userRole');

const router = express.Router();
// super admin can register another admin
router
  .route('/')
  .post(Validation.validateAdminDetails, Access.isAdmin, Admin.registerAdmin)
  .all(method);

router
  .route('/log-in')
  .post(Validation.validateAdmin, Admin.loginAdmin)
  .all(method);

router.route('/');

router.route('/test').get(Admin.testRoute).all(method);

module.exports = router;
