// // import { useState, useEffect } from 'react';
// // import Pusher from 'pusher-js';

// // // API endpoints and constants
// // const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
// // const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;

// // // Pusher Configuration
// // const pusher = new Pusher('7cc17b8ffe1acd631dea', {
// //   cluster: 'eu',
// //   // authEndpoint: 'https://your-auth-endpoint.com/pusher/auth', // Set up the authentication endpoint
// // });
// // // Define the Message interface
// // export interface Message {
// //   id: string;
// //   type: 'text' | 'location' | 'process' | 'query';
// //   content: string;
// //   timestamp?: string;
// //   // Add other properties as needed
// // }

// // export const useFetchMessages = () => {
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const [textMessages, setTextMessages] = useState<Text[]>([]);
// //   const [loadingText, setLoadingText] = useState(false);
// //   const [errorText, setErrorText] = useState<string | null>(null);

// //   // Fetch messages
// //   const fetchMessages = async (token: string) => {
// //     if (!BROADCAST_ID || !token) {
// //       setError('Missing broadcastId or token');
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const response = await fetch(
// //         API_ENDPOINT,
// //         {
// //           method: 'GET',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           }
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch messages: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       setMessages(data.messages || []);
// //     } catch (error) {
// //       console.error("Error fetching messages:", error);
// //       setError(error instanceof Error ? error.message : 'Unknown error occurred');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Pusher subscription for real-time updates
// //   useEffect(() => {
// //     const channel = pusher.subscribe('broadcasts-channel'); // Update with your channel name

// //     channel.bind('new-message', (data: any) => {
// //       // Assuming the message object is similar to the fetched ones
// //       const newMessage: Message = data.message; 
// //       setMessages((prevMessages) => [newMessage, ...prevMessages]);
// //     });

// //     return () => {
// //       pusher.unsubscribe('broadcasts-channel'); // Unsubscribe on component unmount
// //     };
// //   }, []); // Empty dependency array to only run once

// //   return {
// //     messages,
// //     loading,
// //     error,
// //     fetchMessages,
// //     textMessages,
// //     loadingText,
// //     errorText,
// //   };
// // };
// import { useState, useEffect } from 'react';
// import Pusher from 'pusher-js';

// // API endpoints and constants
// const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
// const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;

// // Pusher Configuration
// const pusher = new Pusher('7cc17b8ffe1acd631dea', {
//   cluster: 'eu',
// });

// export interface Message {
//   id: string;
//   type: 'text' | 'location' | 'process' | 'query';
//   content: string;
//   timestamp?: string;
// }

// export const useFetchMessages = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchMessages = async (token: string) => {
//     if (!BROADCAST_ID || !token) {
//       setError('Missing broadcastId or token');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch messages: ${response.status}`);
//       }

//       const data = await response.json();
//       setMessages(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setError(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const channel = pusher.subscribe(`broadcast-${BROADCAST_ID}`);

//     channel.bind('new-message', (data: any) => {
//       console.log('New message received:', data);
//       const newMessage: Message = data.message;
//       setMessages((prevMessages) => [newMessage, ...prevMessages]);
//     });

//     return () => {
//       pusher.unsubscribe(`broadcast-${BROADCAST_ID}`);
//     };
//   }, []);

//   return {
//     messages,
//     loading,
//     error,
//     fetchMessages,
//   };
// };
// import { useState, useEffect } from 'react';
// import Pusher from 'pusher-js';

// // API endpoints and constants
// const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
// const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;
// console.log("API_ENDPOINT:", API_ENDPOINT);

// // Pusher Configuration
// const pusher = new Pusher('7cc17b8ffe1acd631dea', {
//   cluster: 'eu',
// });

// export interface Message {
//   id: string;
//   type: 'text' | 'location' | 'process' | 'query';
//   content: string;
//   timestamp?: string;
// }
// // token: string
// export const useFetchMessages = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const token = localStorage.getItem("token"); // or another method of storing/retrieving token
//   const fetchMessages = async () => {
//     if (!BROADCAST_ID || !token) {
//       setError('Missing broadcastId or token');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to fetch messages: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Fetched response:", data);
//       setMessages(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setError(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   if (!BROADCAST_ID) return; // Make sure BROADCAST_ID is available before subscribing

//   //   // Dynamically create the channel name based on BROADCAST_ID
//   //   const channel = pusher.subscribe(`broadcast-${BROADCAST_ID}`);

//   //   // Bind to the 'new-message' event
//   //   channel.bind('new-message', (data: any) => {
//   //     console.log('New message received:', data);
//   //     const newMessage: Message = data.message;
//   //     setMessages((prevMessages) => [newMessage, ...prevMessages]);
//   //   });

//   //   return () => {
//   //     // Unsubscribe when the component is unmounted
//   //     pusher.unsubscribe(`broadcast-${BROADCAST_ID}`);
//   //   };
//   // }, [BROADCAST_ID]); // Ensure to rerun the effect if BROADCAST_ID changes
//   useEffect(() => {
//     console.log('useEffect triggered, BROADCAST_ID:', BROADCAST_ID);  // طباعة القيمة في بداية الـ useEffect
  
//     if (!BROADCAST_ID) {
//       console.log('No BROADCAST_ID found');
//       return; // تأكد من أن BROADCAST_ID موجود قبل الاشتراك
//     }
  
//     const channel = pusher.subscribe(`broadcast-${BROADCAST_ID}`);
//     console.log(`Subscribed to broadcast-${BROADCAST_ID}`);
  
//     channel.bind('new-message', (data: any) => {
//       console.log('New message received:', data);  // طباعة البيانات التي تم تلقيها من Pusher
//       const newMessage: Message = data.message;
  
//       // طباعة الرسالة الجديدة قبل إضافتها
//       console.log('New message to add:', newMessage);
  
//       setMessages((prevMessages) => {
//         // طباعة الرسائل السابقة قبل التحديث
//         console.log('Previous messages:', prevMessages);
  
//         // التحقق مما إذا كانت الرسالة جديدة
//         if (prevMessages.some(msg => msg.id === newMessage.id)) {
//           console.log('Message already exists, not adding');
//           return prevMessages; // لا تضف الرسالة إذا كانت موجودة مسبقًا
//         }
  
//         const updatedMessages = [newMessage, ...prevMessages];
//         console.log('Updated messages:', updatedMessages);
//         return updatedMessages;  // إضافة الرسالة الجديدة
//       });
//     });
  
//     // تنظيف القناة عند إلغاء الاشتراك
//     return () => {
//       console.log(`Unsubscribed from broadcast-${BROADCAST_ID}`);
//       pusher.unsubscribe(`broadcast-${BROADCAST_ID}`);
//     };
//   }, [BROADCAST_ID]);  // سيتم التنفيذ فقط عند تغيير BROADCAST_ID
  
//   return {
//     messages,
//     loading,
//     error,
//     fetchMessages,
//   };
// };
// import { useState, useEffect, useCallback } from 'react';

// import Pusher from 'pusher-js';

// const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
// const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;
// console.log("API_ENDPOINT:", API_ENDPOINT);

// const pusher = new Pusher('7cc17b8ffe1acd631dea', {
//   cluster: 'eu',
// });

// export interface Message {
//   id: string;
//   type: 'text' | 'location' | 'process' | 'query';
//   content: string;
//   timestamp?: string;
// }

// export const useFetchMessages = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const token = localStorage.getItem("token");

// //   const fetchMessages = async () => {
// //     if (!BROADCAST_ID || !token) {
// //       setError('Missing broadcastId or token');
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       if (!token) {
// //         console.log('No token found');
// //         setError('No token available');
// //         return;
// //       }      
// //       const response = await fetch(API_ENDPOINT, {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       });
// //       console.log("➡️ Fetching Messages Request:");
// // console.log("URL:", API_ENDPOINT);
// // console.log("Options:",  response );
// //       // اطبع كل حاجة في الـ response
// //     console.log("Raw response:", response);
// //     console.log("Token from localStorage:", token);

// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch messages: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       console.log("Fetched response:", data);

// //       const formattedMessages = (data.messages || []).map((msg: any) => ({
// //         ...msg,
// //         id: msg._id,
// //       }));

// //       setMessages(formattedMessages);
// //     } catch (error) {
// //       console.error("Error fetching messages:", error);
// //       setError(error instanceof Error ? error.message : 'Unknown error occurred');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// const fetchMessages = useCallback(async () => {
//   if (!BROADCAST_ID || !token) {
//     setError('Missing broadcastId or token');
//     return;
//   }

//   setLoading(true);
//   setError(null);

//   try {
//     const response = await fetch(API_ENDPOINT, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();
//     const formattedMessages = (data.messages || []).map((msg: any) => ({
//       ...msg,
//       id: msg._id,
//     }));
//     setMessages(formattedMessages);
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     setError(error instanceof Error ? error.message : 'Unknown error occurred');
//   } finally {
//     setLoading(false);
//   }
// }, [BROADCAST_ID, token]); // تحديد الـ dependencies

// useEffect(() => {
//   fetchMessages();
// }, [fetchMessages]);

//   useEffect(() => {
//     console.log('useEffect triggered, BROADCAST_ID:', BROADCAST_ID);

//     if (!BROADCAST_ID) {
//       console.log('No BROADCAST_ID found');
//       return;
//     }

//     const channel = pusher.subscribe(`broadcast-${BROADCAST_ID}`);
//     console.log(`Subscribed to broadcast-${BROADCAST_ID}`);

//     channel.bind('new-message', (data: any) => {
//       console.log('New message received:', data);

//       const newMessage: Message = {
//         ...data.message,
//         id: data.message._id,
//       };

//       console.log('New message to add:', newMessage);

//       setMessages((prevMessages) => {
//         console.log('Previous messages:', prevMessages);

//         if (prevMessages.some(msg => msg.id === newMessage.id)) {
//           console.log('Message already exists, not adding');
//           return prevMessages;
//         }

//         const updatedMessages = [newMessage, ...prevMessages];
//         console.log('Updated messages:', updatedMessages);
//         return updatedMessages;
//       });
//     });

//     return () => {
//       console.log(`Unsubscribed from broadcast-${BROADCAST_ID}`);
//       pusher.unsubscribe(`broadcast-${BROADCAST_ID}`);
//     };
//   }, [BROADCAST_ID]);

//   return {
//     messages,
//     loading,
//     error,
//     fetchMessages,
//   };
// };
// import { useState, useEffect, useCallback } from 'react';
// import Pusher from 'pusher-js';

// const pusher = new Pusher('7cc17b8ffe1acd631dea', {
//   cluster: 'eu',
// });

// export interface Message {
//   id: string;
//   type: 'text' | 'location' | 'process' | 'query';
//   content: string;
//   timestamp?: string;
// }

// export const useFetchMessages = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const selectedBroadcastId = localStorage.getItem('selectedBroadcastId');
//   const token = localStorage.getItem("token");

//   const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${selectedBroadcastId}/messages`;

//   const fetchMessages = useCallback(async () => {
//     if (!selectedBroadcastId || !token) {
//       setError('Missing broadcastId or token');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch messages: ${response.status}`);
//       }

//       const data = await response.json();
//       const formattedMessages = (data.messages || []).map((msg: any) => ({
//         ...msg,
//         id: msg._id,
//       }));

//       setMessages(formattedMessages);
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedBroadcastId, token]); // سيقوم باعادة الاستدعاء عندما يتغير selectedBroadcastId أو token

