import { useWebSocket } from "../hooks/useWebSocket";
import { useState, useEffect } from "react";

interface BroadcastProps {
  userId: string;
  broadcastId: string;
}

const Broadcast: React.FC<BroadcastProps> = ({ userId, broadcastId }) => {
  const [messages, setMessages] = useState<any[]>([]);

  const handleMessage = (message) => {
    setMessages((prev) => [...prev, message]);
    console.log("Received message:", message);
  };

  useWebSocket({
    userId,
    broadcastId,
    onMessage: handleMessage,
  });

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          {/* Display your messages based on type */}
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default Broadcast;
