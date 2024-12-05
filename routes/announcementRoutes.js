const express = require('express');
const router = express.Router();
const {createAnnouncement, getAllAnnouncements, updateAnnouncement, getAnnouncementById, deleteAnnouncement} = require('../controllers/announcementController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createAnnouncement);
router.get('/', protect, getAllAnnouncements);
router.put('/:id', protect, updateAnnouncement);
router.get('/:id', protect, getAnnouncementById);
router.delete('/:id', protect, deleteAnnouncement);

module.exports = router;