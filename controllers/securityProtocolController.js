const SecurityProtocol = require('../models/SecurityProtocol');

exports.createSecurityProtocol = async (req, res) => {
    try {
        const protocol = new SecurityProtocol(req.body);
        await protocol.save();
        res.status(201).json(protocol);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllSecurityProtocols = async (req, res) => {
    try {
        const protocols = await SecurityProtocol.find();
        res.json(protocols);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSecurityProtocol = async (req, res) => {
    try {
        const protocol = await SecurityProtocol.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(protocol);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteSecurityProtocol = async (req, res) => {
    try {
        await SecurityProtocol.findByIdAndDelete(req.params.id);
        res.json({ message: 'Security Protocol deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
