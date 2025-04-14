const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const checkBroadcastMembership = require("../middleware/checkBroadcastMembership");
const {
  sendMessage,
  getMessages,
  getMessage,
  deleteMessage,
} = require("../controllers/message.controller");
const auth = require("../middleware/authentication");

// Send a message to a broadcast
router.post("/:broadcastId/messages", [auth, checkBroadcastMembership], sendMessage);

// Get all messages for a broadcast
router.get("/:broadcastId/messages", [auth, checkBroadcastMembership], getMessages);

// Get a single message
router.get("/:id", [auth, checkBroadcastMembership], getMessage);

// Delete a message
router.delete("/:id", [auth, checkBroadcastMembership], deleteMessage);

module.exports = router;
