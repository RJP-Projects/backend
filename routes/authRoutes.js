const express = require('express');
const { register } = require('../controllers/authController');
const { login } = require('../controllers/authController');
const { validateUser } = require('../middlewares/validateMiddleware');
const { validateLogin } = require('../middlewares/validateMiddleware');
const { sendOTP, verifyOTP, resetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password/send-otp', sendOTP);
router.post('/forgot-password/verify-otp', verifyOTP);
router.post('/forgot-password/reset', resetPassword);

module.exports = router;
