const express = require('express');
const adminRoutes = require('./adminRoutes');
const formRoutes = require('./formRoutes');
const studentRoutes = require('./studentRoutes');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/form-data', formRoutes);
router.use('/wcf', studentRoutes);

module.exports = router;
