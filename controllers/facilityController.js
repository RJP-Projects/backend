const Facility = require('../models/facility');
const Notification = require('../models/notification');

exports.createFacility = async (req, res) => {
    try {
        const { name, description, scheduleServiceDate, remindBeforeDays } = req.body;
        
        const facility = new Facility({ name, description, scheduleServiceDate, remindBeforeDays });
        await facility.save();

        // notification 
        const notificationMessage = `New Facility Created: ${name} - Schedule Date: ${scheduleServiceDate}`;
        const notification = new Notification({ message: notificationMessage, facilityId: facility._id });
        await notification.save();

        res.status(201).json({ message: 'Facility created and notification sent.', facility, notification });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create facility' });
    }
};

exports.getFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve facilities' });
    }
};

exports.editFacility = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFacility = await Facility.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedFacility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        res.status(200).json({ message: 'Facility updated successfully', updatedFacility });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update facility' });
    }
};

exports.deleteFacility = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFacility = await Facility.findByIdAndDelete(id);

        if (!deletedFacility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        res.status(200).json({ message: 'Facility deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete facility' });
    }
};
