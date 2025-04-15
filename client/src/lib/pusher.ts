// src/lib/pusher-client.ts
import Pusher from 'pusher-js';

// Configure Pusher with your app key and cluster
const PUSHER_KEY = '7cc17b8ffe1acd631dea';
const PUSHER_CLUSTER = 'eu';

// Private variable to hold the Pusher instance
let pusherInstance: Pusher | null = null;

// Function to get or create the Pusher instance
export const getPusherInstance = (): Pusher => {
  if (!pusherInstance) {
    pusherInstance = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
    });
  }
  return pusherInstance;
};

// Function to clean up the Pusher instance
export const cleanupPusher = (): void => {
  if (pusherInstance) {
    pusherInstance.disconnect();
    pusherInstance = null;
  }
};

// Export a default getter for convenience
export default getPusherInstance;