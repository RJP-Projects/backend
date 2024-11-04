const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');

router.post('/create', facilityController.createFacility);
router.get('/', facilityController.getFacilities);
router.put('/edit/:id', facilityController.editFacility);
router.delete('/delete/:id', facilityController.deleteFacility);

module.exports = router;
