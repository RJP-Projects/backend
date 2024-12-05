const express = require('express');
const { addResident, selectStatus, chooseRole } = require('../controllers/residentController');
const upload = require('../middlewares/fileUpload');
const { addResidentValidation } = require('../middlewares/validateMiddleware');
const { validate } = require('../middlewares/validateMiddleware'); 
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/select-status', selectStatus);
router.post('/choose-role', chooseRole);
router.post('/add-resident', protect, addResidentValidation, validate, upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'aadharCardFront', maxCount: 1 },
    { name: 'aadharCardBack', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'rentAgreement', maxCount: 1 }
]), addResident);

module.exports = router;
