const express = require('express');
const router = express.Router();
const {createSecurityProtocol, getAllSecurityProtocols, updateSecurityProtocol, deleteSecurityProtocol} = require('../controllers/securityProtocolController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', protect, isAdmin, createSecurityProtocol);
router.get('/', protect, isAdmin, getAllSecurityProtocols);
router.put('/:id', protect, isAdmin, updateSecurityProtocol);
router.delete('/:id', protect, isAdmin, deleteSecurityProtocol);

module.exports = router;
