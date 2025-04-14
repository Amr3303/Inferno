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

    // Subscribe to the broadcast channel
    const channel = pusherRef.current.subscribe(`broadcast-${broadcastId}`);

    // Listen for new messages
    channel.bind("new-message", onMessage);

    return () => {
      if (pusherRef.current) {
        channel.unbind("new-message");
        pusherRef.current.unsubscribe(`broadcast-${broadcastId}`);
      }
    };
  }, [broadcastId, onMessage]);
};
