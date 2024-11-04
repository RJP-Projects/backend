const mongoose = require('mongoose');

const securityProtocolSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
});

module.exports = mongoose.model('SecurityProtocol', securityProtocolSchema);
