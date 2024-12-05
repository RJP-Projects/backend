const express = require('express');
const { register } = require('../controllers/authController');
const { login, addGuard } = require('../controllers/authController');
const { validateUser } = require('../middlewares/validateMiddleware');
const { validateLogin } = require('../middlewares/validateMiddleware');
const { guardLogin } = require('../controllers/securityGuardController');
const { residentLogin } = require('../controllers/residentController');
const { sendOTP, verifyOTP, resetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password/send-otp', sendOTP);
router.post('/forgot-password/verify-otp', verifyOTP);
router.post('/forgot-password/reset', resetPassword);
router.post('/add-guard', addGuard);
router.post('/guard-login', guardLogin);
router.post('/resident-login', residentLogin);

module.exports = router;
