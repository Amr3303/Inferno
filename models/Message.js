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
      validate: {
        validator: function (value) {
          if (this.type === "query") {
            return (
              value &&
              typeof value === "object" &&
              "query" in value &&
              "details" in value
            );
          }
          return true;
        },
        message: (props) =>
          `Query type messages must include 'query' and 'details' fields`,
      },
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
      validate: {
        validator: function (value) {
          if (this.type === "location") {
            return value && typeof value.lat === 'number' && typeof value.lng === 'number';
          }
          return value === undefined;
        },
        message: (props) =>
          `Coordinates should only be present for location type messages`,
      },
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      required: function () {
        return this.type === "progress";
      },
      validate: {
        validator: function (value) {
          if (this.type === "progress") {
            return typeof value === 'number' && value >= 0 && value <= 100;
          }
          return value === undefined;
        },
        message: (props) =>
          `Progress should only be present for progress type messages`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
