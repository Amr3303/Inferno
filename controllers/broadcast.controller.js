const { StatusCodes } = require("http-status-codes");
const broadcastService = require("../services/broadcast.service");

const createBroadcast = async (req, res) => {
  const { userId } = req.user;
  const result = await broadcastService.createBroadcast(req.body, userId);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "A broadcast has been created successfully.",
    data: result,
  });
};

const getAllBroadcasts = async (req, res) => {
  const result = await broadcastService.getAllBroadcasts();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "All the broadcasts.",
    data: result,
  });
};

const getUnjoinedBroadcasts = async (req, res) => {
  const { userId } = req.user;
  const allBroadcasts = await broadcastService.getAllBroadcasts();

  // Assuming each broadcast has a 'participants' field that contains user IDs of joined users
  const unjoinedBroadcasts = allBroadcasts.filter(
    (broadcast) => !broadcast.agents || !broadcast.agents.includes(userId)
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Broadcasts that you have not joined.",
    data: unjoinedBroadcasts,
  });
};

const getSingleBroadcast = async (req, res) => {
  const { id } = req.params;
  const result = await broadcastService.getBroadcastById(id);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Broadcast not found.",
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Broadcast retrieved successfully.",
    data: result,
  });
};

const joinBroadcast = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  // Assuming there's a service method to join a broadcast
  const result = await broadcastService.joinBroadcast(id, userId);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Broadcast not found or already joined.",
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Successfully joined the broadcast.",
    data: result,
  });
};

const getMyBroadcasts = async (req, res) => {
  const { userId } = req.user;

  const result = await broadcastService.getMyBroadcasts(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "My broadcasts retrieved successfully.",
    length: result.length,
    data: result,
  });
};

const deleteAllBroadcasts = async (req, res) => {
  const result = await broadcastService.deleteAllBroadcasts();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "All broadcasts deleted successfully.",
    data: result,
  });
};

const getBroadcastAgents = async (req, res) => {
  const { broadcastId } = req.params;
  const result = await broadcastService.getBroadcastAgents(broadcastId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Broadcast agents retrieved successfully.",
    length: result.agents.length,
    data: result.agents,
  });
};

// Add to exports
module.exports = {
  createBroadcast,
  getAllBroadcasts,
  getUnjoinedBroadcasts,
  getSingleBroadcast,
  joinBroadcast,
  getMyBroadcasts,
  deleteAllBroadcasts,
  getBroadcastAgents,
};
