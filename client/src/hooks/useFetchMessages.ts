// import { useState } from 'react';

// export const useFetchMessages = () => {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchMessages = async (broadcastId: string, token: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch messages');
//       }

//       const data = await response.json();
//       setMessages(data.messages || []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { messages, loading, fetchMessages };
// };
// import { useState } from 'react';

// export const useFetchMessages = () => {
//   const [messagesType, setMessagesType] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loadingType, setLoadingType] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // دالة لطلب الرسائل من نوع معين
//   const fetchMessagesType = async (broadcastId: string, token: string, type: string) => {
//     setLoadingType(true);
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=${type}`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch messages');
//       }

//       const data = await response.json();
//       setMessagesType(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching messages: ", error);
//     } finally {
//       setLoadingType(false);
//     }
//   };

//   // دالة لطلب الرسائل العامة
//   const fetchMessages = async (broadcastId: string, token: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch messages');
//       }

//       const data = await response.json();
//       setMessages(data.messages || []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { 
//     messages, 
//     loading, 
//     fetchMessages, 
//     messagesType, 
//     loadingType, 
//     fetchMessagesType 
//   };
// };
// import { useState, useEffect } from 'react';

// export const useFetchMessages = () => {
//   const [messagesType, setMessagesType] = useState<any[]>([]);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loadingType, setLoadingType] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [broadcastId, setBroadcastId] = useState<string>('');

//   // دالة لطلب الرسائل من نوع معين
//   const fetchMessagesType = async (broadcastId: string, token: string, type: string) => {
//     setLoadingType(true);
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=${type}`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch messages');
//       }

//       const data = await response.json();
//       setMessagesType(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching messages: ", error);
//     } finally {
//       setLoadingType(false);
//     }
//   };

//   // دالة لطلب الرسائل العامة
//   const fetchMessages = async (broadcastId: string, token: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch messages');
//       }

//       const data = await response.json();
//       setMessages(data.messages || []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // استخدام useEffect لتحميل البيانات عند تغيير broadcastId
//   useEffect(() => {
//     if (broadcastId) {
//       // استدعاء الدوال الخاصة بجلب الرسائل بناءً على الـ broadcastId
//       fetchMessages(broadcastId, 'your_token_here'); // استبدل 'your_token_here' بالتوكن الفعلي
//       fetchMessagesType(broadcastId, 'your_token_here', 'location'); // لجلب الرسائل من نوع Location
//       fetchMessagesType(broadcastId, 'your_token_here', 'process'); // لجلب الرسائل من نوع Process
//       fetchMessagesType(broadcastId, 'your_token_here', 'query'); // لجلب الرسائل من نوع Query
//     }
//   }, [broadcastId]); // سيتم تنفيذ هذا عند تغيير broadcastId

//   return { 
//     messages, 
//     loading, 
//     fetchMessages, 
//     messagesType, 
//     loadingType, 
//     fetchMessagesType, 
//     setBroadcastId // يمكن استخدامه لتغيير broadcastId من المكون الأب
//   };
// };

//---------------------------------------------
// import { useState, useEffect } from 'react';

// // Define the Message interface
// export interface Message {
//   id: string;
//   type: 'text' | 'location' | 'process' | 'query';
//   content: string;
//   timestamp?: string;
//   // Add other properties as needed
// }

// export const useFetchMessages = () => {
//   // States for different message types
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [locationMessages, setLocationMessages] = useState<Message[]>([]);
//   const [processMessages, setProcessMessages] = useState<Message[]>([]);
//   const [queryMessages, setQueryMessages] = useState<Message[]>([]);
  
//   // Loading states
//   const [loading, setLoading] = useState(false);
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [loadingProcess, setLoadingProcess] = useState(false);
//   const [loadingQuery, setLoadingQuery] = useState(false);
  
//   // Error states
//   const [error, setError] = useState<string | null>(null);
//   const [errorLocation, setErrorLocation] = useState<string | null>(null);
//   const [errorProcess, setErrorProcess] = useState<string | null>(null);
//   const [errorQuery, setErrorQuery] = useState<string | null>(null);

