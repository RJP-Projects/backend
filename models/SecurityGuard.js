const mongoose = require('mongoose');

const securityGuardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    shift: { type: String, enum: ['Day', 'Night'], required: true },
    shiftDate: { type: Date, required: true },
    shiftTime: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    aadhaarCard: { type: String } 
});

module.exports = mongoose.model('SecurityGuard', securityGuardSchema);
