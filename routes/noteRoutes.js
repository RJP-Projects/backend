// routes/noteRoutes.js
const express = require("express");
const { createNote, getNotes, getNote, updateNote, deleteNote } = require("../controllers/noteController");
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/create", protect, isAdmin, createNote);          
router.get("/", protect, isAdmin, getNotes);             
router.get("/:id", protect, isAdmin, getNote);           
router.put("/:id", protect, isAdmin, updateNote);        
router.delete("/:id", protect, isAdmin, deleteNote);     

module.exports = router;
