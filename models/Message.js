const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "query", "location", "progress"],
      required: [true, "Please provide message type"],
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Please provide message content"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide transmitter"],
    },
    broadcast: {
      type: mongoose.Types.ObjectId,
      ref: "Broadcast",
      required: [true, "Please provide the associated broadcast"],
    },
    coordinates: {
      type: {
        lat: Number,
        lng: Number,
      },
      required: function () {
        return this.type === "location";
      },
      default: null,
      validate: {
        validator: function(value) {
          return this.type === "location" ? value !== null : value === null;
        },
        message: props => `Coordinates should only be present for location type messages`
      }
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      required: function () {
        return this.type === "progress";
      },
      default: null,
      validate: {
        validator: function(value) {
          return this.type === "progress" ? value !== null : value === null;
        },
        message: props => `Progress should only be present for progress type messages`
      }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
