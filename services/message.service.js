const Message = require("../models/Message");
const Broadcast = require("../models/Broadcast");
const CustomAPIError = require("../errors");
const pusherService = require("./pusher.service");

class MessageService {
  async sendMessage(messageData) {
    // Validate required fields
    if (
      !messageData.type ||
      !messageData.content ||
      !messageData.createdBy ||
      !messageData.broadcast
    ) {
      throw new CustomAPIError.BadRequestError("Missing required fields");
    }

    // Validate message type
    if (!["text", "query", "location", "progress"].includes(messageData.type)) {
      throw new CustomAPIError.BadRequestError("Invalid message type");
    }

    console.log("Done validating message type");

    // Validate broadcast ID
    const broadcast = await Broadcast.findById(messageData.broadcast);
    if (!broadcast) {
      throw new CustomAPIError.NotFoundError("Invalid broadcast ID");
    }

    console.log("Done validating broadcast ID");

    // Type-specific validations
    if (messageData.type === "location") {
      if (
        !messageData.coordinates ||
        typeof messageData.coordinates.lat !== "number" ||
        typeof messageData.coordinates.lng !== "number"
      ) {
        throw new CustomAPIError.BadRequestError(
          "Location messages require valid coordinates"
        );
      }
    }

    console.log("Done validating location");

    if (messageData.type === "progress") {
      if (
        typeof messageData.progress !== "number" ||
        messageData.progress < 0 ||
        messageData.progress > 100
      ) {
        throw new CustomAPIError.BadRequestError(
          "Progress messages require a valid progress value (0-100)"
        );
      }
    }

    console.log("Done validating progress");

    // Create base message object with common fields
    const messageObject = {
      type: messageData.type,
      content: messageData.content,
      createdBy: messageData.createdBy,
      broadcast: messageData.broadcast,
    };

    // Add type-specific fields only if needed
    if (messageData.type === "location") {
      messageObject.coordinates = messageData.coordinates;
    }

    if (messageData.type === "progress") {
      messageObject.progress = messageData.progress;
    }

    // Save message to database
    const savedMessage = await Message.create(messageObject);

    // Broadcast the message to all connected clients
    const broadcastPayload = {
      type: savedMessage.type,
      content: savedMessage.content,
      messageId: savedMessage._id,
      createdBy: savedMessage.createdBy,
      createdAt: savedMessage.createdAt,
      ...(savedMessage.type === "location" && {
        coordinates: savedMessage.coordinates,
      }),
      ...(savedMessage.type === "progress" && {
        progress: savedMessage.progress,
      }),
    };

    // Broadcast using Pusher with the correct channel name
    await pusherService.broadcastMessage(
      `broadcast-${savedMessage.broadcast.toString()}`,  // Add the prefix here
      broadcastPayload
    );

    console.log("save message to string: ", savedMessage.broadcast.toString());
    console.log("broadcast payload: ", broadcastPayload);

    console.log("Done broadcasting message");

    return savedMessage;
  }

  async getMessages(broadcastId, queryOptions = {}) {
    const { type, page = 1, limit = 10, sort = "-createdAt" } = queryOptions;

    const query = { broadcast: broadcastId };
    if (type) {
      query.type = type;
    }

    const skip = (page - 1) * limit;

    const messages = await Message.find(query)
      .populate("createdBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalMessages = await Message.countDocuments(query);

    return {
      messages,
      currentPage: page,
      totalPages: Math.ceil(totalMessages / limit),
      totalMessages,
    };
  }

  async getMessage(messageId) {
    const message = await Message.findById(messageId)
      .populate("createdBy", "name email")
      .populate("broadcast", "name description");

    if (!message) {
      throw new CustomAPIError.NotFoundError(
        `No message found with id: ${messageId}`
      );
    }

    // Format the response
    return {
      id: message._id,
      type: message.type,
      content: message.content,
      createdAt: message.createdAt,
      broadcast: {
        id: message.broadcast._id,
        name: message.broadcast.name,
        description: message.broadcast.description,
      },
      sender: {
        id: message.createdBy._id,
        name: message.createdBy.name,
        email: message.createdBy.email,
      },
      ...(message.type === "location" && { coordinates: message.coordinates }),
      ...(message.type === "progress" && { progress: message.progress }),
    };
  }

  async updateMessage(messageId, updateData) {
    return await Message.findByIdAndUpdate(messageId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteMessage(messageId) {
    return await Message.findByIdAndDelete(messageId);
  }
}

module.exports = new MessageService();