const VisitorLog = require('../models/VisitorLog');

exports.createVisitorLog = async (req, res) => {
    try {
        const visitorLog = new VisitorLog(req.body);
        await visitorLog.save();
        res.status(201).json(visitorLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllVisitorLogs = async (req, res) => {
    try {
        const logs = await VisitorLog.find();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateVisitorLog = async (req, res) => {
    try {
        const log = await VisitorLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(log);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteVisitorLog = async (req, res) => {
    try {
        await VisitorLog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Visitor Log deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
