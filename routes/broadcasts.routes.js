const express = require("express");
const router = express.Router();

const auth = require("../middleware/authentication");
const {
  createBroadcast,
  getAllBroadcasts,
  getUnjoinedBroadcasts,
  getSingleBroadcast,
  joinBroadcast,
  getMyBroadcasts,
  deleteAllBroadcasts,
  getBroadcastAgents,
} = require("../controllers/broadcast.controller");

router.post("/", auth, createBroadcast);
router.get("/", auth, getAllBroadcasts);
router.get("/unjoined", auth, getUnjoinedBroadcasts);
router.get("/my", auth, getMyBroadcasts);
router.get("/my", auth, getMyBroadcasts);
router.get("/:id", auth, getSingleBroadcast);
router.post("/:id/join", auth, joinBroadcast);
router.delete("/deleteAllBroadcasts", deleteAllBroadcasts);
router.get("/:broadcastId/agents", auth, getBroadcastAgents);

module.exports = router;
