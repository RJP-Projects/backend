const OtherIncome = require('../models/OtherIncome');

// Add other income
exports.addOtherIncome = async (req, res) => {
    try {
        const otherIncome = new OtherIncome(req.body);
        await otherIncome.save();
        res.status(201).json({ message: 'Other Income added successfully', otherIncome });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View all other income 
exports.getAllOtherIncome = async (req, res) => {
    try {
        const incomeRecords = await OtherIncome.find();
        res.status(200).json(incomeRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View single other income record by ID
exports.getOtherIncomeById = async (req, res) => {
    try {
        const otherIncome = await OtherIncome.findById(req.params.id);
        if (!otherIncome) return res.status(404).json({ message: 'Other Income record not found' });
        res.status(200).json(otherIncome);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update other income 
exports.updateOtherIncome = async (req, res) => {
    try {
        const otherIncome = await OtherIncome.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!otherIncome) return res.status(404).json({ message: 'Other Income record not found' });
        res.status(200).json({ message: 'Other Income updated successfully', otherIncome });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete other income 
exports.deleteOtherIncome = async (req, res) => {
    try {
        const otherIncome = await OtherIncome.findByIdAndDelete(req.params.id);
        if (!otherIncome) return res.status(404).json({ message: 'Other Income record not found' });
        res.status(200).json({ message: 'Other Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
