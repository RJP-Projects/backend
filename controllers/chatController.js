const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.query;
    const messages = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { from, to, message, type } = req.body;
    const msg = new Message({ from, to, message, type });
    await msg.save();
    res.status(201).json({ message: "Message sent", msg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
