const Pusher = require("pusher");

class PusherService {
  constructor() {
    console.log("Initializing Pusher Service...");
    this.pusher = new Pusher({
      appId: process.env.app_id,
      key: process.env.key,
      secret: process.env.secret,
      cluster: process.env.cluster,
      useTLS: true,
    });
    console.log(
      "Pusher Service initialized with cluster:",
      process.env.cluster
    );
  }

  async broadcastMessage(broadcastId, message) {
    console.log("🚀 Starting Pusher broadcast...");
    console.log("Channel:", `broadcast-${broadcastId}`);
    console.log("Message payload:", JSON.stringify(message, null, 2));

    try {
      console.log("Attempting to trigger Pusher message...");
      const result = await this.pusher.trigger(
        `broadcast-${broadcastId}`,
        "new-message",
        message
      );

      console.log("✅ Pusher trigger successful!");
      console.log("Pusher response:", result);
      return true;
    } catch (error) {
      console.error("❌ Error broadcasting message via Pusher:");
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      console.error("Channel:", `broadcast-${broadcastId}`);
      console.error("Failed message:", message);
      return false;
    }
  }
}

module.exports = new PusherService();