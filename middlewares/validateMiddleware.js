const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check('firstName').not().isEmpty().withMessage('First Name is required'),
    check('lastName').not().isEmpty().withMessage('Last Name is required'),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('phone').isMobilePhone().withMessage('Enter a valid phone number'),
    check('country').not().isEmpty().withMessage('Country is required'),
    check('state').not().isEmpty().withMessage('State is required'),
    check('city').not().isEmpty().withMessage('City is required'),
    check('society').not().isEmpty().withMessage('Please select a society'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateLogin = [
    check('emailorphone').not().isEmpty().withMessage('Email or Phone is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.addOwnerValidation = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('phoneNumber').isLength({ min: 10 }).withMessage('Please enter a valid phone number'),
    check('age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
    check('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
];

exports.addTenantValidation = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('phoneNumber').isLength({ min: 10 }).withMessage('Please enter a valid phone number'),
    check('age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
    check('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
