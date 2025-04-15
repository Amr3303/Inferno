const Pusher = require("pusher");

class PusherService {
  constructor() {
    this.pusher = new Pusher({
      appId: process.env.app_id,
      key: process.env.key,
      secret: process.env.secret,
      cluster: process.env.cluster,
      useTLS: true,
    });
  }

  async broadcastMessage(broadcastId, message) {
    try {
      await this.pusher.trigger(
        `broadcast-${broadcastId}`,
        "new-message",
        message
      );
      return true;
    } catch (error) {
      console.error("Error broadcasting message:", error);
      return false;
    }
  }
}

module.exports = new PusherService();