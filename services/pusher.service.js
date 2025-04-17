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

  async broadcastMessage(message) {
    try {
      await this.pusher.trigger(
        "new-message",
        "message-event",
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