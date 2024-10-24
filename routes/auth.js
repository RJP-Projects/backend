const express = require('express');
const { registerUser } = require('../controllers/authController');
const { registerValidation } = require('../utils/validators');
const { loginUser } = require('../controllers/authController');
const { loginValidation } = require('../utils/validators');
const {
  requestPasswordReset,
  verifyOTP,
  resetPassword,
} = require('../controllers/authController');
const { otpValidation, resetPasswordValidation } = require('../utils/validators');


const router = express.Router();

// Registration Route
router.post('/register', registerValidation, registerUser);

// Login Route
router.post('/login', loginValidation, loginUser);

// Request OTP for Password Reset
router.post('/forgot-password', otpValidation, requestPasswordReset);

// Reset Password Route
router.post('/reset-password', resetPasswordValidation, resetPassword);

// Request OTP
router.post('/forgot-password', otpValidation, requestPasswordReset);

// Verify OTP
router.post('/verify-otp', otpValidation, verifyOTP);

// Reset Password
router.post('/reset-password', resetPasswordValidation, resetPassword);

module.exports = router;