//   // Fetch all messages
//   const fetchMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setError('Missing broadcastId or token');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

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

//   // Fetch location messages
//   const fetchLocationMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setErrorLocation('Missing broadcastId or token');
//       return;
//     }

//     setLoadingLocation(true);
//     setErrorLocation(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=location`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch location messages: ${response.status}`);
//       }

//       const data = await response.json();
//       setLocationMessages(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching location messages:", error);
//       setErrorLocation(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoadingLocation(false);
//     }
//   };

//   // Fetch process messages
//   const fetchProcessMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setErrorProcess('Missing broadcastId or token');
//       return;
//     }

//     setLoadingProcess(true);
//     setErrorProcess(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=process`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch process messages: ${response.status}`);
//       }

//       const data = await response.json();
//       setProcessMessages(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching process messages:", error);
//       setErrorProcess(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoadingProcess(false);
//     }
//   };

//   // Fetch query messages
//   const fetchQueryMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setErrorQuery('Missing broadcastId or token');
//       return;
//     }

//     setLoadingQuery(true);
//     setErrorQuery(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=query`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch query messages: ${response.status}`);
//       }

//       const data = await response.json();
//       setQueryMessages(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching query messages:", error);
//       setErrorQuery(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoadingQuery(false);
//     }
//   };

//   return {
//     // All messages
//     messages,
//     loading,
//     error,
//     fetchMessages,
    
//     // Location messages
//     locationMessages,
//     loadingLocation,
//     errorLocation,
//     fetchLocationMessages,
    
//     // Process messages
//     processMessages,
//     loadingProcess,
//     errorProcess,
//     fetchProcessMessages,
    
//     // Query messages
//     queryMessages,
//     loadingQuery,
//     errorQuery,
//     fetchQueryMessages
//   };
// };
// import { useState, useEffect } from 'react';

// // Define the Message interface
// export interface Message {
//   id: string;
//   type: 'text' | 'location' | 'process' | 'query';
//   content: string;
//   timestamp?: string;
//   // Add other properties as needed
// }

// // Define the Text interface for handling text-specific messages
// export interface Text {
//   id: string;
//   content: string;
//   timestamp?: string;
// }

// export const useFetchMessages = () => {
//   // States for different message types
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [locationMessages, setLocationMessages] = useState<Message[]>([]);
//   const [processMessages, setProcessMessages] = useState<Message[]>([]);
//   const [queryMessages, setQueryMessages] = useState<Message[]>([]);
//   const [textMessages, setTextMessages] = useState<Text[]>([]); // New state for text messages
  
//   // Loading states
//   const [loading, setLoading] = useState(false);
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [loadingProcess, setLoadingProcess] = useState(false);
//   const [loadingQuery, setLoadingQuery] = useState(false);
//   const [loadingText, setLoadingText] = useState(false); // New loading state for text messages
  
//   // Error states
//   const [error, setError] = useState<string | null>(null);
//   const [errorLocation, setErrorLocation] = useState<string | null>(null);
//   const [errorProcess, setErrorProcess] = useState<string | null>(null);
//   const [errorQuery, setErrorQuery] = useState<string | null>(null);
//   const [errorText, setErrorText] = useState<string | null>(null); // New error state for text messages

//   // Fetch all messages
//   const fetchMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setError('Missing broadcastId or token');
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

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

//   // Fetch text messages
//   const fetchTextMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setErrorText('Missing broadcastId or token');
//       return;
//     }

//     setLoadingText(true);
//     setErrorText(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=text`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch text messages: ${response.status}`);
//       }

//       const data = await response.json();
//       setTextMessages(data.messages || []); // Update text messages
//     } catch (error) {
//       console.error("Error fetching text messages:", error);
//       setErrorText(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoadingText(false);
//     }
//   };

//   // Fetch location messages
//   const fetchLocationMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setErrorLocation('Missing broadcastId or token');
//       return;
//     }

