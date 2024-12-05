const express = require('express');
const { createSociety } = require('../controllers/societyController');
const { getSocieties } = require('../controllers/societyController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', protect, createSociety);
router.get('/list', getSocieties);

module.exports = router;
