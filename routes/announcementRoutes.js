const express = require('express');
const router = express.Router();
const {createAnnouncement, getAllAnnouncements, updateAnnouncement, getAnnouncementById, deleteAnnouncement} = require('../controllers/announcementController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', protect, isAdmin, createAnnouncement);
router.get('/', protect, isAdmin, getAllAnnouncements);
router.put('/:id', protect, isAdmin, updateAnnouncement);
router.get('/:id', protect, isAdmin, getAnnouncementById);
router.delete('/:id', protect, isAdmin, deleteAnnouncement);

module.exports = router;