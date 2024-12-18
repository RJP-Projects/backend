const User = require('../models/User');
const Guard = require('../models/SecurityGuard');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const otpMap = new Map();

exports.register = async (req, res) => {
    const { firstName, lastName, email, phone, country, state, city, society, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            firstName, lastName, email, phone, country, state, city, society, password
        });

        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { emailorphone, password } = req.body;
    try {
        console.log("Login request received", { emailorphone, password });

        const user = await User.findOne({
            $or: [{ email: emailorphone }, { phone: emailorphone }]
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        return res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            token: token,
        });
    } catch (error) {
        console.error("Server error:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
exports.addGuard = async (req, res) => {
    const { name, email, shift, shiftDate, shiftTime, gender, userId} = req.body;

    try {
        // Generate a random password
        const randomPassword = crypto.randomBytes(6).toString('hex');

        // Create a new security guard
        const guard = new Guard({
            name,
            email,
            shift,
            shiftDate,
            shiftTime,
            gender,
            userId,
            password: randomPassword,
        });

        await guard.save();

        // Send email with password
        await sendEmail(
            email,
            `Hello ${name},\n\nYour account has been created. Use the following password to log in:\n\nPassword: ${randomPassword}`
        );

        res.status(201).json({
            message: 'Security Guard added successfully. Password sent to the email.',
            guard,
        });

        const user = await User.findById(userId);
        if (user) {
            user.GuardIds.push(guard._id);
            await user.save();
        }

    } catch (error) {
        console.error('Error adding guard:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Sending OTP via email
exports.sendOTP = async (req, res) => {
    const { emailorphone } = req.body; 

    try {
        const user = await User.findOne({
            $or: [{ email: emailorphone }, { phone: emailorphone }]
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const otp = crypto.randomInt(100000, 999999).toString();

        otpMap.set(emailorphone, { otp, expiresIn: Date.now() + 5 * 60 * 1000 });

        await sendEmail(user.email, otp); 

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'DashStack Password',
        text: `${otp}`
    };

    await transporter.sendMail(mailOptions);
};

//verify otp
exports.verifyOTP = async (req, res) => {
    const { emailorphone, otp } = req.body;

    try {
        const storedOTP = otpMap.get(emailorphone);
        if (!storedOTP || storedOTP.otp !== otp || storedOTP.expiresIn < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        otpMap.delete(emailorphone);

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// reset password
exports.resetPassword = async (req, res) => {
    const { emailorphone, newPassword } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: emailorphone }, { phone: emailorphone }]
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
