const mongoose = require('mongoose');

const ImportantNumberSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('ImportantNumber', ImportantNumberSchema);
