const Message = require("../models/Message");
const Broadcast = require("../models/Broadcast");
const CustomAPIError = require("../errors");

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

    return await Message.create({
      type: messageData.type,
      content: messageData.content,
      createdBy: messageData.createdBy,
      broadcast: messageData.broadcast,
      coordinates: messageData.coordinates,
      progress: messageData.progress,
    });
  }

  async getMessages(broadcastId) {
    return await Message.find({ broadcast: broadcastId })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
  }

  async getMessage(messageId) {
    return await Message.findById(messageId).populate(
      "createdBy",
      "name email"
    );
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
