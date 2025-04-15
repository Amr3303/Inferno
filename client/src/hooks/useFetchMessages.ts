import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

// Pusher Configuration
const pusher = new Pusher('7cc17b8ffe1acd631dea', {
  cluster: 'eu'
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
