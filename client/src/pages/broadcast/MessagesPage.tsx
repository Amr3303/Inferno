// // import { FC, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { MainLayout } from '../../layouts/MainLayout';
// // import { useToast } from '../../hooks/use-toast';
// // import { MapPin } from 'lucide-react';
// // import { MessageCard } from '../../components/MessageCard';
// // import { LocationCard } from '../../components/LocationCard';
// // import { ProgressBar } from '../../components/ProgressBar';
// // import { SendOptionsDropdown } from '../../components/CustomDropdownMenu';
// // import { AddAgentModal } from '../../components/modals/AddAgentModal';
// // import { ViewAgentsModal } from '../../components/modals/ViewAgentsModal';
// // import { AddQueryModal } from '../../components/modals/AddQueryModal';
// // import { SendProcessModal } from '../../components/modals/SendProcessModal';
// // import { SendLocationModal } from '../../components/modals/SendLocationModal';
// // import { useMessageApi } from '../../hooks/use-message-api';
// // import { useQueryApi } from '../../hooks/use-query-api';
// // import { useLocationApi } from '../../hooks/use-location-api';
// // import { useEffect } from 'react';
// // import { useFetchMessages } from '../../hooks/useFetchMessages';
// // import { useFetchMessagesType } from '../../hooks/useFetchMessagesType';


// // // بيانات مثال
// // const mockAgents = [
// //   { id: 1, name: "أحمد محمد", email: "ahmed.mohamed@example.com", status: "Active" },
// //   { id: 2, name: "سارة علي", email: "sara.ali@example.com", status: "Inactive" },
// //   { id: 3, name: "عمر حسن", email: "omar.hassan@example.com", status: "Active" }
// // ];

// // // API endpoints and constants
// // const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
// // const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;

// // export const MessagesPage: FC = () => {
// //   const [messageText, setMessageText] = useState('');
// //   const [currentView, setCurrentView] = useState('View Message');
// //   const { toast } = useToast();
// //   const navigate = useNavigate();
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Modal states
// //   const [showAddAgentModal, setShowAddAgentModal] = useState(false);
// //   const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
// //   const [showAddQueryModal, setShowAddQueryModal] = useState(false);
// //   const [showSendProcessModal, setShowSendProcessModal] = useState(false);
// //   const [showSendLocationModal, setShowSendLocationModal] = useState(false);

// //   // Form states
// //   const [newAgentEmail, setNewAgentEmail] = useState('');
// //   const [queryName, setQueryName] = useState('');
// //   const [queryDescription, setQueryDescription] = useState('');
// //   const [processProgress, setProcessProgress] = useState(0);
// //   const [processName, setProcessName] = useState('');
// //   const [locationContent, setLocationContent] = useState('');
// //   const [locationLat, setLocationLat] = useState('');
// //   const [locationLng, setLocationLng] = useState('');
// //   const { sendTextMessage } = useMessageApi();

// //   const { messages, loading, fetchMessages } = useFetchMessages();
// //   const { messagesType, loadingType, fetchMessagesType } = useFetchMessagesType();
// //   const [locationData, setLocationData] = useState(null);
// //   const [processData, setProcessData] = useState(null);
// //   const [queryData, setQueryData] = useState(null);
  

// // //  // داخل المكون الرئيسي
// // // useEffect(() => {
// // //   const token = localStorage.getItem('token');
// // //   const broadcastId = localStorage.getItem('selectedBroadcastId');
  
// // //   if (token && broadcastId) {
// // //     fetchMessages(broadcastId, token);
// // //   }
// // // }, [localStorage.getItem('selectedBroadcastId')]); // أو استخدم حالة للتغييرات هنا
// // useEffect(() => {
// //   const token = localStorage.getItem('token');
// //   const broadcastId = localStorage.getItem('selectedBroadcastId');
  
// //   if (token && broadcastId) {
// //     fetchMessages(broadcastId, token);
// //   }
// // }, [BROADCAST_ID]); // استخدام BROADCAST_ID كـ dependency بدلاً من localStorage.getItem



// //   const validateInputs = (token: string, queryName: string, queryDescription: string) => {
// //     if (!token) {
// //       toast({
// //         title: "Error",
// //         description: "No authentication token found. Please log in.",
// //         variant: "destructive"
// //       });
// //       return false;
// //     }

// //     if (!queryName.trim() || !queryDescription.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "Please fill in both fields",
// //         variant: "destructive"
// //       });
// //       return false;
// //     }

// //     return true;
// //   };
// //   const handleSendMessage = async () => {
// //     const token = localStorage.getItem('token'); // أو authToken حسب ما حفظته
// //     if (!token) {
// //       toast({
// //         title: "Error",
// //         description: "Please login first",
// //         variant: "destructive"
// //       });
// //       return;
// //     }

