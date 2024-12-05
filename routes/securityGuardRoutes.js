const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllSecurityGuards, getSecurityGuardById, updateSecurityGuard, deleteSecurityGuard} = require('../controllers/securityGuardController');
const { protect } = require('../middlewares/authMiddleware');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', protect, getAllSecurityGuards);
router.get('/:id', protect, getSecurityGuardById);
router.put('/:id', protect, upload.single('aadhaarCard'), updateSecurityGuard);
router.delete('/:id', protect, deleteSecurityGuard);

module.exports = router;
