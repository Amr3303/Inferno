// import { FC, useState, useEffect } from 'react';
// import { MainLayout } from '../../layouts/MainLayout';
// import { useToast } from '../../hooks/use-toast';
// import { MapPin } from 'lucide-react';
// import { MessageCard } from '../../components/MessageCard';
// import { LocationCard } from '../../components/LocationCard';
// import { ProgressBar } from '../../components/ProgressBar';
// import { SendOptionsDropdown } from '../../components/CustomDropdownMenu';
// import { AddAgentModal } from '../../components/modals/AddAgentModal';
// import { ViewAgentsModal } from '../../components/modals/ViewAgentsModal';
// import { AddQueryModal } from '../../components/modals/AddQueryModal';
// import { SendProcessModal } from '../../components/modals/SendProcessModal';
// import { SendLocationModal } from '../../components/modals/SendLocationModal';
// import { useMessageApi } from '../../hooks/use-message-api';


// // Mock agents data
// const mockAgents = [
//   { id: 1, name: "أحمد محمد", email: "ahmed.mohamed@example.com", status: "Active" },
//   { id: 2, name: "سارة علي", email: "sara.ali@example.com", status: "Inactive" },
//   { id: 3, name: "عمر حسن", email: "omar.hassan@example.com", status: "Active" }
// ];

// // Message type interface
// interface Message {
//   id: string;
//   type: string;
//   content: string;
//   createdAt: string;
// }

// export const MessagesPage: FC = () => {
  
//   const selectedBroadcastId = localStorage.getItem("selectedBroadcastId")
//   const broadcastId = localStorage.getItem("selectedBroadcastId")
//   // Basic state variables
//   const [messageText, setMessageText] = useState('');
//   const [currentView, setCurrentView] = useState('View Message');
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   // Message states
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   // Type-specific message states
//   const [textMessages, setTextMessages] = useState<Message[]>([]);
//   const [locationMessages, setLocationMessages] = useState<Message[]>([]);
//   const [processMessages, setProcessMessages] = useState<Message[]>([]);
//   const [queryMessages, setQueryMessages] = useState<Message[]>([]);
//   const [loadingText, setLoadingText] = useState(false);
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [loadingProcess, setLoadingProcess] = useState(false);
//   const [loadingQuery, setLoadingQuery] = useState(false);
//   const [errorText, setErrorText] = useState<string | null>(null);
//   const [errorLocation, setErrorLocation] = useState<string | null>(null);
//   const [errorProcess, setErrorProcess] = useState<string | null>(null);
//   const [errorQuery, setErrorQuery] = useState<string | null>(null);

//   // Modal states
//   const [showAddAgentModal, setShowAddAgentModal] = useState(false);
//   const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
//   const [showAddQueryModal, setShowAddQueryModal] = useState(false);
//   const [showSendProcessModal, setShowSendProcessModal] = useState(false);
//   const [showSendLocationModal, setShowSendLocationModal] = useState(false);

//   // Form states
//   const [newAgentEmail, setNewAgentEmail] = useState('');
//   const [queryName, setQueryName] = useState('');
//   const [queryDescription, setQueryDescription] = useState('');
//   const [processProgress, setProcessProgress] = useState(0);
//   const [processName, setProcessName] = useState('');
//   const [locationContent, setLocationContent] = useState('');
//   const [locationLat, setLocationLat] = useState('');
//   const [locationLng, setLocationLng] = useState('');

//   // Custom hooks
//   const { sendTextMessage } = useMessageApi();

//   // Fetch all messages for all types when broadcast changes
//   useEffect(() => {
//     if (!selectedBroadcastId) return;

//     const token = localStorage.getItem('token');
//     if (!token) return;

//     // Fetch all message types
//     fetchMessages(token);
//     fetchTextMessages(token);
//     fetchLocationMessages(token);
//     fetchProcessMessages(token);
//     fetchQueryMessages(token);
    
//     // Log for debugging
//     console.log(`Fetching all message types for broadcast ID: ${selectedBroadcastId}`);
//   }, [selectedBroadcastId]);

//   // Fetch specific message type when view changes
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!selectedBroadcastId || !token) return;
    