// //     setIsLoading(true);
// //     const success = await sendTextMessage(messageText, token);
// //     if (success) {
// //       setMessageText('');
// //     }
// //     setIsLoading(false);
// //   };



// //   const handleAddAgent = () => {
// //     if (!newAgentEmail.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "Please enter an email address",
// //         variant: "destructive"
// //       });
// //       return;
// //     }

// //     toast({
// //       title: "Success",
// //       description: `Agent invitation sent to ${newAgentEmail}`
// //     });

// //     setNewAgentEmail('');
// //     setShowAddAgentModal(false);
// //   };

// //   const handleSendProcess = () => {
// //     toast({
// //       title: "Success",
// //       description: "Process sent successfully!"
// //     });
// //     setShowSendProcessModal(false);
// //   };

// //   const handlePasteCoordinates = async () => {
// //     try {
// //       const text = await navigator.clipboard.readText();
// //       const match = text.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
// //       if (match) {
// //         setLocationLat(match[1]);
// //         setLocationLng(match[2]);
// //         toast({ title: "تم لصق الإحداثيات!" });
// //       } else {
// //         toast({
// //           title: "تنسيق غير صالح",
// //           description: "تأكد من نسخ الإحداثيات بالشكل: 40.7128, -74.0060"
// //         });
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "خطأ",
// //         description: "لا يمكن الوصول إلى الحافظة"
// //       });
// //     }
// //   };

// //   const handleMenuItemClick = (action: string) => {
// //     // Handle menu actions
// //     switch (action) {
// //       case "Add Agent":
// //         setShowAddAgentModal(true);
// //         break;
// //       case "View Agents":
// //         setShowViewAgentsModal(true);
// //         break;
// //       case "View Message":
// //       case "View Location":
// //       case "View Process":
// //       case "View Query":
// //         setCurrentView(action);
// //         break;
// //       case 'Send Process':
// //         setShowSendProcessModal(true);
// //         break;
// //       case 'Send Query':
// //         setShowAddQueryModal(true);
// //         break;
// //       case 'Send Location':
// //         setShowSendLocationModal(true);
// //         break;
// //       default:
// //         toast({
// //           description: `${action} action selected`
// //         });
// //     }
// //   };

