const express = require('express');
const router = express.Router();
const {createVisitorLog, getAllVisitorLogs, updateVisitorLog, deleteVisitorLog} = require('../controllers/visitorLogController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createVisitorLog);
router.get('/', protect, getAllVisitorLogs);
router.put('/:id', protect, updateVisitorLog);
router.delete('/:id', protect, deleteVisitorLog);

module.exports = router;
