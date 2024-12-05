const mongoose = require('mongoose');

const securityGuardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    shift: { type: String, enum: ['Day', 'Night'], required: true },
    shiftDate: { type: Date, required: true },
    shiftTime: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    aadhaarCard: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Hash password before saving
securityGuardSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
module.exports = mongoose.model('SecurityGuard', securityGuardSchema);