// //   // Render content based on current view
// //   // const renderContent = () => {
// //   //   switch (currentView) {
// //   //     case "View Message":
// //   // return (
// //   //   <div className="mb-8">
// //   //     {loading ? (
// //   //       <p>Loading messages...</p>
// //   //     ) : messages.length > 0 ? (
// //   //       <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
// //   //         {messages.map((msg, index) => {
// //   //           switch (msg.type) {
// //   //             case "text":
// //   //               return (
// //   //                 <MessageCard key={index} onOptionsClick={() => { }}>
// //   //                   <p className="text-sm leading-relaxed">{msg.content}</p>
// //   //                 </MessageCard>
// //   //               );
// //   //             case "location":
// //   //               return (
// //   //                 <LocationCard key={index} coordinates={msg.content} onOptionsClick={() => { }} />
// //   //               );
// //   //             case "process":
// //   //               return (
// //   //                 <ProgressBar key={index} progress={parseInt(msg.content)} onOptionsClick={() => { }} />
// //   //               );
// //   //             case "query":
// //   //               return (
// //   //                 <MessageCard key={index} onOptionsClick={() => { }}>
// //   //                   <h3 className="font-bold mb-2">استعلام</h3>
// //   //                   <p className="text-sm leading-relaxed">
// //   //                     {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
// //   //                   </p>
// //   //                 </MessageCard>
// //   //               );
// //   //             default:
// //   //               return null;
// //   //           }
// //   //         })}
// //   //       </div>
// //   //     ) : (
// //   //       <p>No messages found.</p>
// //   //     )}
// //   //   </div>
// //   // );
// //   //     case "View Location":
// //   //       return (
// //   //         <div className="mb-8">
// //   //           <LocationCard
// //   //             coordinates="30.0768163914401931.2847391229373"
// //   //             onOptionsClick={() => { }}
// //   //           />
// //   //         </div>
// //   //       );
// //   //     case "View Process":
// //   //       return (
// //   //         <div className="mb-8">
// //   //           <ProgressBar
// //   //             progress={25}
// //   //             onOptionsClick={() => { }}
// //   //           />
// //   //         </div>
// //   //       );
// //   //     case "View Query":
// //   //       return (
// //   //         <div className="mb-8">
// //   //           <MessageCard onOptionsClick={() => { }}>
// //   //             <h3 className="font-bold mb-2">Query</h3>
// //   //             <p>
// //   //               ...............................................................................
// //   //               ...............................................................................
// //   //               ...............................................................................
// //   //             </p>
// //   //           </MessageCard>
// //   //         </div>
// //   //       );
// //   //     default:
// //   //       return (
// //   //         <div className="mb-8">
// //   //           <p>Select a view from the menu</p>
// //   //         </div>
// //   //       );
// //   //   }
// //   // };
// //   const renderContent = () => {
// //     switch (currentView) {
// //       case "View Message":
// //         return (
// //           <div className="mb-8">
// //             {loading ? (
// //               <p>Loading messages...</p>
// //             ) : messages.length > 0 ? (
// //               <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
// //                 {messages.map((msg, index) => {
// //                   switch (msg.type) {
// //                     case "text":
// //                       return (
// //                         <MessageCard key={index} onOptionsClick={() => { }}>
// //                           <p className="text-sm leading-relaxed">{msg.content}</p>
// //                         </MessageCard>
// //                       );
// //                     case "location":
// //                       return (
// //                         <LocationCard key={index} coordinates={msg.content} onOptionsClick={() => { }} />
// //                       );
// //                     case "process":
// //                       return (
// //                         <ProgressBar key={index} progress={parseInt(msg.content)} onOptionsClick={() => { }} />
// //                       );
// //                     case "query":
// //                       return (
// //                         <MessageCard key={index} onOptionsClick={() => { }}>
// //                           <h3 className="font-bold mb-2">استعلام</h3>
// //                           <p className="text-sm leading-relaxed">
// //                             {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
// //                           </p>
// //                         </MessageCard>
// //                       );
// //                     default:
// //                       return null;
// //                   }
// //                 })}
// //               </div>
// //             ) : (
// //               <p>No messages found.</p>
// //             )}
// //           </div>
// //         );
// //       case "View Location":
// //         return (
// //           <div className="mb-8">
// //             <LocationCard
// //               coordinates={`${locationLat}, ${locationLng}`} // استخدم الإحداثيات التي تم الحصول عليها
// //               onOptionsClick={() => { }}
// //             />
// //           </div>
// //         );
// //       case "View Process":
// //         return (
// //           <div className="mb-8">
// //             <ProgressBar
// //               progress={processProgress} // استخدام قيمة التقدم
// //               onOptionsClick={() => { }}
// //             />
// //           </div>
// //         );
// //       case "View Query":
// //         return (
// //           <div className="mb-8">
// //             <MessageCard onOptionsClick={() => { }}>
// //               <h3 className="font-bold mb-2">Query</h3>
// //               <p className="text-sm leading-relaxed">
// //                 {queryName} {/* عرض اسم الاستعلام */}
// //                 <br />
// //                 {queryDescription} {/* عرض وصف الاستعلام */}
// //               </p>
// //             </MessageCard>
// //           </div>
// //         );
// //       default:
// //         return (
// //           <div className="mb-8">
// //             <p>Select a view from the menu</p>
// //           </div>
// //         );
// //     }
// //   };  

// //   const selectedUserRole = localStorage.getItem('selectedUserRole');
// //   return (
// //     <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick} >
// //       {renderContent()}
// //       {selectedUserRole === 'transmitter' && (
// //         <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
// //           {/* إدخال الرسالة */}
// //           <input
// //             type="text"
// //             value={messageText}
// //             onChange={(e) => setMessageText(e.target.value)}
// //             className="p-3 border border-gray-300 rounded-l-md w-[1070px]"
// //             placeholder="Create"
// //             disabled={isLoading}
// //           />

// //           {/* زر الموقع */}
// //           <button
// //             onClick={() => setShowSendLocationModal(true)}
// //             className="px-3 py-2 border border-gray-300 rounded-md"
// //             disabled={isLoading}
// //           >
// //             <MapPin size={20} />
// //           </button>

// //           {/* القائمة المنسدلة لخيارات الإرسال */}
// //           <SendOptionsDropdown onItemClick={handleMenuItemClick} />

// //           {/* زر إرسال الرسالة */}
// //           <button
// //             onClick={handleSendMessage}
// //             className={`px-5 py-3 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded-md`}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? 'Sending...' : 'Send Message'}
// //           </button>
// //         </div>
// //       )}

// //       {selectedUserRole === 'agent' && (
// //         <div className="fixed bottom-4 left-4 right-4 flex justify-center items-center">
// //           <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-md border border-yellow-300 shadow">
// //             <span className="text-sm text-yellow-800 font-medium">
// //               You are an Agent, you cannot send messages.
// //             </span>
// //           </div>
// //         </div>
// //       )}



// //       {/* Modals */}
// //       {showAddAgentModal && (
// //         <AddAgentModal
// //           isOpen={showAddAgentModal}
// //           onClose={() => setShowAddAgentModal(false)}
// //           email={newAgentEmail}
// //           setEmail={setNewAgentEmail}
// //           onSubmit={handleAddAgent}
// //         />
// //       )}

// //       {showViewAgentsModal && (
// //         <ViewAgentsModal
// //           isOpen={showViewAgentsModal}
// //           onClose={() => setShowViewAgentsModal(false)}
// //           agents={mockAgents}
// //         />
// //       )}

