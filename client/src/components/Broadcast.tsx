import { usePusher } from "../hooks/usePusher";
import { useState, useEffect } from "react";
interface Message {
  _id?: string;
  content: string;
}

interface BroadcastProps {
  broadcastId: string;
}

const Broadcast: React.FC<BroadcastProps> = ({ broadcastId }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleMessage = (message: Message) => {
    setMessages((prev) => [message, ...prev]); // Add new message at the beginning
    console.log("Received real-time message:", message);
  };

  // Initial messages fetch
  useEffect(() => {
    const fetchInitialMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Change this to use the proxy
        const response = await fetch(
          `/api/v1/broadcasts/${broadcastId}/messages`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchInitialMessages();
  }, [broadcastId]);

  // Setup real-time updates
  usePusher({
    broadcastId,
    onMessage: handleMessage,
  });

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={msg._id || index}>
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default Broadcast;
