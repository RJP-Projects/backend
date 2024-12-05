const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    age: Number,
    gender: String,
    relation: String
});

const vehicleSchema = new mongoose.Schema({
    type: { type: String, enum: ['Two Wheeler', 'Four Wheeler'] },
    vehicleNumber: String,
    vehicleName: String
});

const residentSchema = new mongoose.Schema({
    residentType: { type: String, enum: ['Owner', 'Tenant'], required: true }, // Differentiates Owner and Tenant
    ownerName: { type: String }, // Applicable for Tenant
    ownerPhone: { type: String }, // Applicable for Tenant
    ownerAddress: String, // Applicable for Tenant
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    age: Number,
    gender: String,
    wing: String,
    unit: String,
    relation: String,
    profilePhoto: String,
    aadharCardFront: String,
    aadharCardBack: String,
    addressProof: String,
    rentAgreement: String,
    members: [memberSchema],
    vehicles: [vehicleSchema],
    residentStatus: { type: String, enum: ['Occupied', 'Vacate'], default: 'Occupied' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Resident', residentSchema);
