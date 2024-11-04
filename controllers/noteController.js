const Note = require("../models/Note");

// Create Note
exports.createNote = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newNote = new Note({
      title,
      description,
      date,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

// Get All Notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notes", error });
  }
};

// Get Single Note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving note", error });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description, date },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};
