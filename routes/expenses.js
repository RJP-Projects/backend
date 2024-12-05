const express = require('express');
const router = express.Router();
const {createExpense, getExpenses, updateExpense, deleteExpense, viewExpense}  = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/fileUpload');


router.post('/create', protect, upload.single('bill'),createExpense);
router.get('/', protect, getExpenses);
router.put('/update/:id', protect, upload.single('bill'), updateExpense);
router.delete('/delete/:id', protect, deleteExpense);
router.get('/:id', protect, viewExpense);

module.exports = router;
