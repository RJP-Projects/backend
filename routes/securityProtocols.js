const express = require('express');
const router = express.Router();
const {createSecurityProtocol, getAllSecurityProtocols, updateSecurityProtocol, deleteSecurityProtocol} = require('../controllers/securityProtocolController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createSecurityProtocol);
router.get('/', protect, getAllSecurityProtocols);
router.put('/:id', protect, updateSecurityProtocol);
router.delete('/:id', protect, deleteSecurityProtocol);

module.exports = router;