// //       {showAddQueryModal && (
// //         <AddQueryModal
// //           isOpen={showAddQueryModal}
// //           onClose={() => setShowAddQueryModal(false)}
// //         />
// //       )}

// //       {showSendProcessModal && (
// //         <SendProcessModal
// //           isOpen={showSendProcessModal}
// //           onClose={() => setShowSendProcessModal(false)}
// //           processName={processName}
// //           setProcessName={setProcessName}
// //           processProgress={processProgress}
// //           setProcessProgress={setProcessProgress}
// //           onSubmit={handleSendProcess}
// //         />
// //       )}

// //       {showSendLocationModal && (
// //         <SendLocationModal
// //           isOpen={showSendLocationModal}
// //           onClose={() => setShowSendLocationModal(false)}
// //         />
// //       )}
// //     </MainLayout>
// //   );
// // };
// import { FC, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
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
// import { useFetchMessages } from '../../hooks/useFetchMessages';

// // بيانات المثال
// const mockAgents = [
//   { id: 1, name: "أحمد محمد", email: "ahmed.mohamed@example.com", status: "Active" },
//   { id: 2, name: "سارة علي", email: "sara.ali@example.com", status: "Inactive" },
//   { id: 3, name: "عمر حسن", email: "omar.hassan@example.com", status: "Active" }
// ];

// // API endpoints and constants
// const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
// const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;

// export const MessagesPage: FC = () => {
//   const [messageText, setMessageText] = useState('');
//   const [currentView, setCurrentView] = useState('View Message');
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

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
//   const { sendTextMessage } = useMessageApi();

//   const { messages, loading, fetchMessages } = useFetchMessages();
//   // const { messagesType, loadingType, fetchMessagesType } = useFetchMessages();

//   // // جلب الرسائل عند تغيير view
//   // useEffect(() => {
//   //   const token = localStorage.getItem('token');
//   //   const broadcastId = localStorage.getItem('selectedBroadcastId');
  
//   //   if (token && broadcastId) {
//   //     if (currentView === 'View Message') {
//   //       fetchMessages(broadcastId, token);
//   //     } else if (['View Location', 'View Process', 'View Query'].includes(currentView)) {
//   //       const type = currentView.split(' ')[1].toLowerCase(); // مثال: "Location" -> "location"
//   //       fetchMessagesType(broadcastId, token, type);
//   //     }
//   //   }
//   // }, [currentView]); // استدعاء الجلب عند تغيير currentView

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const broadcastId = localStorage.getItem('selectedBroadcastId');
    
//     if (!token || !broadcastId) {
//       // Handle missing token or broadcastId
//       return;
//     }
    
//     // Fetch the appropriate messages based on the current view
//     switch (currentView) {
//       case 'View Message':
//         fetchMessages(broadcastId, token);
//         break;
//       case 'View Location':
//         fetchLocationMessages(broadcastId, token);
//         break;
//       case 'View Process':
//         fetchProcessMessages(broadcastId, token);
//         break;
//       case 'View Query':
//         fetchQueryMessages(broadcastId, token);
//         break;
//     }
//   }, [currentView]); 
//   const validateInputs = (token: string, queryName: string, queryDescription: string) => {
//     if (!token) {
//       toast({
//         title: "Error",
//         description: "No authentication token found. Please log in.",
//         variant: "destructive"
//       });
//       return false;
//     }

//     if (!queryName.trim() || !queryDescription.trim()) {
//       toast({
//         title: "Error",
//         description: "Please fill in both fields",
//         variant: "destructive"
//       });
//       return false;
//     }

//     return true;
//   };

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

//     setIsLoading(true);
//     const success = await sendTextMessage(messageText, token);
//     if (success) {
//       setMessageText('');
//     }
//     setIsLoading(false);
//   };

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

//   const handleSendProcess = () => {
//     toast({
//       title: "Success",
//       description: "Process sent successfully!"
//     });
//     setShowSendProcessModal(false);
//   };

//   const handlePasteCoordinates = async () => {
//     try {
//       const text = await navigator.clipboard.readText();
//       const match = text.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
//       if (match) {
//         setLocationLat(match[1]);
//         setLocationLng(match[2]);
//         toast({ title: "تم لصق الإحداثيات!" });
//       } else {
//         toast({
//           title: "تنسيق غير صالح",
//           description: "تأكد من نسخ الإحداثيات بالشكل: 40.7128, -74.0060"
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "خطأ",
//         description: "لا يمكن الوصول إلى الحافظة"
//       });
//     }
//   };

//   const handleMenuItemClick = (action: string) => {
//     switch (action) {
//       case "Add Agent":
//         setShowAddAgentModal(true);
//         break;
//       case "View Agents":
//         setShowViewAgentsModal(true);
//         break;
//       case "View Message":
//       case "View Location":
//       case "View Process":
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
//       default:
//         toast({
//           description: `${action} action selected`
//         });
//     }
//   };