//   useEffect(() => {
//     if (selectedBroadcastId) {
//       fetchMessages(); // استدعاء الدالة عند تغيير selectedBroadcastId
//     }
//   }, [selectedBroadcastId, fetchMessages]); // مراقبة التغيير في selectedBroadcastId

//   return {
//     messages,
//     loading,
//     error,
//     fetchMessages,
//   };
// };
//-----------------------------------------------------------------------------
// import { useState, useEffect, useCallback } from 'react';
// import Pusher from 'pusher-js';

// const pusher = new Pusher('7cc17b8ffe1acd631dea', {
//   cluster: 'eu',
// });

// export interface Message {
//   id: string;
//   type: 'text' | 'location' | 'process' | 'query';
//   content: string;
//   timestamp?: string;
// }

// export const useFetchMessages = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const selectedBroadcastId = localStorage.getItem('selectedBroadcastId');
//   const token = localStorage.getItem("token");

//   const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${selectedBroadcastId}/messages`;

//   const fetchMessages = useCallback(async () => {
//     if (!selectedBroadcastId || !token) {
//       setError('Missing broadcastId or token');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch messages: ${response.status}`);
//       }

//       const data = await response.json();
//       const formattedMessages = (data.messages || []).map((msg: any) => ({
//         ...msg,
//         id: msg._id,
//       }));

