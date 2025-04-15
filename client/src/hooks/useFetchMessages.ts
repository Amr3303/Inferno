import { useState } from 'react';

export const useFetchMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async (broadcastId: string, token: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, fetchMessages };
};
