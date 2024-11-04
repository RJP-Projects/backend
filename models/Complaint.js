const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complainerName: { type: String, required: true },
  complaintName: { type: String, required: true },
  description: { type: String, required: true },
  wing: { type: String, required: true },
  unit: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  status: { type: String, enum: ['Open', 'Pending', 'Solve'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
