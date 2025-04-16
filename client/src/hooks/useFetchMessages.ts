import { useEffect, useState } from "react";
import getPusherInstance from "../lib/pusher";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface Message {
  id: string;
  type: "text" | "location" | "progress" | "query";
  content: string;
  timestamp?: string;
  createdAt?: string;
}

export const useFetchMessages = () => {
  const selectedBroadcastId = localStorage.getItem("selectedBroadcastId");

  console.log(selectedBroadcastId);

  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  console.log(selectedBroadcastId);

  // Only create the API endpoint if selectedBroadcastId exists
  const API_ENDPOINT = selectedBroadcastId 
    ? `/api/v1/broadcasts/${selectedBroadcastId}/messages`
    : null;

  const fetchMessages = async () => {
    // checking for boradcastID or TOKEN
    if (!selectedBroadcastId || !token) {
      throw new Error("Missing broadcast_ID or TOKEN");
    }

    // Only proceed if we have a valid API endpoint
    if (!API_ENDPOINT) {
      throw new Error("Invalid API endpoint - missing broadcast ID");
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
    const formattedMessages = (data.messages || []).map((msg) => ({
      ...msg,
      id: msg._id || msg.id,
    }));

    console.log("Fetched messages:", formattedMessages);
    return formattedMessages;
  };

  const minute = 1;
  const staleTime = minute * 60 * 1000; // equals to five mins

  const {
    data: messages,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["messages", selectedBroadcastId],
    queryFn: fetchMessages,
    enabled: !!selectedBroadcastId && !!token && !!API_ENDPOINT,
    staleTime: staleTime,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!selectedBroadcastId) return;

    try {
      const pusher = getPusherInstance();
      const channelName = `new-message`;
      console.log(channelName);
      const channel = pusher.subscribe(channelName);

      // Listen for new messages

      channel.bind("message-event", (newMessage) => {
        console.log("Received new message:", newMessage);
        queryClient.invalidateQueries({
          queryKey: ["messages", selectedBroadcastId],
        });
      });

      // Listen for connection status
      pusher.connection.bind("connected", () => {
        console.log("Connected to Pusher");
      });
    } catch (error) {
      console.error("Error setting up Pusher:", error);
    }
  }, [queryClient, selectedBroadcastId]);

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
