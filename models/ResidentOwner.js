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

const residentOwnerSchema = new mongoose.Schema({
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
    residentStatus: { type: String, enum: ['Occupied', 'Vacate'], default: 'Occupied' }
});

module.exports = mongoose.model('ResidentOwner', residentOwnerSchema);
