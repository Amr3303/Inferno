import Pusher from "pusher-js";
import { useEffect, useRef } from "react";

interface PusherHookProps {
  broadcastId: string;
  onMessage: (message: any) => void;
}

export const usePusher = ({ broadcastId, onMessage }: PusherHookProps) => {
  const pusherRef = useRef<Pusher | null>(null);

  useEffect(() => {
    // Initialize Pusher
    pusherRef.current = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "eu",
    });

    // Subscribe to the specific broadcast channel
    const channelName = `broadcast-${broadcastId}`;
    const channel = pusherRef.current.subscribe(channelName);

    // Listen for new messages
    channel.bind("new-message", (data: any) => {
      // Ensure we're passing the message data correctly
      onMessage(data);
    });

    return () => {
      if (pusherRef.current) {
        channel.unbind("new-message");
        pusherRef.current.unsubscribe(channelName);
      }
    };
  }, [broadcastId, onMessage]);
};