//       setMessages(formattedMessages);
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedBroadcastId, token]); // سيعيد تحميل البيانات عند التغيير فقط

//   useEffect(() => {
//     if (!selectedBroadcastId) return; // إذا لم يكن هناك معرف، لا تقم بأي شيء

//     fetchMessages(); // استدعاء البيانات فقط عند تغيير المعرف

//   }, [selectedBroadcastId, fetchMessages]); // تفعيل useEffect فقط عندما يتغير selectedBroadcastId

//   return {
//     messages,
//     loading,
//     error,
//     fetchMessages,
//   };
// };
//--------------------------------------------------------------------------------------
// import { useState, useEffect, useCallback } from 'react';
// import getPusherInstance from '../lib/pusher';

// export interface Message {
//   id: string;
//   type: 'text' | 'location' | 'progress' | 'query';
//   content: string;
//   timestamp?: string;
//   createdAt?: string;
// }

// export const useFetchMessages = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   // const [broadcastId, setBroadcastId] = useState(localStorage.getItem('selectedBroadcastId'));


//   const selectedBroadcastId = localStorage.getItem('selectedBroadcastId');
//   const token = localStorage.getItem("token");

//   const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${selectedBroadcastId}/messages`;

//   const fetchMessages = useCallback(async () => {
//     if (!selectedBroadcastId || !token) {
//       setError('Missing broadcastId or token');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log("response",response)
//       if (!response.ok) {
//         throw new Error(`Failed to fetch messages: ${response.status}`);
//       }

