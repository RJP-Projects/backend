const express = require('express');
const { createSociety } = require('../controllers/societyController');
const { getSocieties } = require('../controllers/societyController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', protect, isAdmin, createSociety);
router.get('/list', getSocieties);

module.exports = router;
