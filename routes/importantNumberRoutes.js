const express = require('express');
const router = express.Router();
const importantNumberController = require('../controllers/importantNumberController');

router.post('/', importantNumberController.createImportantNumber);
router.get('/', importantNumberController.getAllImportantNumbers);
router.put('/:id', importantNumberController.updateImportantNumber);
router.delete('/:id', importantNumberController.deleteImportantNumber);

module.exports = router;
