const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { validateAlert } = require('../middlewares/validateMiddleware');

router.post('/', validateAlert, alertController.createAlert);
router.get('/', alertController.getAlerts);

module.exports = router;