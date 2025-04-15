import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { formatDistanceToNow } from "date-fns";

interface MessageProps {
  broadcastId: string;
}

interface Message {
  _id: string;
  type: "text" | "query" | "location" | "progress";
  content: any;
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  progress?: number;
}

const BroadcastMessages = ({ broadcastId }: MessageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/broadcasts/${broadcastId}/messages`
        );
        setMessages(response.data.data.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (broadcastId) {
      fetchMessages();
    }
  }, [broadcastId]);

  // Set up Pusher subscription
  useEffect(() => {
    // Initialize Pusher with your app key
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });

    if (!broadcastId) return;

    // Subscribe to the broadcast channel
    const channel = pusher.subscribe(`broadcast-${broadcastId}`);

    // Listen for new messages
    channel.bind("new-message", (newMessage: Message) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    // Clean up on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [broadcastId]);

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case "text":
        return <p className="text-sm">{message.content}</p>;

      case "query":
        return (
          <div className="space-y-2">
            <p className="font-medium text-sm">{message.content.query}</p>
            <p className="text-muted-foreground text-xs">
              {message.content.details}
            </p>
          </div>
        );

      case "location":
        return (
          <div className="space-y-2">
            <p className="text-sm">{message.content}</p>
            <div className="text-xs text-muted-foreground">
              Coordinates: {message.coordinates?.lat.toFixed(6)},{" "}
              {message.coordinates?.lng.toFixed(6)}
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-2">
            <p className="text-sm">{message.content}</p>
            <div className="w-full bg-secondary h-2 rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${message.progress}%` }}
              />
            </div>
            <div className="text-xs text-right">{message.progress}%</div>
          </div>
        );

      default:
        return <p className="text-sm">{JSON.stringify(message.content)}</p>;
    }
  };

  if (loading) {
    return <div className="flex justify-center p-6">Loading messages...</div>;
  }

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-4 p-4">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No messages in this broadcast yet
          </p>
        ) : (
          messages.map((message) => (
            <Card key={message._id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">
                      {message.createdBy?.name || "Unknown"}
                    </span>
                    <Badge
                      variant={
                        message.type === "text"
                          ? "default"
                          : message.type === "query"
                          ? "destructive"
                          : message.type === "location"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {message.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                {renderMessageContent(message)}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default BroadcastMessages;
