const websocketService = require("../services/websocket.service");
const { StatusCodes } = require("http-status-codes");

const getConnectionStats = async (req, res) => {
  const { broadcastId } = req.params;

  const connectedClients =
    websocketService.getConnectedClientsCount(broadcastId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: `Connection statistics for broadcast ${broadcastId}`,
    data: {
      broadcastId,
      connectedClients,
    },
  });
};

module.exports = {
  getConnectionStats,
};
