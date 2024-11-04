const express = require('express');
const router = express.Router();
const {createVisitorLog, getAllVisitorLogs, updateVisitorLog, deleteVisitorLog} = require('../controllers/visitorLogController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', protect, isAdmin, createVisitorLog);
router.get('/', protect, isAdmin, getAllVisitorLogs);
router.put('/:id', protect, isAdmin, updateVisitorLog);
router.delete('/:id', protect, isAdmin, deleteVisitorLog);

module.exports = router;
