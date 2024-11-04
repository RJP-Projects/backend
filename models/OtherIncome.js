const mongoose = require('mongoose');

const otherIncomeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String },
    totalMembers: { type: Number, default: 0 }
});

module.exports = mongoose.model('OtherIncome', otherIncomeSchema);
