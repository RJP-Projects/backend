const express = require('express');
const router = express.Router();
const {
  createComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaint,
  getAllComplaints,
} = require('../controllers/complaintController');


router.post('/create', createComplaint);
router.put('/update/:id', updateComplaint);
router.delete('/delete/:id', deleteComplaint);
router.get('/:id', getComplaint);
router.get('/', getAllComplaints);

module.exports = router;
