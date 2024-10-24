const { body } = require('express-validator');

// Registration Validation
exports.registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phoneNumber').isMobilePhone().withMessage('Please enter a valid phone number'),
];

// Society Creation Validation
exports.societyValidation = [
  body('societyName').not().isEmpty().withMessage('Society Name is required'),
  body('address').not().isEmpty().withMessage('Society Address is required'),
  body('country').not().isEmpty().withMessage('Country is required'),
  body('state').not().isEmpty().withMessage('State is required'),
  body('city').not().isEmpty().withMessage('City is required'),
  body('zipCode').not().isEmpty().withMessage('Zip Code is required'),
];

// Login Validation
exports.loginValidation = [
  body('emailOrPhone').not().isEmpty().withMessage('Email or Phone is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
];

// OTP Validation
exports.otpValidation = [
  body('emailOrPhone').not().isEmpty().withMessage('Email or phone number is required'),
];

// Reset Password Validation
exports.resetPasswordValidation = [
  body('emailOrPhone').not().isEmpty().withMessage('Email or phone number is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

