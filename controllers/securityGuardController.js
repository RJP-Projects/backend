const SecurityGuard = require('../models/SecurityGuard');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

exports.guardLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const guard = await SecurityGuard.findOne({ email });

        if (!guard) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        res.status(200).json({ message: 'Login successful.', guard }); 

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// Get all security guards
exports.getAllSecurityGuards = async (req, res) => {
    try {
        const securityGuards = await SecurityGuard.find();
        res.status(200).json(securityGuards);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving security guards', error });
    }
};

// Update a security guard
exports.updateSecurityGuard = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phoneNumber, shift, shiftDate, shiftTime, gender } = req.body;
        let aadhaarCard = req.file ? req.file.path : undefined;

        const securityGuard = await SecurityGuard.findByIdAndUpdate(id, {
            name,
            phoneNumber,
            shift,
            shiftDate,
            shiftTime,
            gender,
            ...(aadhaarCard && { aadhaarCard })
        }, { new: true });

        res.status(200).json({ message: 'Security Guard updated successfully', securityGuard });
    } catch (error) {
        res.status(500).json({ message: 'Error updating security guard', error });
    }
};

// Delete a security guard
exports.deleteSecurityGuard = async (req, res) => {
    try {
        const { id } = req.params;
        const securityGuard = await SecurityGuard.findByIdAndDelete(id);

        if (securityGuard && securityGuard.aadhaarCard) {
            fs.unlinkSync(securityGuard.aadhaarCard); 
        }

        res.status(200).json({ message: 'Security Guard deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting security guard', error });
    }
};

// Get a single security guard
exports.getSecurityGuardById = async (req, res) => {
    try {
        const { id } = req.params;
        const securityGuard = await SecurityGuard.findById(id);
        res.status(200).json(securityGuard);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving security guard', error });
    }
};
