const WebSocket = require("ws");

class WebSocketService {
  constructor() {
    this.wss = null;
    this.clients = new Map(); // Map to store clients with their broadcast subscriptions
  }

  initialize(server) {
    this.wss = new WebSocket.Server({ 
      server,
      path: "/ws"
    });

    this.wss.on("connection", (ws, req) => {
      console.log("Client connected");

      // Parse URL to get query parameters
      const url = new URL(req.url, req.headers.origin || 'http://localhost:5000');
      const userId = url.searchParams.get("userId");
      const broadcastId = url.searchParams.get("broadcastId");

      if (userId && broadcastId) {
        // Store client with its broadcast subscription
        if (!this.clients.has(broadcastId)) {
          this.clients.set(broadcastId, new Map());
        }
        this.clients.get(broadcastId).set(userId, ws);

        // Send welcome message
        ws.send(
          JSON.stringify({
            type: "system",
            content: `Connected to broadcast: ${broadcastId}`,
            timestamp: new Date(),
          })
        );
      }

      // Handle client messages
      ws.on("message", (message) => {
        try {
          const parsedMessage = JSON.parse(message);
          console.log("Received message:", parsedMessage);
          // Handle client messages if needed
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      });

      // Handle disconnection
      ws.on("close", () => {
        console.log("Client disconnected");
        if (userId && broadcastId && this.clients.has(broadcastId)) {
          this.clients.get(broadcastId).delete(userId);
          // Clean up empty broadcast maps
          if (this.clients.get(broadcastId).size === 0) {
            this.clients.delete(broadcastId);
          }
        }
      });

      // Handle errors
      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    });
  }

  // Broadcast a message to all clients subscribed to a specific broadcast
  broadcastMessage(broadcastId, message) {
    if (!this.clients.has(broadcastId)) {
      console.log(`No clients connected to broadcast: ${broadcastId}`);
      return false;
    }

    const clients = this.clients.get(broadcastId);
    const messageString = JSON.stringify(message);

    console.log('Broadcasting to clients:', {
      broadcastId,
      numberOfClients: clients.size,
      message: message
    });

    let successCount = 0;
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(messageString);
          successCount++;
          console.log('Message sent successfully to client');
        } catch (error) {
          console.error('Error sending message to client:', error);
        }
      } else {
        console.log('Client not ready, state:', client.readyState);
      }
    });

    console.log(`Message broadcast to ${successCount} clients in broadcast: ${broadcastId}`);
    return successCount > 0;
  }

  // Get count of connected clients for a broadcast
  getConnectedClientsCount(broadcastId) {
    if (!this.clients.has(broadcastId)) {
      return 0;
    }
    return this.clients.get(broadcastId).size;
  }
}

module.exports = new WebSocketService();