//       const data = await response.json();
//       const formattedMessages = (data.messages || []).map((msg: any) => ({
//         ...msg,
//         id: msg._id || msg.id,
//       }));
//       console.log("response",formattedMessages)

//       setMessages(formattedMessages);
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedBroadcastId, token, API_ENDPOINT]);

//   // Set up Pusher subscription
//   useEffect(() => {
//     if (!selectedBroadcastId) return;

//     // Initialize fetching of existing messages
//     fetchMessages();
    
//     // Get the Pusher instance
//     const pusher = getPusherInstance();
    
//     // Set up Pusher channel subscription
//     const channelName = `broadcast-${selectedBroadcastId}`;
//     const channel = pusher.subscribe(channelName);
    
//     // // Listen for new message events
//     // const handleNewMessage = (newMessage: any) => {
//     //   console.log('New message received:', newMessage);
      
//     //   // Format the incoming message to match your expected format
//     //   const formattedMessage = {
//     //     ...newMessage,
//     //     id: newMessage._id || newMessage.id,
//     //   };
      
//     //   // // Update messages state by adding the new message
//     //   // setMessages(prevMessages => {
//     //   //   // Check if message already exists to prevent duplicates
//     //   //   const messageExists = prevMessages.some(msg => msg.id === formattedMessage.id);
//     //   //   if (messageExists) return prevMessages;
        
//     //   //   // Add new message to the beginning of the array
//     //   //   return [formattedMessage, ...prevMessages];
//     //   // });
//     //   // إضافة الرسالة الجديدة
//     //   setMessages(prevMessages => {
//     //     const messageExists = prevMessages.some(msg => msg.id === formattedMessage.id);
//     //     if (messageExists) return prevMessages;

