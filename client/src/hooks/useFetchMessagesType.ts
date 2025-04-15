// import { useState } from 'react';

// export const useFetchMessagesType = () => {
//   const [messagesType, setMessages] = useState<any[]>([]);
//   const [loadingType, setLoading] = useState(false);
//   const selectedBroadcastId = localStorage.getItem('selectedBroadcastId');
//   const token = localStorage.getItem("token");

//   const fetchMessagesType = async (type: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${selectedBroadcastId}/messages?type=${type}`, 
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
//       setMessages(data.messages || []); // تأكد من أن البيانات تحتوي على الرسائل
//     } catch (error) {
//       console.error("Error fetching messages: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { messagesType, loadingType, fetchMessagesType };
// };
// import { useState, useCallback } from 'react';

// export const useFetchMessagesType = () => {
//   const [messagesType, setMessages] = useState<any[]>([]);
//   const [loadingType, setLoading] = useState(false);

//   const selectedBroadcastId = localStorage.getItem('selectedBroadcastId');
//   const token = localStorage.getItem('token');

//   const fetchMessagesType = useCallback(async (type: string) => {
//     if (!selectedBroadcastId || !token) {
//       console.error('Missing broadcastId or token');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${selectedBroadcastId}/messages?type=${type}`,
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log("fetching messages: ", response);

//       if (!response.ok) {
//         throw new Error('Failed to fetch messages');
//       }

//       const data = await response.json();
//       setMessages(data.messages || []); // تأكد من أن البيانات تحتوي على الرسائل
//     } catch (error) {
//       console.error('Error fetching messages: ', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedBroadcastId, token]); // إعادة إنشاء الدالة فقط عندما يتغير selectedBroadcastId أو token

//   return { messagesType, loadingType, fetchMessagesType };
// };
import { useState, useEffect, useCallback } from 'react';
import Pusher from 'pusher-js';

// Use the same Pusher instance across the application
// This should ideally be imported from a shared location
const pusherClient = new Pusher('7cc17b8ffe1acd631dea', {
  cluster: 'eu',
});

export interface Message {
  id: string;
  type: 'text' | 'location' | 'progress' | 'query';
  content: string;
  timestamp?: string;
  createdAt?: string;
}

export const useFetchMessagesType = () => {
  const [messagesType, setMessagesType] = useState<Message[]>([]);
  const [loadingType, setLoadingType] = useState(false);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [currentType, setCurrentType] = useState<string>('text');

  const selectedBroadcastId = localStorage.getItem('selectedBroadcastId');
  const token = localStorage.getItem("token");
  console.log("Token:", token); // 👈
if (!token) {
  console.error("No token found");
  throw new Error("No token found");
}

  const fetchMessagesType = useCallback(async (type: string) => {
    console.log("Fetching for type:", type); // 👈
    if (!selectedBroadcastId || !token) {
      setErrorType('Missing broadcastId or token');
      return;
    }

    setCurrentType(type);
    setLoadingType(true);
    setErrorType(null);

    try {
      const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${selectedBroadcastId}/messages?${type}`;
      console.log("Broadcast ID type:", selectedBroadcastId);
      
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} messages: ${response.status}`);
      }
      console.log("re", response);

      const data = await response.json();
      console.log("data:", data);
      const formattedMessages = (data.messages || []).map((msg: any) => ({
        ...msg,
        id: msg._id || msg.id,
      }));
      console.log("formattedMessages:", JSON.stringify(formattedMessages, null, 2));
      console.log("response type",formattedMessages)


      setMessagesType(formattedMessages);
    } catch (error) {
      setErrorType(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoadingType(false);
    }
  }, [selectedBroadcastId, token]);

  // Set up Pusher subscription for specific message type
  useEffect(() => {
    if (!selectedBroadcastId || !currentType) return;
    
    // Set up Pusher channel subscription
    const channelName = `broadcast-${selectedBroadcastId}`;
    const channel = pusherClient.subscribe(channelName);
    
    // Listen for new message events
    const handleNewMessage = (newMessage: any) => {
      // Only update if message type matches current view type
      if (newMessage.type === currentType) {
        // Format the incoming message
        const formattedMessage = {
          ...newMessage,
          id: newMessage._id || newMessage.id,
        };
        
        // Update messages state by adding the new message
        setMessagesType(prevMessages => {
          // Check if message already exists to prevent duplicates
          const messageExists = prevMessages.some(msg => msg.id === formattedMessage.id);
          if (messageExists) return prevMessages;
          
          // Add new message to the beginning of the array
          return [formattedMessage, ...prevMessages];
        });
      }
    };
    
    channel.bind('new-message', handleNewMessage);

    // Cleanup function
    return () => {
      channel.unbind('new-message', handleNewMessage);
      // We don't unsubscribe here as other components might be using the same channel
    };
  }, [selectedBroadcastId, currentType]);

  return {
    messagesType,
    loadingType,
    errorType,
    fetchMessagesType,
  };
};