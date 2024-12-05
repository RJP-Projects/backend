const express = require("express");
const chatController = require("../controllers/chatController");
const upload = require("../middlewares/fileUpload");

const router = express.Router();

router.get("/messages", chatController.getMessages);
router.post("/message", chatController.sendMessage);

// File upload
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({ fileUrl: `http://localhost:3000/${req.file.filename}` });
});

module.exports = router;
