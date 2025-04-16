import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import getPusherInstance from "../lib/pusher";

export interface Message {
  id: string;
  type: "text" | "location" | "progress" | "query";
  content: string;
  timestamp?: string;
  createdAt?: string;
}

export const useFetchMessages = () => {
  const selectedBroadcastId = localStorage.getItem("selectedBroadcastId");
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${selectedBroadcastId}/messages`;

  const fetchMessages = async () => {
    // checking for boradcastID or TOKEN
    if (!selectedBroadcastId || !token) {
      throw new Error("Missing broadcast_ID or TOKEN");
    }

    const response = await fetch(API_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }

    const data = await response.json();
    const formattedMessages = (data.messages || []).map((msg: any) => ({
      ...msg,
      id: msg._id || msg.id,
    }));

    console.log("Fetched messages:", formattedMessages);
    return formattedMessages;
  };

  // Using react query for fetching data and handling refetching

  //   time to validate cache (nothing changed yet but refetch to make sure...)

  const minute = 5;

  const staleTime = minute * 60 * 1000; // equals to five mins

  const {
    data: messages,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["messages", selectedBroadcastId],
    queryFn: fetchMessages,
    enabled: !!selectedBroadcastId && !!token,
    staleTime,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!selectedBroadcastId) return;

    try {
      // Set up Pusher
      const pusher = getPusherInstance();

      // Subscribe to the channel
      const channelName = `broadcast-${selectedBroadcastId}`;
      console.log(`Subscribing to Pusher channel: ${channelName}`);
      const channel = pusher.subscribe(channelName);

      // Listen for all events and invalidate queries when needed
      channel.bind_global((eventName, data) => {
        console.log(`Received event: ${eventName}`, data);

        // If this is a message event
        // please make better error handling here for the msg types // TODO
        if (data && (data.content !== undefined || data.type === "text")) {
          queryClient.invalidateQueries({ queryKey: ["messages", selectedBroadcastId] });
        }
      });

      // Try different event names that might be used by the backend
      //   if you know the exact names will be way better for performance.
      const eventNames = ["new-message", "message", "message-created"];

      eventNames.forEach((eventName) => {
        channel.bind(eventName, (newMessage: any) => {
          console.log(
            `Received message via Pusher (${eventName}):`,
            newMessage
          );
          // tell react query to invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ["messages", selectedBroadcastId] });
        });
      });

      //   Cleaning up
      return () => {
        eventNames.forEach((eventName) => {
          channel.unbind(eventName);
        });
        channel.unbind_global();
        pusher.unsubscribe(channelName);
        console.log(`Unsubscribed from Pusher channel: ${channelName}`);
      };
    } catch (error) {
      console.error("Error setting up Pusher:", error);
    }
  }, [selectedBroadcastId, queryClient]);

  return {
    messages: messages || [],
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Unknown error"
      : null,
    fetchMessages: refetch,
  };
};

//  how to use it?
// 1) make a context for all the components that needs the fetched data.
// 2) handling loadings
// 3) handle errors and make a fallback // TODO
// 4) show msgs.

// export function MessagesList() {
//   const { messages, loading, error, fetchMessages } = useFetchMessages();

//   //    loading fallback // change
//   if (loading) return <div>Loading messages...</div>;

//   //   handling error // consider a better fallback like showing a button to return to home or rerender the component..
//   // ex => <button onClick={() => fetchMessages()}>Refresh Messages</button>
//   if (error) return <div>Error: {error}</div>;

//   // to show the messages >>
//   messages.map((message: Message) => (
//     <div key={message.id} className="message">
//       <div className="message-content">{message.content}</div>
//       <div className="message-meta">
//         {message.timestamp || message.createdAt}
//       </div>
//     </div>
//   ));
// }