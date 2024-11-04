const ResidentOwner = require('../models/ResidentOwner');
const ResidentTenant = require('../models/ResidentTenant');

// Select Resident Status
exports.selectStatus = async (req, res) => {
    const { residentStatus } = req.body;
    if (residentStatus === 'Occupied' || residentStatus === 'Vacate') {
        res.status(200).json({ message: `Proceed to choose role for ${residentStatus}` });
    } else {
        res.status(400).json({ message: 'Invalid Resident Status' });
    }
};

// Choose Owner or Tenant
exports.chooseRole = async (req, res) => {
    const { residentStatus, role } = req.body;
    if ((residentStatus === 'Occupied' || residentStatus === 'Vacate') &&
        (role === 'Owner' || role === 'Tenant')) {
        res.status(200).json({ message: `Proceed to fill ${role} form` });
    } else {
        res.status(400).json({ message: 'Invalid Role Selection' });
    }
};

// Add Owner
exports.addOwner = async (req, res) => {
  try {
    req.body.phoneNumber = req.body.phoneNumber.replace(/\D/g, '');
    
      const owner = new ResidentOwner(req.body);
      await owner.save();
      res.status(201).json({ message: 'Owner added successfully', owner });
  } catch (error) {
      if (error.name === 'ValidationError') {
          return res.status(400).json({ message: 'Validation failed', error: error.message });
      }
      res.status(500).json({ message: error.message });
  }
};


// Add Tenant
exports.addTenant = async (req, res) => {
    try {
        const tenant = new ResidentTenant(req.body);
        await tenant.save();
        res.status(201).json({ message: 'Tenant added successfully', tenant });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
