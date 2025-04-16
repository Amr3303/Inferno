import { FC, useState, useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { useToast } from "../../hooks/use-toast";
import { MapPin } from "lucide-react";
import { MessageCard } from "../../components/MessageCard";
import { LocationCard } from "../../components/LocationCard";
import { ProgressBar } from "../../components/ProgressBar";
import { SendOptionsDropdown } from "../../components/CustomDropdownMenu";
import { AddAgentModal } from "../../components/modals/AddAgentModal";
import { ViewAgentsModal } from "../../components/modals/ViewAgentsModal";
import { AddQueryModal } from "../../components/modals/AddQueryModal";
import { SendProcessModal } from "../../components/modals/SendProcessModal";
import { SendLocationModal } from "../../components/modals/SendLocationModal";
import { useMessageApi } from "../../hooks/use-message-api";
import { useFetchMessages } from "../../hooks/useFetchMessages";
import { useFetchMessagesType } from "../../hooks/useFetchMessagesType";

// Mock agents data
const mockAgents = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed.mohamed@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "سارة علي",
    email: "sara.ali@example.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "عمر حسن",
    email: "omar.hassan@example.com",
    status: "Active",
  },
];

// Message type interface
interface Message {
  id: string;
  type: string;
  content: string;
  createdAt: string;
}

