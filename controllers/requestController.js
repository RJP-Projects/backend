const Request = require('../models/Request');

// Create a new request
exports.createRequest = async (req, res) => {
    try {
        const request = new Request(req.body);
        await request.save();
        res.status(201).json({ message: 'Request created successfully', request });
    } catch (error) {
        res.status(400).json({ message: 'Error creating request', error });
    }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching requests', error });
    }
};

// Get a single request by ID
exports.getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching request', error });
    }
};

// Update a request by ID
exports.updateRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request updated successfully', request });
    } catch (error) {
        res.status(400).json({ message: 'Error updating request', error });
    }
};

// Delete a request by ID
exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting request', error });
    }
};