//   // const renderContent = () => {
//   //   switch (currentView) {
//   //     case "View Message":
//   //       return (
//   //         <div className="mb-8">
//   //           {loading ? (
//   //             <p>Loading messages...</p>
//   //           ) : messages.length > 0 ? (
//   //             <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
//   //               {messages.map((msg, index) => {
//   //                 switch (msg.type) {
//   //                   case "text":
//   //                     return (
//   //                       <MessageCard key={index} onOptionsClick={() => { }}>
//   //                         <p className="text-sm leading-relaxed">{msg.content}</p>
//   //                       </MessageCard>
//   //                     );
//   //                   case "location":
//   //                     return (
//   //                       <LocationCard key={index} coordinates={msg.content} onOptionsClick={() => { }} />
//   //                     );
//   //                   case "process":
//   //                     return (
//   //                       <ProgressBar key={index} progress={parseInt(msg.content)} onOptionsClick={() => { }} />
//   //                     );
//   //                   case "query":
//   //                     return (
//   //                       <MessageCard key={index} onOptionsClick={() => { }}>
//   //                         <h3 className="font-bold mb-2">استعلام</h3>
//   //                         <p className="text-sm leading-relaxed">
//   //                           {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
//   //                         </p>
//   //                       </MessageCard>
//   //                     );
//   //                   default:
//   //                     return null;
//   //                 }
//   //               })}
//   //             </div>
//   //           ) : (
//   //             <p>No messages found.</p>
//   //           )}
//   //         </div>
//   //       );
//   //     case "View Location":
//   //       return (
//   //         <div className="mb-8">
//   //           <LocationCard
//   //             coordinates={`${locationLat}, ${locationLng}`}
//   //             onOptionsClick={() => { }}
//   //           />
//   //         </div>
//   //       );
//   //     case "View Process":
//   //       return (
//   //         <div className="mb-8">
//   //           <ProgressBar
//   //             progress={processProgress}
//   //             onOptionsClick={() => { }}
//   //           />
//   //         </div>
//   //       );
//   //     case "View Query":
//   //       return (
//   //         <div className="mb-8">
//   //           <MessageCard onOptionsClick={() => { }}>
//   //             <h3 className="font-bold mb-2">Query</h3>
//   //             <p className="text-sm leading-relaxed">
//   //               {queryName}
//   //               <br />
//   //               {queryDescription}
//   //             </p>
//   //           </MessageCard>
//   //         </div>
//   //       );
//   //     default:
//   //       return (
//   //         <div className="mb-8">
//   //           <p>Select a view from the menu</p>
//   //         </div>
//   //       );
//   //   }
//   // };
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
//                           <h3 className="font-bold mb-2">استعلام</h3>
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
//                     <h3 className="font-bold mb-2">استعلام</h3>
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
  
//   return (
//     <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick}>
//       {renderContent()}
//     </MainLayout>
//   );
// };
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
// import { FC, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
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
//   // Basic state variables
//   const [messageText, setMessageText] = useState('');
//   const [currentView, setCurrentView] = useState('View Message');
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   // Message states
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   // Type-specific message states
//   const [locationMessages, setLocationMessages] = useState<Message[]>([]);
//   const [processMessages, setProcessMessages] = useState<Message[]>([]);
//   const [queryMessages, setQueryMessages] = useState<Message[]>([]);
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [loadingProcess, setLoadingProcess] = useState(false);
//   const [loadingQuery, setLoadingQuery] = useState(false);
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

