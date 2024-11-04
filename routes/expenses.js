const express = require('express');
const router = express.Router();
const {createExpense, getExpenses, updateExpense, deleteExpense, viewExpense}  = require('../controllers/expenseController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/fileUpload');


router.post('/create', protect, isAdmin, upload.single('bill'),createExpense);
router.get('/', protect, isAdmin, getExpenses);
router.put('/update/:id', protect, isAdmin, upload.single('bill'), updateExpense);
router.delete('/delete/:id', protect, isAdmin, deleteExpense);
router.get('/:id', protect, isAdmin, viewExpense);

module.exports = router;
