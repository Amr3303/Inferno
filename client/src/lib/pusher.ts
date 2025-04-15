// src/lib/pusher-client.ts
import Pusher from 'pusher-js';

const PUSHER_KEY = '7cc17b8ffe1acd631dea';
const PUSHER_CLUSTER = 'eu';

let pusherInstance: Pusher | null = null;

export const getPusherInstance = (): Pusher => {
  if (!pusherInstance) {
    console.log('Initializing new Pusher instance...');
    pusherInstance = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
    });
    
    // Add global error handlers
    pusherInstance.connection.bind('error', (err: any) => {
      console.error('Pusher connection error:', err);
    });

    pusherInstance.connection.bind('connected', () => {
      console.log('✅ Pusher connected successfully');
    });

    pusherInstance.connection.bind('disconnected', () => {
      console.log('❌ Pusher disconnected');
    });
  }
  return pusherInstance;
};

export const cleanupPusher = () => {
  if (pusherInstance) {
    console.log('Cleaning up Pusher instance...');
    pusherInstance.disconnect();
    pusherInstance = null;
  }
};

// Export a default getter for convenience
export default getPusherInstance;

// lib/pusher.ts
// import Pusher from 'pusher-js';

// const getPusherInstance = () => {
//   return new Pusher('YOUR_APP_KEY', {
//     cluster: 'YOUR_APP_CLUSTER',
//   });
// };

// // export default getPusherInstance;
// // lib/pusher.ts
// import Pusher from 'pusher-js';

// const getPusherInstance = () => {
//   const pusher = new Pusher('7cc17b8ffe1acd631dea', {
//     cluster: 'eu',
//   });

//   // الاستماع إلى حالة الاتصال
//   pusher.connection.bind('connected', () => {
//     console.log('Pusher connected successfully!');
//   });

//   pusher.connection.bind('error', (error: any) => {
//     console.error('Error connecting to Pusher:', error);
//   });

//   pusher.connection.bind('disconnected', () => {
//     console.log('Pusher disconnected.');
//   });
//   // التحقق من حالة الاشتراك
// pusher.subscribe('your-channel').bind('pusher:subscription_error', (error) => {
//   console.error('Subscription error:', error);
// });

// pusher.subscribe('your-channel').bind('pusher:subscription_succeeded', () => {
//   console.log('Subscribed to channel successfully');
// });

//   return pusher;
// };

// export default getPusherInstance;
