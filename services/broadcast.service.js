const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Broadcast = require("../models/Broadcast");
const { UnauthenticatedError, BadRequestError } = require("../errors");

class BroadcastService {
  async createBroadcast(data, userId) {
    const { name, description } = data;
    const createdBy = userId;

    console.log(
      `Name: ${name}, \nDescription: ${description}\nCreatedBy: ${createdBy}`
    );

    if (!name || !description || !createdBy) {
      throw new BadRequestError(
        "Please provide all required fields: name, description"
      );
    }

    const broadcast = await Broadcast.create({
      name,
      description,
      createdBy,
    });

    if (!broadcast) {
      throw new BadRequestError("Error while creating the broadcast");
    }

    console.log(`broadcast: ${broadcast}`);

    return {
      id: broadcast._id,
      name: broadcast.name,
      description: broadcast.description,
      createdBy: broadcast.createdBy,
      createdAt: broadcast.createdAt,
      role: "transmitter",
      agents: [],
    };
  }

  async getAllBroadcasts() {
    const broadcasts = await Broadcast.find({});
    return broadcasts;
  }

  async getBroadcastById(id) {
    if (!id) {
      throw new BadRequestError("Please provide a broadcast ID");
    }

    const broadcast = await Broadcast.findById(id);
    if (!broadcast) {
      throw new UnauthenticatedError("Broadcast not found");
    }

    return {
      id: broadcast._id,
      name: broadcast.name,
      description: broadcast.description,
      createdBy: broadcast.createdBy,
      createdAt: broadcast.createdAt,
    };
  }

  async joinBroadcast(broadcastId, userId) {
    if (!broadcastId || !userId) {
      throw new BadRequestError("Broadcast ID and User ID are required");
    }

    const broadcast = await Broadcast.findById(broadcastId);
    if (!broadcast) {
      throw new UnauthenticatedError("Broadcast not found");
    }

    // Check if the user is already a participant
    if (broadcast.agents && broadcast.agents.includes(userId)) {
      throw new BadRequestError("User has already joined this broadcast");
    }

    // Add user to the broadcast's participants
    broadcast.agents = broadcast.agents || [];
    broadcast.agents.push(userId);

    await broadcast.save();

    return {
      id: broadcast._id,
      name: broadcast.name,
      description: broadcast.description,
      createdBy: broadcast.createdBy,
      createdAt: broadcast.createdAt,
      agents: broadcast.agents,
    };
  }

  async getMyBroadcasts(userId) {
    if (!userId) {
      throw new BadRequestError("User ID is required");
    }

    // Find broadcasts where user is either creator or participant
    const broadcasts = await Broadcast.find({
      $or: [{ createdBy: userId }, { agents: userId }],
    }).populate("createdBy", "name email");

    return broadcasts.map((broadcast) => {
      const baseResponse = {
        id: broadcast._id,
        name: broadcast.name,
        description: broadcast.description,
        role:
          broadcast.createdBy._id.toString() === userId
            ? "transmitter"
            : "agent",
      };

      // Only include agents array if user is the transmitter
      if (broadcast.createdBy._id.toString() === userId) {
        baseResponse.agents = broadcast.agents;
      }

      return baseResponse;
    });
  }

  deleteAllBroadcasts() {
    return Broadcast.deleteMany({});
  }
}

module.exports = new BroadcastService();