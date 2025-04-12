const express = require("express");
const router = express.Router();

const auth = require("../middleware/authentication");
const {
  createBroadcast,
  getAllBroadcasts,
  getUnjoinedBroadcasts,
  getSingleBroadcast,
} = require("../controllers/broadcast.controller");

router.post("/", auth, createBroadcast);
router.get("/", auth, getAllBroadcasts);
router.get("/unjoined", auth, getUnjoinedBroadcasts);
router.get("/:id", auth, getSingleBroadcast);

module.exports = router;
