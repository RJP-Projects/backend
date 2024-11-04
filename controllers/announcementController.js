const Announcement = require('../models/announcement');
const Notification = require('../models/notification'); 

// Create Announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;
    const announcement = await Announcement.create({ title, description, date, time });

    await Notification.create({
      message: `New Announcement Created: ${title}`,
      date: new Date(),
      type: 'announcement'
    });
    
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(id, { title, description, date, time }, { new: true });

    // notification
    await Notification.create({
      message: `Announcement Updated: ${title}`,
      date: new Date(),
      type: 'announcement'
    });

    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
      const announcements = await Announcement.find().sort({ date: -1 });
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a Single Announcement by ID
  exports.getAnnouncementById = async (req, res) => {
    try {
      const { id } = req.params;
      const announcement = await Announcement.findById(id);
  
      if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
  
      res.status(200).json(announcement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete an Announcement
  exports.deleteAnnouncement = async (req, res) => {
    try {
      const { id } = req.params;
      const announcement = await Announcement.findByIdAndDelete(id);
  
      if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
      res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
