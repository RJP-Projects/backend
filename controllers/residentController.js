const Resident = require('../models/Resident')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Select Resident Status
exports.selectStatus = async (req, res) => {
    const { residentStatus } = req.body;
    if (residentStatus === 'Occupied' || residentStatus === 'Vacate') {
        res.status(200).json({ message: `Proceed to choose role for ${residentStatus}` });
    } else {
        res.status(400).json({ message: 'Invalid Resident Status' });
    }
};

// Choose Owner or Tenant
exports.chooseRole = async (req, res) => {
    const { residentStatus, role } = req.body;
    if ((residentStatus === 'Occupied' || residentStatus === 'Vacate') &&
        (role === 'Owner' || role === 'Tenant')) {
        res.status(200).json({ message: `Proceed to fill ${role} form` });
    } else {
        res.status(400).json({ message: 'Invalid Role Selection' });
    }
};

//Add Resident
exports.addResident = async (req, res) => {
    const { residentType, ownerName, ownerPhone, ownerAddress, name, phoneNumber, email, age, gender, wing, unit, relation, profilePhoto, aadharCardFront, aadharCardBack, addressProof, rentAgreement, members, vehicles, residentStatus, userId} = req.body;
    try {
        // Generate a random password
        const randomPassword = crypto.randomBytes(6).toString('hex');

        // Create a new security guard
        const resident = new Resident({
            residentType, ownerName, ownerPhone,ownerAddress, name,email, phoneNumber,age, gender, wing, unit, relation, profilePhoto, aadharCardFront, aadharCardBack, addressProof, rentAgreement, members, vehicles, residentStatus, userId, password: randomPassword,
        });

        await resident.save();
        
        // Send email with password
        await sendEmail(
            email,
            `Hello ${name},\n\nYour account has been created. Use the following password to log in:\n\nPassword: ${randomPassword}`
        );

        res.status(201).json({
            message: 'Resident added successfully. Password sent to the email.',
            resident,
        });

        const user = await User.findById(userId);
        if (user) {
            user.ResidentIds.push(resident._id);
            await user.save();
        }

    } catch (error) {
        console.error('Error adding resident:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

const sendEmail = async (email, randomPassword) => {
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
        subject: 'Resident Password',
        text: `${randomPassword}`
    };

    await transporter.sendMail(mailOptions);
};


exports.residentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const resident = await Resident.findOne({ email });

        if (!resident) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        res.status(200).json({ message: 'Login successful.', resident }); 

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};