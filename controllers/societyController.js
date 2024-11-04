const Society = require('../models/Society');

exports.createSociety = async (req, res) => {
    const { name, address, country, state, city, zipCode } = req.body;

    try {
        const societyExists = await Society.findOne({ name });
        if (societyExists) {
            return res.status(400).json({ message: 'Society already exists' });
        }

        const society = await Society.create({
            name, address, country, state, city, zipCode
        });

        res.status(201).json({ message: 'Society created successfully', society });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSocieties = async (req, res) => {
    try {
        const societies = await Society.find();
        res.status(200).json(societies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
