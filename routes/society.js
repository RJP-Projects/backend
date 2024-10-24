const express = require('express');
const { createSociety } = require('../controllers/societyController');
const { societyValidation } = require('../utils/validators');

const router = express.Router();

// Create Society Route
router.post('/create', societyValidation, createSociety);

module.exports = router;
