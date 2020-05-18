const express = require('express');
const index = require('./api');

const router = express.Router();

router.use('/api', index);

module.exports = router;
