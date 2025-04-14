const Broadcast = require("../models/Broadcast");
const { UnauthorizedError } = require("../errors");

const checkBroadcastMembership = async (req, res, next) => {
  const broadcastId = req.params.broadcastId || req.params.id;
  const userId = req.user.userId;

  const broadcast = await Broadcast.findOne({
    _id: broadcastId,
    $or: [{ transmitter: userId }, { agents: userId }],
  });

  if (!broadcast) {
    throw new UnauthorizedError(
      "Access denied. User is not a member of this broadcast"
    );
  }

  next();
};

module.exports = checkBroadcastMembership;
