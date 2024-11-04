const Maintenance = require('../models/Maintenance');

// add maintenance
exports.addMaintenance = async (req, res) => {
    try {
        const maintenance = new Maintenance(req.body);
        await maintenance.save();
        res.status(201).json({ message: 'Maintenance added successfully', maintenance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View all maintenance 
exports.getAllMaintenance = async (req, res) => {
    try {
        const maintenanceRecords = await Maintenance.find()
        res.status(200).json(maintenanceRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View single maintenance record by ID
exports.getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id)
        if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update maintenance 
exports.updateMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
        res.status(200).json({ message: 'Maintenance updated successfully', maintenance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete maintenance 
exports.deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
        if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
        res.status(200).json({ message: 'Maintenance deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

