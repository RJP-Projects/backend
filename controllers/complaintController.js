const Complaint = require('../models/Complaint');

// Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ message: 'Complaint created successfully', complaint });
  } catch (error) {
    res.status(500).json({ error: 'Error creating complaint' });
  }
};

// Update Complaint
exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedComplaint) return res.status(404).json({ error: 'Complaint not found' });
    res.status(200).json({ message: 'Complaint updated successfully', updatedComplaint });
  } catch (error) {
    res.status(500).json({ error: 'Error updating complaint' });
  }
};

// Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    if (!deletedComplaint) return res.status(404).json({ error: 'Complaint not found' });
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting complaint' });
  }
};

// Get Complaint by ID
exports.getComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching complaint' });
  }
};

// Get All Complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching complaints' });
  }
};
