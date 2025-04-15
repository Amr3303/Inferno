const express = require('express');
const router = express.Router();
const { getConnectionStats } = require('../controllers/websocket.controller');
const auth = require('../middleware/authentication');

router.get('/stats/:broadcastId', auth, getConnectionStats);

module.exports = router;