//   // Fetch all messages
//   const fetchMessages = async (broadcastId: string, token: string) => {
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
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       console.error('Error fetching messages:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch messages by type
//   const fetchMessagesByType = async (broadcastId: string, token: string, type: string) => {
//     const setLoadingState = (state: boolean) => {
//       switch (type) {
//         case 'location': setLoadingLocation(state); break;
//         case 'process': setLoadingProcess(state); break;
//         case 'query': setLoadingQuery(state); break;
//       }
//     };
    
//     const setErrorState = (err: string | null) => {
//       switch (type) {
//         case 'location': setErrorLocation(err); break;
//         case 'process': setErrorProcess(err); break;
//         case 'query': setErrorQuery(err); break;
//       }
//     };
    
//     const setMessagesState = (msgs: Message[]) => {
//       switch (type) {
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
//     } catch (err) {
//       setErrorState(err instanceof Error ? err.message : 'Unknown error occurred');
//       console.error(`Error fetching ${type} messages:`, err);
//     } finally {
//       setLoadingState(false);
//     }
//   };

//   // Shorthand functions for fetching specific message types
//   const fetchLocationMessages = (broadcastId: string, token: string) => fetchMessagesByType(broadcastId, token, 'location');
//   const fetchProcessMessages = (broadcastId: string, token: string) => fetchMessagesByType(broadcastId, token, 'process');
//   const fetchQueryMessages = (broadcastId: string, token: string) => fetchMessagesByType(broadcastId, token, 'query');

//   // Effect for fetching messages based on current view
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const broadcastId = localStorage.getItem('selectedBroadcastId');
    
//     if (!token || !broadcastId) {
//       return;
//     }
    
//     // Fetch the appropriate messages based on the current view
//     switch (currentView) {
//       case 'View Message':
//         fetchMessages(broadcastId, token);
//         break;
//       case 'View Location':
//         fetchLocationMessages(broadcastId, token);
//         break;
//       case 'View Process':
//         fetchProcessMessages(broadcastId, token);
//         break;
//       case 'View Query':
//         fetchQueryMessages(broadcastId, token);
//         break;
//     }
//   }, [currentView]);

//   // Validate inputs for query form
//   const validateInputs = (token: string, queryName: string, queryDescription: string) => {
//     if (!token) {
//       toast({
//         title: "Error",
//         description: "No authentication token found. Please log in.",
//         variant: "destructive"
//       });
//       return false;
//     }

//     if (!queryName.trim() || !queryDescription.trim()) {
//       toast({
//         title: "Error",
//         description: "Please fill in both fields",
//         variant: "destructive"
//       });
//       return false;
//     }

//     return true;
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
//       // Refresh messages after sending
//       const broadcastId = localStorage.getItem('selectedBroadcastId');
//       if (broadcastId) {
//         fetchMessages(broadcastId, token);
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
//     toast({
//       title: "Success",
//       description: "Process sent successfully!"
//     });
//     setShowSendProcessModal(false);
//   };

//   // Handle pasting coordinates
//   const handlePasteCoordinates = async () => {
//     try {
//       const text = await navigator.clipboard.readText();
//       const match = text.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
//       if (match) {
//         setLocationLat(match[1]);
//         setLocationLng(match[2]);
//         toast({ title: "تم لصق الإحداثيات!" });
//       } else {
//         toast({
//           title: "تنسيق غير صالح",
//           description: "تأكد من نسخ الإحداثيات بالشكل: 40.7128, -74.0060"
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "خطأ",
//         description: "لا يمكن الوصول إلى الحافظة"
//       });
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
//       case "View Location":
//       case "View Process":
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
//                           <h3 className="font-bold mb-2">استعلام</h3>
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
//                     <h3 className="font-bold mb-2">استعلام</h3>
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
//       {renderContent()}
      
//       {selectedUserRole === 'transmitter' && (
//         <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
//           {/* Message input */}
//           <input
//             type="text"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             className="p-3 border border-gray-300 rounded-l-md w-full md:w-[70%] lg:w-[80%]"
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
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout';
import { useToast } from '../../hooks/use-toast';
import { MapPin } from 'lucide-react';
import { MessageCard } from '../../components/MessageCard';
import { LocationCard } from '../../components/LocationCard';
import { ProgressBar } from '../../components/ProgressBar';
import { SendOptionsDropdown } from '../../components/CustomDropdownMenu';
import { AddAgentModal } from '../../components/modals/AddAgentModal';
import { ViewAgentsModal } from '../../components/modals/ViewAgentsModal';
import { AddQueryModal } from '../../components/modals/AddQueryModal';
import { SendProcessModal } from '../../components/modals/SendProcessModal';
import { SendLocationModal } from '../../components/modals/SendLocationModal';
import { useMessageApi } from '../../hooks/use-message-api';

// Mock agents data
const mockAgents = [
  { id: 1, name: "أحمد محمد", email: "ahmed.mohamed@example.com", status: "Active" },
  { id: 2, name: "سارة علي", email: "sara.ali@example.com", status: "Inactive" },
  { id: 3, name: "عمر حسن", email: "omar.hassan@example.com", status: "Active" }
];

// Message type interface
interface Message {
  id: string;
  type: string;
  content: string;
  createdAt: string;
}

export const MessagesPage: FC = () => {
  // Track the current broadcast ID
  const [currentBroadcastId, setCurrentBroadcastId] = useState<string | null>(
    localStorage.getItem("selectedBroadcastId")
  );

  // Basic state variables
  const [messageText, setMessageText] = useState('');
  const [currentView, setCurrentView] = useState('View Message');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Message states
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Type-specific message states
  const [textMessages, setTextMessages] = useState<Message[]>([]);
  const [locationMessages, setLocationMessages] = useState<Message[]>([]);
  const [processMessages, setProcessMessages] = useState<Message[]>([]);
  const [queryMessages, setQueryMessages] = useState<Message[]>([]);
  const [loadingText, setTextLocation] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [errorLocation, setErrorLocation] = useState<string | null>(null);
  const [errorProcess, setErrorProcess] = useState<string | null>(null);
  const [errorQuery, setErrorQuery] = useState<string | null>(null);

  // Modal states
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
  const [showAddQueryModal, setShowAddQueryModal] = useState(false);
  const [showSendProcessModal, setShowSendProcessModal] = useState(false);
  const [showSendLocationModal, setShowSendLocationModal] = useState(false);

  // Form states
  const [newAgentEmail, setNewAgentEmail] = useState('');
  const [queryName, setQueryName] = useState('');
  const [queryDescription, setQueryDescription] = useState('');
  const [processProgress, setProcessProgress] = useState(0);
  const [processName, setProcessName] = useState('');
  const [locationContent, setLocationContent] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  
  // Custom hooks
  const { sendTextMessage } = useMessageApi();

  // Check for broadcast ID changes
  useEffect(() => {
    const checkBroadcastId = () => {
      const storedBroadcastId = localStorage.getItem("selectedBroadcastId");
      if (storedBroadcastId !== currentBroadcastId) {
        setCurrentBroadcastId(storedBroadcastId);
      }
    };

    // Check immediately
    checkBroadcastId();

    // Set up interval to check for changes
    const intervalId = setInterval(checkBroadcastId, 1000);

    return () => clearInterval(intervalId);
  }, [currentBroadcastId]);

  // Fetch all messages for all types when broadcast changes
  useEffect(() => {
    if (!currentBroadcastId) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    // Fetch all message types
    fetchMessages(currentBroadcastId, token);
    fetchTextMessages(currentBroadcastId, token);
    fetchLocationMessages(currentBroadcastId, token);
    fetchProcessMessages(currentBroadcastId, token);
    fetchQueryMessages(currentBroadcastId, token);
    
    // Log for debugging
    console.log(`Fetching all message types for broadcast ID: ${currentBroadcastId}`);
  }, [currentBroadcastId]);

  // Fetch specific message type when view changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!currentBroadcastId || !token) return;
    
    // Refresh only the current view type to avoid unnecessary API calls
    switch (currentView) {
      case 'View Message':
        fetchMessages(currentBroadcastId, token);
        break;
      case 'View Text':
        fetchTextMessages(currentBroadcastId, token);
        break;
      case 'View Location':
        fetchLocationMessages(currentBroadcastId, token);
        break;
      case 'View Process':
        fetchProcessMessages(currentBroadcastId, token);
        break;
      case 'View Query':
        fetchQueryMessages(currentBroadcastId, token);
        break;
    }
  }, [currentView]);

  // Fetch all messages
  const fetchMessages = async (broadcastId: string, token: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error fetching messages: ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(data.messages || []);
      console.log('Fetched general messages:', data.messages?.length || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };


  // Fetch messages by type
  const fetchMessagesByType = async (broadcastId: string, token: string, type: string) => {
    const setLoadingState = (state: boolean) => {
      switch (type) {
        // case 'text': setLoadingText(state); break;
        case 'location': setLoadingLocation(state); break;
        case 'process': setLoadingProcess(state); break;
        case 'query': setLoadingQuery(state); break;
      }
    };
    
    const setErrorState = (err: string | null) => {
      switch (type) {
        case 'text': setErrorText(err); break;
        case 'location': setErrorLocation(err); break;
        case 'process': setErrorProcess(err); break;
        case 'query': setErrorQuery(err); break;
      }
    };
    
    const setMessagesState = (msgs: Message[]) => {
      switch (type) {
        case 'text': setTextMessages(msgs); break;
        case 'location': setLocationMessages(msgs); break;
        case 'process': setProcessMessages(msgs); break;
        case 'query': setQueryMessages(msgs); break;
      }
    };
    
    setLoadingState(true);
    setErrorState(null);
    
    try {
      const response = await fetch(
        `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=${type}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error fetching ${type} messages: ${response.status}`);
      }
      
      const data = await response.json();
      setMessagesState(data.messages || []);
      console.log(`Fetched ${type} messages:`, data.messages?.length || 0);
    } catch (err) {
      setErrorState(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error(`Error fetching ${type} messages:`, err);
    } finally {
      setLoadingState(false);
    }
  };

  // Shorthand functions for fetching specific message types
  const fetchTextMessages = (broadcastId: string, token: string) => fetchMessagesByType(broadcastId, token, 'text');
  const fetchLocationMessages = (broadcastId: string, token: string) => fetchMessagesByType(broadcastId, token, 'location');
  const fetchProcessMessages = (broadcastId: string, token: string) => fetchMessagesByType(broadcastId, token, 'process');
  const fetchQueryMessages = (broadcastId: string, token: string) => fetchMessagesByType(broadcastId, token, 'query');

  // Refresh all messages
  const refreshAllMessages = () => {
    const token = localStorage.getItem('token');
    if (!currentBroadcastId || !token) return;
    
    fetchMessages(currentBroadcastId, token);
    fetchTextMessages(currentBroadcastId, token);
    fetchLocationMessages(currentBroadcastId, token);
    fetchProcessMessages(currentBroadcastId, token);
    fetchQueryMessages(currentBroadcastId, token);
    
    toast({
      title: "Refreshed",
      description: "All messages have been refreshed"
    });
  };

  // Handle sending text message
  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Error",
        description: "Please login first",
        variant: "destructive"
      });
      return;
    }

    if (!messageText.trim()) {
      toast({
        title: "Error", 
        description: "Message cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await sendTextMessage(messageText, token);
    if (success) {
      setMessageText('');
      // Refresh current view type after sending
      if (currentBroadcastId) {
        fetchMessages(currentBroadcastId, token);
      }
      toast({
        title: "Success",
        description: "Message sent successfully"
      });
    }
    setIsLoading(false);
  };

  // Handle adding agent
  const handleAddAgent = () => {
    if (!newAgentEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `Agent invitation sent to ${newAgentEmail}`
    });

    setNewAgentEmail('');
    setShowAddAgentModal(false);
  };

  // Handle sending process
  const handleSendProcess = () => {
    // Implementation for sending process message would go here
    toast({
      title: "Success",
      description: "Process sent successfully!"
    });
    setShowSendProcessModal(false);
    
    // Refresh process messages
    const token = localStorage.getItem('token');
    if (currentBroadcastId && token) {
      fetchProcessMessages(currentBroadcastId, token);
    }
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
      case 'Send Process':
        setShowSendProcessModal(true);
        break;
      case 'Send Query':
        setShowAddQueryModal(true);
        break;
      case 'Send Location':
        setShowSendLocationModal(true);
        break;
      case 'Refresh Messages':
        refreshAllMessages();
        break;
      default:
        toast({
          description: `${action} action selected`
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
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </MessageCard>
                      );
                    case "location":
                      return (
                        <LocationCard key={index} coordinates={msg.content} onOptionsClick={() => {}} />
                      );
                    case "process":
                      return (
                        <ProgressBar key={index} progress={parseInt(msg.content)} onOptionsClick={() => {}} />
                      );
                    case "query":
                      return (
                        <MessageCard key={index} onOptionsClick={() => {}}>
                          <h3 className="font-bold mb-2">Query</h3>
                          <p className="text-sm leading-relaxed">
                            {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
                          </p>
                        </MessageCard>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No messages found.</p>
            )}
          </div>
        );
      
      case "View Location":
        return (
          <div className="mb-8">
            {errorLocation && (
              <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error: {errorLocation}
              </div>
            )}
            {loadingLocation ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">Loading location messages...</span>
              </div>
            ) : locationMessages.length > 0 ? (
              <div className="space-y-4">
                {locationMessages.map((msg, index) => (
                  <LocationCard key={index} coordinates={msg.content} onOptionsClick={() => {}} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No location messages found.</p>
            )}
          </div>
        );
      
      case "View Process":
        return (
          <div className="mb-8">
            {errorProcess && (
              <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error: {errorProcess}
              </div>
            )}
            {loadingProcess ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">Loading process messages...</span>
              </div>
            ) : processMessages.length > 0 ? (
              <div className="space-y-4">
                {processMessages.map((msg, index) => (
                  <ProgressBar key={index} progress={parseInt(msg.content)} onOptionsClick={() => {}} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No process messages found.</p>
            )}
          </div>
        );
      
      case "View Query":
        return (
          <div className="mb-8">
            {errorQuery && (
              <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error: {errorQuery}
              </div>
            )}
            {loadingQuery ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">Loading query messages...</span>
              </div>
            ) : queryMessages.length > 0 ? (
              <div className="space-y-4">
                {queryMessages.map((msg, index) => (
                  <MessageCard key={index} onOptionsClick={() => {}}>
                    <h3 className="font-bold mb-2">Query</h3>
                    <p className="text-sm leading-relaxed">
                      {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
                    </p>
                  </MessageCard>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No query messages found.</p>
            )}
          </div>
        );
      
      default:
        return (
          <div className="mb-8">
            <p className="text-center text-gray-500">Select a view from the menu</p>
          </div>
        );
    }
  };
  
  const selectedUserRole = localStorage.getItem('selectedUserRole');

  return (
    <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick}>
      {/* Current broadcast indicator */}
      {currentBroadcastId && (
        <div className="bg-blue-50 p-2 mb-4 rounded border border-blue-200 flex justify-between">
          <span className="text-sm text-blue-700">
            Current Broadcast ID: {currentBroadcastId}
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
      
      {selectedUserRole === 'transmitter' && (
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
            className={`px-5 py-3 ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md transition-colors`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      )}

      {selectedUserRole === 'agent' && (
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
          onSubmit={handleSendProcess}
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