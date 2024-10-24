const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  society: { type: mongoose.Schema.Types.ObjectId, ref: 'Society' },
  password: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }, 
});

module.exports = mongoose.model('User', UserSchema);