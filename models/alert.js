const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertType: {
    type: String,
    required: true,
    enum: ['Warning', 'Emergency', 'Notice', 'Information']
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Resolved'],
    default: 'Active'
  }
});

module.exports = mongoose.model('Alert', alertSchema);