//     //     return [formattedMessage, ...prevMessages];
//     //   });
//     // };
//     const handleNewMessage = (newMessage: any) => {
//       console.log('New message received:', newMessage);
//       const formattedMessage = {
//         ...newMessage,
//         id: newMessage._id || newMessage.id,
//       };
    
//       // إضافة الرسالة الجديدة إلى قائمة الرسائل
//       setMessages(prevMessages => {
//         const messageExists = prevMessages.some(msg => msg.id === formattedMessage.id);
//         if (messageExists) return prevMessages;
//         return [formattedMessage, ...prevMessages];
//       });
//     };
    
    
    
//     channel.bind('new-message', handleNewMessage);
//     channel.bind_global((eventName, data) => {
//         console.log('Received event:', eventName, data);
//       });
      

//     // Cleanup function
//     return () => {
//       channel.unbind('new-message', handleNewMessage);
//       pusher.unsubscribe(channelName);
//     };
//   }, [selectedBroadcastId, fetchMessages]);

//   return {
//     messages,
//     loading,
//     error,
//     fetchMessages,
//   };
// };
//-----------------------------------------------------
import { useState, useEffect, useCallback } from 'react';
import getPusherInstance from '../lib/pusher';

export interface Message {
  id: string;
  type: 'text' | 'location' | 'progress' | 'query';
  content: string;
  timestamp?: string;
  createdAt?: string;
}

// Inside useFetchMessages.ts
export const useFetchMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const selectedBroadcastId = localStorage.getItem('selectedBroadcastId');
  const token = localStorage.getItem('token');
  
  const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${selectedBroadcastId}/messages`;
  
  const fetchMessages = useCallback(async () => {
    if (!selectedBroadcastId || !token) {
      setError('Missing broadcastId or token');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
      
      const data = await response.json();
      const formattedMessages = (data.messages || []).map((msg: any) => ({
        ...msg,
        id: msg._id || msg.id,
      }));
      
      console.log("Fetched messages:", formattedMessages);
      setMessages(formattedMessages);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [selectedBroadcastId, token, API_ENDPOINT]);
  
  useEffect(() => {
    if (!selectedBroadcastId) return;
    
    // Fetch existing messages
    fetchMessages();
    
    try {
      // Set up Pusher
      const pusher = getPusherInstance();
      
      // Subscribe to the channel
      const channelName = `broadcast-${selectedBroadcastId}`;
      console.log(`Subscribing to Pusher channel: ${channelName}`);
      const channel = pusher.subscribe(channelName);
      
      // Inside your Pusher setup in useFetchMessages
channel.bind_global((eventName, data) => {
  console.log(`Received event: ${eventName}`, data);
  // If this is a message event (contains content & other message properties)
  if (data && (data.content !== undefined || data.type === 'text')) {
    console.log('This appears to be a message event, refreshing messages');
    fetchMessages();
  }
});

      // // Log all events received on this channel for debugging
      // channel.bind_global((eventName: string, data: any) => {
      //   console.log(`Received Pusher event: ${eventName}`, data);
      // });
      
      // Try different event names that might be used by the backend
      const eventNames = ['new-message', 'message', 'message-created'];
      
      eventNames.forEach(eventName => {
        channel.bind(eventName, (newMessage: any) => {
          console.log(`Received message via Pusher (${eventName}):`, newMessage);
          
          // Refresh messages to update the UI
          fetchMessages();
        });
      });
      
      // Cleanup on unmount
      return () => {
        eventNames.forEach(eventName => {
          channel.unbind(eventName);
        });
        channel.unbind_global();
        pusher.unsubscribe(channelName);
        console.log(`Unsubscribed from Pusher channel: ${channelName}`);
      };
    } catch (error) {
      console.error("Error setting up Pusher:", error);
    }
  }, [selectedBroadcastId, fetchMessages]);
  
  return {
    messages,
    loading,
    error,
    fetchMessages,
  };
};

