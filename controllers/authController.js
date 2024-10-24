const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

// Registration logic
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    state,
    city,
    society,
    password,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      state,
      city,
      society: society._id, 
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// User Login
exports.loginUser = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    let user = await User.findOne({ 
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }] 
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    res.status(200).json({ msg: 'Login successful', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Forget Password
exports.requestPasswordReset = async (req, res) => {
  const { emailOrPhone } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    // Generate OTP or token
    const otp = generateOTP();
    const tokenExpiry = Date.now() + 3600000; 

    user.resetToken = otp;
    user.resetTokenExpiry = tokenExpiry;

    await user.save();

    // Send OTP via email or phone (use email or SMS service)
    const message = `Your OTP for password reset is: ${otp}`;
    await sendEmail(user.email, message); 

    res.status(200).json({ msg: 'OTP sent successfully. Please check your email or phone.' });
  } catch (err) {
    console.error('Error in OTP request:', err.message);
    res.status(500).send('Server error');
  }
};

// Verify OTP 
exports.verifyOTP = async (req, res) => {
  const { emailOrPhone, otp } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      resetToken: otp,
      resetTokenExpiry: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid OTP or OTP has expired' });
    }

    res.status(200).json({ msg: 'OTP verified. You can now reset your password.' });
  } catch (err) {
    console.error('Error in OTP verification:', err.message);
    res.status(500).send('Server error');
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { emailOrPhone, newPassword } = req.body;

  try {
    let user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error('Error in resetting password:', err.message);
    res.status(500).send('Server error');
  }
};