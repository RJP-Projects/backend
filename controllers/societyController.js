const { validationResult } = require('express-validator');
const Society = require('../models/Society');

// Create Society
exports.createSociety = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { societyName, address, country, state, city, zipCode } = req.body;

  try {
    
    let society = await Society.findOne({ societyName });
    if (society) {
      return res.status(400).json({ msg: 'Society already exists' });
    }
    society = new Society({
      societyName,
      address,
      country,
      state,
      city,
      zipCode,
    });

    await society.save();
    res.status(201).json({ msg: 'Society created successfully', society });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
