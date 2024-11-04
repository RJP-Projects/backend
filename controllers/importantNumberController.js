const ImportantNumber = require('../models/ImportantNumber');

// Create new important number
exports.createImportantNumber = async (req, res) => {
    try {
        const newNumber = new ImportantNumber(req.body);
        await newNumber.save();
        res.status(201).json(newNumber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all important numbers
exports.getAllImportantNumbers = async (req, res) => {
    try {
        const numbers = await ImportantNumber.find();
        res.status(200).json(numbers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an important number
exports.updateImportantNumber = async (req, res) => {
    try {
        const updatedNumber = await ImportantNumber.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedNumber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an important number
exports.deleteImportantNumber = async (req, res) => {
    try {
        await ImportantNumber.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Important number deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
