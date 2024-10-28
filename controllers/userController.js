const User = require('../models/User');

// get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.phone = req.body.phone || user.phone;
        user.email = req.body.email || user.email;
        user.country = req.body.country || user.country;
        user.state = req.body.state || user.state;
        user.city = req.body.city || user.city;
        user.society = req.body.society || user.society;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phone: updatedUser.phone,
            email: updatedUser.email,
            society: updatedUser.society,
            country: updatedUser.country,
            state: updatedUser.state,
            city: updatedUser.city,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
