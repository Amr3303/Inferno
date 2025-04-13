const mongoose = require("mongoose");

const BroadcastSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a broadcast name"],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide a description for the broadcast"],
      maxlength: 500,
    },
    agents: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the transmitter"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Broadcast", BroadcastSchema);
