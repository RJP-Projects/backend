const express = require('express');
const { addOwner, addTenant, selectStatus, chooseRole } = require('../controllers/residentController');
const upload = require('../middlewares/fileUpload');
const { addOwnerValidation } = require('../middlewares/validateMiddleware');
const { addTenantValidation } = require('../middlewares/validateMiddleware');
const { validate } = require('../middlewares/validateMiddleware'); 
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/select-status', selectStatus);
router.post('/choose-role', chooseRole);
router.post('/add-tenant', protect, isAdmin, addTenantValidation, validate, upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'aadharCardFront', maxCount: 1 },
    { name: 'aadharCardBack', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'rentAgreement', maxCount: 1 }
]), addTenant);

router.post('/add-owner', protect, isAdmin, addOwnerValidation, validate, upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'aadharCardFront', maxCount: 1 },
    { name: 'aadharCardBack', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'rentAgreement', maxCount: 1 }
]), addOwner);

module.exports = router;