//     // Refresh only the current view type to avoid unnecessary API calls
//     switch (currentView) {
//       case 'View Message':
//         fetchMessages(token);
//         break;
//       case 'View Text':
//         fetchTextMessages(token);
//         break;
//       case 'View Location':
//         fetchLocationMessages(token);
//         break;
//       case 'View Process':
//         fetchProcessMessages(token);
//         break;
//       case 'View Query':
//         fetchQueryMessages(token);
//         break;
//     }
//   }, [currentView]);

//   // Fetch all messages
//   const fetchMessages = async (token: string) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`, 
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error(`Error fetching messages: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setMessages(data.messages || []);
//       console.log('Fetched general messages:', data.messages?.length || 0);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       console.error('Error fetching messages:', err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   // Fetch messages by type
//   const fetchMessagesByType = async (token: string, type: string) => {
//     const setLoadingState = (state: boolean) => {
//       switch (type) {
//         case 'text': setLoadingText(state); break;
//         case 'location': setLoadingLocation(state); break;
//         case 'process': setLoadingProcess(state); break;
//         case 'query': setLoadingQuery(state); break;
//       }
//     };
    
//     const setErrorState = (err: string | null) => {
//       switch (type) {
//         case 'text': setErrorText(err); break;
//         case 'location': setErrorLocation(err); break;
//         case 'process': setErrorProcess(err); break;
//         case 'query': setErrorQuery(err); break;
//       }
//     };
    
//     const setMessagesState = (msgs: Message[]) => {
//       switch (type) {
//         case 'text': setTextMessages(msgs); break;
//         case 'location': setLocationMessages(msgs); break;
//         case 'process': setProcessMessages(msgs); break;
//         case 'query': setQueryMessages(msgs); break;
//       }
//     };
    
//     setLoadingState(true);
//     setErrorState(null);
    
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=${type}`, 
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error(`Error fetching ${type} messages: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setMessagesState(data.messages || []);
//       console.log(`Fetched ${type} messages:`, data.messages?.length || 0);
//     } catch (err) {
//       setErrorState(err instanceof Error ? err.message : 'Unknown error occurred');
//       console.error(`Error fetching ${type} messages:`, err);
//     } finally {
//       setLoadingState(false);
//     }
//   };

//   // Shorthand functions for fetching specific message types
//   const fetchTextMessages = (token: string) => fetchMessagesByType(token, 'text');
//   const fetchLocationMessages = (token: string) => fetchMessagesByType(token, 'location');
//   const fetchProcessMessages = (token: string) => fetchMessagesByType(token, 'process');
//   const fetchQueryMessages = (token: string) => fetchMessagesByType(token, 'query');

//   // Refresh all messages
//   const refreshAllMessages = () => {
//     const token = localStorage.getItem('token');
//     if (!selectedBroadcastId || !token) return;
    
//     fetchMessages(token);
//     fetchTextMessages(token);
//     fetchLocationMessages(token);
//     fetchProcessMessages(token);
//     fetchQueryMessages(token);
    
//     toast({
//       title: "Refreshed",
//       description: "All messages have been refreshed"
//     });
//   };

//   // Handle sending text message
//   const handleSendMessage = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast({
//         title: "Error",
//         description: "Please login first",
//         variant: "destructive"
//       });
//       return;
//     }

//     if (!messageText.trim()) {
//       toast({
//         title: "Error", 
//         description: "Message cannot be empty",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);
//     const success = await sendTextMessage(messageText, token);
//     if (success) {
//       setMessageText('');
//       // Refresh current view type after sending
//       if (selectedBroadcastId) {
//         fetchMessages(token);
//       }
//       toast({
//         title: "Success",
//         description: "Message sent successfully"
//       });
//     }
//     setIsLoading(false);
//   };

//   // Handle adding agent
//   const handleAddAgent = () => {
//     if (!newAgentEmail.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter an email address",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "Success",
//       description: `Agent invitation sent to ${newAgentEmail}`
//     });

//     setNewAgentEmail('');
//     setShowAddAgentModal(false);
//   };

//   // Handle sending process
//   const handleSendProcess = () => {
//     // Implementation for sending process message would go here
//     toast({
//       title: "Success",
//       description: "Process sent successfully!"
//     });
//     setShowSendProcessModal(false);
    
//     // Refresh process messages
//     const token = localStorage.getItem('token');
//     if (selectedBroadcastId && token) {
//       fetchProcessMessages(token);
//     }
//   };


//   // Handle menu item clicks
//   const handleMenuItemClick = (action: string) => {
//     switch (action) {
//       case "Add Agent":
//         setShowAddAgentModal(true);
//         break;
//       case "View Agents":
//         setShowViewAgentsModal(true);
//         break;
//       case "View Message":
//         setCurrentView(action);
//         break;
//       case "View Text":
//         setCurrentView(action);
//         break;
//       case "View Location":
//         setCurrentView(action);
//         break;
//       case "View Process":
//         setCurrentView(action);
//         break;
//       case "View Query":
//         setCurrentView(action);
//         break;
//       case 'Send Process':
//         setShowSendProcessModal(true);
//         break;
//       case 'Send Query':
//         setShowAddQueryModal(true);
//         break;
//       case 'Send Location':
//         setShowSendLocationModal(true);
//         break;
//       case 'Refresh Messages':
//         refreshAllMessages();
//         break;
//       default:
//         toast({
//           description: `${action} action selected`
//         });
//     }
//   };

//   // Render content based on current view
//   const renderContent = () => {
//     switch (currentView) {
//       case "View Message":
//         return (
//           <div className="mb-8">
//             {error && (
//               <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
//                 Error: {error}
//               </div>
//             )}
//             {loading ? (
//               <div className="flex justify-center items-center py-4">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                 <span className="ml-2">Loading messages...</span>
//               </div>
//             ) : messages.length > 0 ? (
//               <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
//                 {messages.map((msg, index) => {
//                   switch (msg.type) {
//                     case "text":
//                       return (
//                         <MessageCard key={index} onOptionsClick={() => {}}>
//                           <p className="text-sm leading-relaxed">{msg.content}</p>
//                         </MessageCard>
//                       );
//                     case "location":
//                       return (
//                         <LocationCard key={index} coordinates={msg.content} onOptionsClick={() => {}} />
//                       );
//                     case "process":
//                       return (
//                         <ProgressBar key={index} progress={parseInt(msg.content)} onOptionsClick={() => {}} />
//                       );
//                     case "query":
//                       return (
//                         <MessageCard key={index} onOptionsClick={() => {}}>
//                           <h3 className="font-bold mb-2">Query</h3>
//                           <p className="text-sm leading-relaxed">
//                             {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
//                           </p>
//                         </MessageCard>
//                       );
//                     default:
//                       return null;
//                   }
//                 })}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-4">No messages found.</p>
//             )}
//           </div>
//         );
//         case "View Text":
//           return (
//             <div className="mb-8">
//               {errorText && (
//                 <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
//                   Error: {errorText}
//                 </div>
//               )}
//               {loadingText ? (
//                 <div className="flex justify-center items-center py-4">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                   <span className="ml-2">Loading text messages...</span>
//                 </div>
//               ) : textMessages.length > 0 ? (
//                 <div className="space-y-4">
//                   {textMessages.map((msg, index) => (
//                     <MessageCard key={index} onOptionsClick={() => {}}>
//                     <p className="text-sm leading-relaxed">{msg.content}</p>
//                   </MessageCard>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">No text messages found.</p>
//               )}
//             </div>
//           );
      
//       case "View Location":
//         return (
//           <div className="mb-8">
//             {errorLocation && (
//               <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
//                 Error: {errorLocation}
//               </div>
//             )}
//             {loadingLocation ? (
//               <div className="flex justify-center items-center py-4">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                 <span className="ml-2">Loading location messages...</span>
//               </div>
//             ) : locationMessages.length > 0 ? (
//               <div className="space-y-4">
//                 {locationMessages.map((msg, index) => (
//                   <LocationCard key={index} coordinates={msg.content} onOptionsClick={() => {}} />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-4">No location messages found.</p>
//             )}
//           </div>
//         );
      
//       case "View Process":
//         return (
//           <div className="mb-8">
//             {errorProcess && (
//               <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
//                 Error: {errorProcess}
//               </div>
//             )}
//             {loadingProcess ? (
//               <div className="flex justify-center items-center py-4">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                 <span className="ml-2">Loading process messages...</span>
//               </div>
//             ) : processMessages.length > 0 ? (
//               <div className="space-y-4">
//                 {processMessages.map((msg, index) => (
//                   <ProgressBar key={index} progress={parseInt(msg.content)} onOptionsClick={() => {}} />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-4">No process messages found.</p>
//             )}
//           </div>
//         );
      
//       case "View Query":
//         return (
//           <div className="mb-8">
//             {errorQuery && (
//               <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
//                 Error: {errorQuery}
//               </div>
//             )}
//             {loadingQuery ? (
//               <div className="flex justify-center items-center py-4">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                 <span className="ml-2">Loading query messages...</span>
//               </div>
//             ) : queryMessages.length > 0 ? (
//               <div className="space-y-4">
//                 {queryMessages.map((msg, index) => (
//                   <MessageCard key={index} onOptionsClick={() => {}}>
//                     <h3 className="font-bold mb-2">Query</h3>
//                     <p className="text-sm leading-relaxed">
//                       {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
//                     </p>
//                   </MessageCard>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center py-4">No query messages found.</p>
//             )}
//           </div>
//         );
      
//       default:
//         return (
//           <div className="mb-8">
//             <p className="text-center text-gray-500">Select a view from the menu</p>
//           </div>
//         );
//     }
//   };
  
//   const selectedUserRole = localStorage.getItem('selectedUserRole');

//   return (
//     <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick}>
//       {/* Current broadcast indicator */}
//       {selectedBroadcastId && (
//         <div className="bg-blue-50 p-2 mb-4 rounded border border-blue-200 flex justify-between">
//           <span className="text-sm text-blue-700">
//             Current Broadcast ID: {selectedBroadcastId}
//           </span>
//           <button 
//             onClick={refreshAllMessages}
//             className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded"
//           >
//             Refresh All
//           </button>
//         </div>
//       )}
      
//       {renderContent()}
      
//       {selectedUserRole === 'transmitter' && (
//         <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
//           {/* Message input */}
//           <input
//             type="text"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             className="p-3 border border-gray-300 rounded-l-md w-full md:w-[70%] lg:w-[72%]"
//             placeholder="Create message..."
//             disabled={isLoading}
//           />

//           {/* Location button */}
//           <button
//             onClick={() => setShowSendLocationModal(true)}
//             className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
//             disabled={isLoading}
//             title="Send Location"
//           >
//             <MapPin size={20} />
//           </button>

//           {/* Send options dropdown */}
//           <SendOptionsDropdown onItemClick={handleMenuItemClick} />

//           {/* Send message button */}
//           <button
//             onClick={handleSendMessage}
//             className={`px-5 py-3 ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition-colors`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Sending...' : 'Send Message'}
//           </button>
//         </div>
//       )}

//       {selectedUserRole === 'agent' && (
//         <div className="fixed bottom-4 left-4 right-4 flex justify-center items-center">
//           <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-md border border-yellow-300 shadow">
//             <span className="text-sm text-yellow-800 font-medium">
//               You are an Agent, you cannot send messages.
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       {showAddAgentModal && (
//         <AddAgentModal
//           isOpen={showAddAgentModal}
//           onClose={() => setShowAddAgentModal(false)}
//           email={newAgentEmail}
//           setEmail={setNewAgentEmail}
//           onSubmit={handleAddAgent}
//         />
//       )}

//       {showViewAgentsModal && (
//         <ViewAgentsModal
//           isOpen={showViewAgentsModal}
//           onClose={() => setShowViewAgentsModal(false)}
//           agents={mockAgents}
//         />
//       )}

//       {showAddQueryModal && (
//         <AddQueryModal
//           isOpen={showAddQueryModal}
//           onClose={() => setShowAddQueryModal(false)}
//         />
//       )}

//       {showSendProcessModal && (
//         <SendProcessModal
//           isOpen={showSendProcessModal}
//           onClose={() => setShowSendProcessModal(false)}
//           processName={processName}
//           setProcessName={setProcessName}
//           processProgress={processProgress}
//           setProcessProgress={setProcessProgress}
//           onSubmit={handleSendProcess}
//         />
//       )}

//       {showSendLocationModal && (
//         <SendLocationModal
//           isOpen={showSendLocationModal}
//           onClose={() => setShowSendLocationModal(false)}
//         />
//       )}
//     </MainLayout>
//   );
// };