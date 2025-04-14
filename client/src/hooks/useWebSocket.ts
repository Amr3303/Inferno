import { useEffect, useRef } from 'react';

interface WebSocketHookProps {
  userId: string;
  broadcastId: string;
  onMessage: (message: any) => void;
}

export const useWebSocket = ({ userId, broadcastId, onMessage }: WebSocketHookProps) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const WS_URL = import.meta.env.PROD 
      ? 'wss://inferno-neon.vercel.app'
      : 'ws://localhost:5000';

    wsRef.current = new WebSocket(`${WS_URL}/ws?userId=${userId}&broadcastId=${broadcastId}`);

    wsRef.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [userId, broadcastId, onMessage]);

  return wsRef.current;
};