const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  sendMessage,
  getMessages,
  getMessage,
  deleteMessage,
} = require("../controllers/message.controller");
const auth = require("../middleware/authentication");

// Send a message to a broadcast
router.post("/:broadcastId/messages", auth, sendMessage);

// Get all messages for a broadcast
router.get("/broadcast/:broadcastId", getMessages);

// Get a single message
router.get("/:id", getMessage);

// Delete a message
router.delete("/:id", deleteMessage);

module.exports = router;
