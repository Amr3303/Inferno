import { usePusher } from "../hooks/usePusher";
import { useState } from "react";

interface BroadcastProps {
  broadcastId: string;
}

const Broadcast: React.FC<BroadcastProps> = ({ broadcastId }) => {
  const [messages, setMessages] = useState<any[]>([]);

  const handleMessage = (message: any) => {
    setMessages((prev) => [...prev, message]);
    console.log("Received message:", message);
  };

  usePusher({
    broadcastId,
    onMessage: handleMessage,
  });

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default Broadcast;
