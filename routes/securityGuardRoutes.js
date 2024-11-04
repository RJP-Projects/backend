const express = require('express');
const router = express.Router();
const multer = require('multer');
const {createSecurityGuard, getAllSecurityGuards, getSecurityGuardById, updateSecurityGuard, deleteSecurityGuard} = require('../controllers/securityGuardController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post('/', protect, isAdmin, upload.single('aadhaarCard'), createSecurityGuard);
router.get('/', protect, isAdmin, getAllSecurityGuards);
router.get('/:id', protect, isAdmin, getSecurityGuardById);
router.put('/:id', protect, isAdmin, upload.single('aadhaarCard'), updateSecurityGuard);
router.delete('/:id', protect, isAdmin, deleteSecurityGuard);

module.exports = router;