export const MessagesPage: FC = () => {
  const selectedBroadcastId = localStorage.getItem("selectedBroadcastId");

  // Basic state variables
  const [messageText, setMessageText] = useState("");
  const [currentView, setCurrentView] = useState("View Message");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Message states from hooks
  const { messages, loading, error, fetchMessages } = useFetchMessages();
  const { messagesType, loadingType, fetchMessagesType } =
    useFetchMessagesType();

  // Modal states
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
  const [showAddQueryModal, setShowAddQueryModal] = useState(false);
  const [showSendProcessModal, setShowSendProcessModal] = useState(false);
  const [showSendLocationModal, setShowSendLocationModal] = useState(false);

  // Form states
  const [newAgentEmail, setNewAgentEmail] = useState("");
  const [processName, setProcessName] = useState("");
  const [processProgress, setProcessProgress] = useState(0);

  // Custom hooks
  const { sendTextMessage } = useMessageApi();

  // Fetch all messages for all types when broadcast changes
  useEffect(() => {
    if (!selectedBroadcastId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch all message types
    fetchMessages();
    fetchMessagesType("text");

    console.log(
      `Fetching all message types for broadcast ID: ${selectedBroadcastId}`
    );
  }, [selectedBroadcastId, fetchMessages, fetchMessagesType]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log("action", currentView);
    switch (currentView) {
      case "View Message":
        fetchMessages();
        break;
      case "View Text":
        fetchMessagesType("text");
        break;
      case "View Location":
        fetchMessagesType("location");
        break;
      case "View Process":
        fetchMessagesType("progress");
        break;
      case "View Query":
        fetchMessagesType("query");
        break;
      default:
        console.warn("Unknown view type");
    }
  }, [currentView, fetchMessagesType, fetchMessages]);

  // Refresh all messages
  const refreshAllMessages = () => {
    const token = localStorage.getItem("token");
    if (!selectedBroadcastId || !token) return;

    fetchMessages();
    fetchMessagesType("text");
    fetchMessagesType("location");
    fetchMessagesType("progress");
    fetchMessagesType("query");

    toast({
      title: "Refreshed",
      description: "All messages have been refreshed",
    });
  };

  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Please login first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Sending message:", messageText);

    const success = await sendTextMessage(messageText, token);
    if (success) {
      console.log("Message sent successfully");

      // Clear input
      setMessageText("");

      // Refresh messages immediately to update the UI
      fetchMessages();
      if (currentView !== "View Message") {
        fetchMessagesType(currentView.replace("View ", "").toLowerCase());
      }

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
    } else {
      console.error("Failed to send message");
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };
  //----------------------------------------------
  // Handle adding agent
  const handleAddAgent = () => {
    if (!newAgentEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Agent invitation sent to ${newAgentEmail}`,
    });

    setNewAgentEmail("");
    setShowAddAgentModal(false);
  };

  // Handle menu item clicks
  const handleMenuItemClick = (action: string) => {
    switch (action) {
      case "Add Agent":
        setShowAddAgentModal(true);
        break;
      case "View Agents":
        setShowViewAgentsModal(true);
        break;
      case "View Message":
        setCurrentView(action);
        break;
      case "View Text":
        setCurrentView(action);
        break;
      case "View Location":
        setCurrentView(action);
        break;
      case "View Process":
        setCurrentView(action);
        break;
      case "View Query":
        setCurrentView(action);
        break;
      case "Send Process":
        setShowSendProcessModal(true);
        break;
      case "Send Query":
        setShowAddQueryModal(true);
        break;
      case "Send Location":
        setShowSendLocationModal(true);
        break;
      case "Refresh Messages":
        refreshAllMessages();
        break;
      default:
        toast({
          description: `${action} action selected`,
        });
    }
  };

  // Render content based on current view
  const renderContent = () => {
    switch (currentView) {
      case "View Message":
        return (
          <div className="mb-8">
            {error && (
              <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error: {error}
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">Loading messages...</span>
              </div>
            ) : messages.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {messages.map((msg, index) => {
                  switch (msg.type) {
                    case "text":
                      return (
                        <MessageCard key={index} onOptionsClick={() => {}}>
                          <p className="text-sm leading-relaxed">
                            {msg.content}
                          </p>
                        </MessageCard>
                      );
                    case "location":
                      return (
                        <LocationCard
                          key={index}
                          coordinates={msg.content}
                          onOptionsClick={() => {}}
                        />
                      );
                    case "progress":
                      return (
                        <ProgressBar
                          key={index}
                          progress={parseInt(msg.content)}
                          onOptionsClick={() => {}}
                        />
                      );
                    case "query":
                      return (
                        <MessageCard key={index} onOptionsClick={() => {}}>
                          <h3 className="font-bold mb-2">Query</h3>
                          <p className="text-sm leading-relaxed">
                            {typeof msg.content === "string"
                              ? msg.content
                              : JSON.stringify(msg.content)}
                          </p>
                        </MessageCard>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No messages found.
              </p>
            )}
          </div>
        );
      case "View Text":
      case "View Location":
      case "View Process":
      case "View Query":
        return (
          <div className="mb-8">
            {error && (
              <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error: {error}
              </div>
            )}
            {loadingType ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">
                  Loading {currentView.replace("View ", "").toLowerCase()}{" "}
                  messages...
                </span>
              </div>
            ) : messagesType.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {messagesType.map((msg, index) => {
                  switch (currentView) {
                    case "View Text":
                      return (
                        <MessageCard key={index} onOptionsClick={() => {}}>
                          <p className="text-sm leading-relaxed">
                            {msg.content}
                          </p>
                        </MessageCard>
                      );
                    case "View Location":
                      return (
                        <LocationCard
                          key={index}
                          coordinates={msg.content}
                          onOptionsClick={() => {}}
                        />
                      );
                    case "View Process":
                      return (
                        <ProgressBar
                          key={index}
                          progress={parseInt(msg.content)}
                          onOptionsClick={() => {}}
                        />
                      );
                    case "View Query":
                      return (
                        <MessageCard key={index} onOptionsClick={() => {}}>
                          <h3 className="font-bold mb-2">Query</h3>
                          <p className="text-sm leading-relaxed">
                            {typeof msg.content === "string"
                              ? msg.content
                              : JSON.stringify(msg.content)}
                          </p>
                        </MessageCard>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No {currentView.replace("View ", "").toLowerCase()} messages
                found.
              </p>
            )}
          </div>
        );
      default:
        return (
          <div className="mb-8">
            <p className="text-center text-gray-500">
              Select a view from the menu
            </p>
          </div>
        );
    }
  };

  const selectedUserRole = localStorage.getItem("selectedUserRole");

  return (
    <MainLayout
      showSidebar
      title="Broadcast messages"
      onMenuItemClick={handleMenuItemClick}
    >
      {/* Current broadcast indicator */}
      {selectedBroadcastId && (
        <div className="bg-blue-50 p-2 mb-4 rounded border border-blue-200 flex justify-between">
          <span className="text-sm text-blue-700">
            Current Broadcast ID: {selectedBroadcastId}
          </span>
          <button
            onClick={refreshAllMessages}
            className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded"
          >
            Refresh All
          </button>
        </div>
      )}

      {renderContent()}

      {selectedUserRole === "transmitter" && (
        <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
          {/* Message input */}
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="p-3 border border-gray-300 rounded-l-md w-full md:w-[70%] lg:w-[72%]"
            placeholder="Create message..."
            disabled={isLoading}
          />

          {/* Location button */}
          <button
            onClick={() => setShowSendLocationModal(true)}
            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            disabled={isLoading}
            title="Send Location"
          >
            <MapPin size={20} />
          </button>

          {/* Send options dropdown */}
          <SendOptionsDropdown onItemClick={handleMenuItemClick} />

          {/* Send message button */}
          <button
            onClick={handleSendMessage}
            className={`px-5 py-3 ${
              isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-md transition-colors`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>
      )}

      {selectedUserRole === "agent" && (
        <div className="fixed bottom-4 left-4 right-4 flex justify-center items-center">
          <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-md border border-yellow-300 shadow">
            <span className="text-sm text-yellow-800 font-medium">
              You are an Agent, you cannot send messages.
            </span>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddAgentModal && (
        <AddAgentModal
          isOpen={showAddAgentModal}
          onClose={() => setShowAddAgentModal(false)}
          email={newAgentEmail}
          setEmail={setNewAgentEmail}
          onSubmit={handleAddAgent}
        />
      )}

      {showViewAgentsModal && (
        <ViewAgentsModal
          isOpen={showViewAgentsModal}
          onClose={() => setShowViewAgentsModal(false)}
          agents={mockAgents}
        />
      )}

      {showAddQueryModal && (
        <AddQueryModal
          isOpen={showAddQueryModal}
          onClose={() => setShowAddQueryModal(false)}
        />
      )}

      {showSendProcessModal && (
        <SendProcessModal
          isOpen={showSendProcessModal}
          onClose={() => setShowSendProcessModal(false)}
          processName={processName}
          setProcessName={setProcessName}
          processProgress={processProgress}
          setProcessProgress={setProcessProgress}
          // onSubmit={handleSendProcess}
        />
      )}

      {showSendLocationModal && (
        <SendLocationModal
          isOpen={showSendLocationModal}
          onClose={() => setShowSendLocationModal(false)}
        />
      )}
    </MainLayout>
  );
};
