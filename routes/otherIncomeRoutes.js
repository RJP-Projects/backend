const express = require('express');
const router = express.Router();
const {addOtherIncome, getAllOtherIncome, getOtherIncomeById, updateOtherIncome, deleteOtherIncome} = require('../controllers/otherIncomeController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/add', protect, isAdmin, addOtherIncome);
router.get('/', protect, isAdmin, getAllOtherIncome);
router.get('/:id', protect, isAdmin, getOtherIncomeById);
router.put('/:id', protect, isAdmin, updateOtherIncome);
router.delete('/:id', protect, isAdmin, deleteOtherIncome);

module.exports = router;
