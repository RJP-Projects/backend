const express = require('express');
const router = express.Router();
const {addOtherIncome, getAllOtherIncome, getOtherIncomeById, updateOtherIncome, deleteOtherIncome} = require('../controllers/otherIncomeController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/add', protect, addOtherIncome);
router.get('/', protect, getAllOtherIncome);
router.get('/:id', protect, getOtherIncomeById);
router.put('/:id', protect, updateOtherIncome);
router.delete('/:id', protect, deleteOtherIncome);

module.exports = router;
