const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility' },
    announcementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Announcement'},
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
