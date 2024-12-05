const express = require('express');
const router = express.Router();
const {addMaintenance, getAllMaintenance, getMaintenanceById, updateMaintenance, deleteMaintenance} = require('../controllers/maintenanceController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/add', protect, addMaintenance);
router.get('/', protect, getAllMaintenance);
router.get('/:id', protect, getMaintenanceById);
router.put('/:id', protect, updateMaintenance);
router.delete('/:id', protect, deleteMaintenance);

module.exports = router;
