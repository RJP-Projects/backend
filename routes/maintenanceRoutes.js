const express = require('express');
const router = express.Router();
const {addMaintenance, getAllMaintenance, getMaintenanceById, updateMaintenance, deleteMaintenance} = require('../controllers/maintenanceController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/add', protect, isAdmin, addMaintenance);
router.get('/', protect, isAdmin, getAllMaintenance);
router.get('/:id', protect, isAdmin, getMaintenanceById);
router.put('/:id', protect, isAdmin, updateMaintenance);
router.delete('/:id', protect, isAdmin, deleteMaintenance);

module.exports = router;