//     setLoadingLocation(true);
//     setErrorLocation(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=location`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch location messages: ${response.status}`);
//       }

//       const data = await response.json();
//       setLocationMessages(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching location messages:", error);
//       setErrorLocation(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoadingLocation(false);
//     }
//   };

//   // Fetch process messages
//   const fetchProcessMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setErrorProcess('Missing broadcastId or token');
//       return;
//     }

//     setLoadingProcess(true);
//     setErrorProcess(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=process`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch process messages: ${response.status}`);
//       }

//       const data = await response.json();
//       setProcessMessages(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching process messages:", error);
//       setErrorProcess(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoadingProcess(false);
//     }
//   };

//   // Fetch query messages
//   const fetchQueryMessages = async (broadcastId: string, token: string) => {
//     if (!broadcastId || !token) {
//       setErrorQuery('Missing broadcastId or token');
//       return;
//     }

//     setLoadingQuery(true);
//     setErrorQuery(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=query`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch query messages: ${response.status}`);
//       }

//       const data = await response.json();
//       setQueryMessages(data.messages || []);
//     } catch (error) {
//       console.error("Error fetching query messages:", error);
//       setErrorQuery(error instanceof Error ? error.message : 'Unknown error occurred');
//     } finally {
//       setLoadingQuery(false);
//     }
//   };

//   return {
//     // All messages
//     messages,
//     loading,
//     error,
//     fetchMessages,
    
//     // Text messages
//     textMessages,
//     loadingText,
//     errorText,
//     fetchTextMessages,
    
//     // Location messages
//     locationMessages,
//     loadingLocation,
//     errorLocation,
//     fetchLocationMessages,
    
//     // Process messages
//     processMessages,
//     loadingProcess,
//     errorProcess,
//     fetchProcessMessages,
    
//     // Query messages
//     queryMessages,
//     loadingQuery,
//     errorQuery,
//     fetchQueryMessages
//   };
// };
import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

// Pusher Configuration
const pusher = new Pusher('7cc17b8ffe1acd631dea', {
  cluster: 'eu',
  authEndpoint: 'https://your-auth-endpoint.com/pusher/auth', // Set up the authentication endpoint
});
// Define the Message interface
export interface Message {
  id: string;
  type: 'text' | 'location' | 'process' | 'query';
  content: string;
  timestamp?: string;
  // Add other properties as needed
}

// Define the Text interface for handling text-specific messages
export interface Text {
  id: string;
  content: string;
  timestamp?: string;
}

export const useFetchMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [textMessages, setTextMessages] = useState<Text[]>([]);
  const [loadingText, setLoadingText] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Fetch messages
  const fetchMessages = async (broadcastId: string, token: string) => {
    if (!broadcastId || !token) {
      setError('Missing broadcastId or token');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Pusher subscription for real-time updates
  useEffect(() => {
    const channel = pusher.subscribe('broadcasts-channel'); // Update with your channel name

    channel.bind('new-message', (data: any) => {
      // Assuming the message object is similar to the fetched ones
      const newMessage: Message = data.message; 
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    return () => {
      pusher.unsubscribe('broadcasts-channel'); // Unsubscribe on component unmount
    };
  }, []); // Empty dependency array to only run once

  // Fetch text messages
  const fetchTextMessages = async (broadcastId: string, token: string) => {
    if (!broadcastId || !token) {
      setErrorText('Missing broadcastId or token');
      return;
    }

    setLoadingText(true);
    setErrorText(null);

    try {
      const response = await fetch(
        `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=text`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch text messages: ${response.status}`);
      }

      const data = await response.json();
      setTextMessages(data.messages || []); // Update text messages
    } catch (error) {
      console.error("Error fetching text messages:", error);
      setErrorText(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoadingText(false);
    }
  };

  return {
    messages,
    loading,
    error,
    fetchMessages,
    textMessages,
    loadingText,
    errorText,
    fetchTextMessages
  };
};
