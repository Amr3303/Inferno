// import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MainLayout } from '../../layouts/MainLayout';
// import { MessageCard } from '../../components/MessageCard';
// import { LocationCard } from '../../components/LocationCard';
// import { ProgressBar } from '../../components/ProgressBar';
// import { MapPin, X, Mail, User } from 'lucide-react';
// import { FileText } from 'lucide-react'; // instead of DocumentText
// import { useToast } from '../../hooks/use-toast';
// import { DropdownMenu } from '../../components/DropdownMenu';
// import { SendOptionsDropdown } from '../../components/CustomDropdownMenu';

// // Mock agent data
// const mockAgents = [
//   { id: 1, name: "Ahmed Mohamed", email: "ahmed.mohamed@example.com", status: "Active" },
//   { id: 2, name: "Sara Ali", email: "sara.ali@example.com", status: "Inactive" },
//   { id: 3, name: "Omar Hassan", email: "omar.hassan@example.com", status: "Active" }
// ];

// export const MessagesPage: FC = () => {
//   const [messageText, setMessageText] = useState('');
//   const [currentView, setCurrentView] = useState('View Message');
//   const [showAddAgentModal, setShowAddAgentModal] = useState(false);
//   const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
//   const [showAddProcessModal, setShowAddProcessModal] = useState(false); // Add state for Add Process modal
//   const [newAgentEmail, setNewAgentEmail] = useState('');
//   const [newProcessName, setNewProcessName] = useState(''); // Process name state
//   const [newProcessDescription, setNewProcessDescription] = useState(''); // Process description state
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSendMessage = () => {
//     if (!messageText.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter a message",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "Success",
//       description: "Message sent successfully!"
//     });

//     setMessageText('');
//   };

//   const handleShareLocation = () => {
//     toast({
//       description: "Location sharing would open here"
//     });
//   };

//   const handleOpenMessageOptions = () => {
//     toast({
//       description: "Message options would open here"
//     });
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

//   const handleAddProcess = () => {
//     if (!newProcessName.trim() || !newProcessDescription.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter both process name and description",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "Success",
//       description: `Process "${newProcessName}" added successfully`
//     });

//     setNewProcessName('');
//     setNewProcessDescription('');
//     setShowAddProcessModal(false);
//   };

//   const handleMenuItemClick = (action: string) => {
//     // Handle menu actions
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
//           <div className="mb-8 space-y-6">
//             <MessageCard onOptionsClick={handleOpenMessageOptions}>
//               <p className="text-sm leading-relaxed">
//                 {"Text Text Text"}
//               </p>
//             </MessageCard>

//             <LocationCard
//               coordinates="30.0768163914401931.2847391229373"
//               onOptionsClick={handleOpenMessageOptions}
//             />

//             <ProgressBar
//               progress={25}
//               onOptionsClick={handleOpenMessageOptions}
//             />
//           </div>
//         );
      
//       case "View Location":
//         return (
//           <div className="mb-8">
//             <LocationCard 
//               coordinates="30.0768163914401931.2847391229373"
//               onOptionsClick={() => {}}
//             />
//           </div>
//         );
      
//       case "View Process":
//         return (
//           <div className="mb-8">
//             <ProgressBar 
//               progress={25} 
//               onOptionsClick={() => {}}
//             />
//           </div>
//         );
      
//       case "View Query":
//         return (
//           <div className="mb-8">
//             <MessageCard onOptionsClick={() => {}} >
//               <h3 className="font-bold mb-2">Query</h3>
//               <p>
//                 ............................................................................... 
//                 ............................................................................... 
//                 ............................................................................... 
//               </p>
//             </MessageCard>
//           </div>
//         );
      
//       default:
//         return (
//           <div className="mb-8">
//             <p>Select a view from the menu</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick} >
//       {renderContent()}

//       <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
//         {/* Input container */}
//         <input
//           type="text"
//           value={messageText}
//           onChange={(e) => setMessageText(e.target.value)}
//           className="p-3 border border-gray-300 rounded-l-md w-[1050px]"  // عرض ثابت
//           placeholder="Create"
//         />
        
//         <button
//           onClick={handleShareLocation}
//           className="px-3 py-2 border border-gray-300 rounded-md"
//         >
//           <MapPin size={20} />
//         </button>
        
//         <SendOptionsDropdown onItemClick={handleMenuItemClick} />

//         {/* Send Message button */}
//         <button
//           onClick={handleSendMessage}
//           className="px-5 py-3 bg-blue-500 text-white rounded-md"
//         >
//           Send Message
//         </button>
//       </div>

//       {/* Add Agent Modal */}
//       {showAddAgentModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Agent</h2>
//               <button 
//                 onClick={() => setShowAddAgentModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail size={18} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   value={newAgentEmail}
//                   onChange={(e) => setNewAgentEmail(e.target.value)}
//                   className="pl-10 p-3 border border-gray-300 rounded-md w-full"
//                   placeholder="agent@example.com"
//                 />
//               </div>
//             </div>
            
//             <div className="flex justify-end">
//               <button
//                 onClick={handleAddAgent}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Add Agent
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Process Modal */}
//       {showAddProcessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Process</h2>
//               <button
//                 onClick={() => setShowAddProcessModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Process Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FileText size={18} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   value={newProcessName}
//                   onChange={(e) => setNewProcessName(e.target.value)}
//                   className="pl-10 p-3 border border-gray-300 rounded-md w-full"
//                   placeholder="Process Name"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Process Description
//               </label>
//               <textarea
//                 value={newProcessDescription}
//                 onChange={(e) => setNewProcessDescription(e.target.value)}
//                 className="pl-10 p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="Describe the process..."
//               />
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={handleAddProcess}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Add Process
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </MainLayout>
//   );
// };

// import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MainLayout } from '../../layouts/MainLayout';
// import { MessageCard } from '../../components/MessageCard';
// import { LocationCard } from '../../components/LocationCard';
// import { ProgressBar } from '../../components/ProgressBar';
// import { MapPin, MoreHorizontal } from 'lucide-react';
// import { useToast } from '../../hooks/use-toast';

// export const MessagesPage: FC = () => {
//   const [messageText, setMessageText] = useState('');
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSendMessage = () => {
//     if (!messageText.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter a message",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "Success",
//       description: "Message sent successfully!"
//     });

//     setMessageText('');
//   };

//   const handleShareLocation = () => {
//     toast({
//       description: "Location sharing would open here"
//     });
//   };

//   const handleOpenMessageOptions = () => {
//     toast({
//       description: "Message options would open here"
//     });
//   };

//   return (
//     <MainLayout showSidebar title="Broadcast messages">
//       <div className="mb-8">
//         <MessageCard onOptionsClick={handleOpenMessageOptions}>
//           <p>
//             TextTextTextTextTextTextTextTextTextTextTextTextTextText
//             TextTextTextTextTextTextTextTextTextTextTextTextTextText
//             TextTextTextTextTextTextTextTextTextTextTextTextTextText
//             TextTextTextTextTextTextTextTextTextTextTextTextTextText
//             TextTextTextTextTextTextTextTextTextTextTextTextTextText
//             TextTextTextTextTextTextTextTextTextTextTextTextTextText
//           </p>
//         </MessageCard>

//         <LocationCard 
//           coordinates="30.0768163914401931.2847391229373"
//           onOptionsClick={handleOpenMessageOptions}
//         />

//         <ProgressBar 
//           progress={25} 
//           onOptionsClick={handleOpenMessageOptions}
//         />
//       </div>

//       <div className="fixed bottom-4 left-4 right-4 flex">
//         <div className="flex-1 flex mr-2">
//           <input
//             type="text"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             className="flex-1 p-2 border border-gray-300 rounded-l-md"
//             placeholder="Create"
//           />
//           <button 
//             onClick={handleShareLocation}
//             className="px-3 py-2 border-t border-r border-b border-gray-300"
//           >
//             <MapPin size={20} />
//           </button>
//           <button 
//             className="px-3 py-2 border-t border-r border-b border-gray-300 rounded-r-md"
//           >
//             <MoreHorizontal size={20} />
//           </button>
//         </div>

//         <button 
//           onClick={handleSendMessage}
//           className="px-4 py-2 bg-broadcast-blue text-white rounded-md"
//         >
//           Send Message
//         </button>
//       </div>
//     </MainLayout>
//   );
// };

// import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MainLayout } from '../../layouts/MainLayout';
// import { MessageCard } from '../../components/MessageCard';
// import { LocationCard } from '../../components/LocationCard';
// import { ProgressBar } from '../../components/ProgressBar';
// import { MapPin, MoreHorizontal } from 'lucide-react';
// import { useToast } from '../../hooks/use-toast';

// export const MessagesPage: FC = () => {
//   const [messageText, setMessageText] = useState('');
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSendMessage = () => {
//     if (!messageText.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter a message",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "Success",
//       description: "Message sent successfully!"
//     });

//     setMessageText('');
//   };

//   const handleShareLocation = () => {
//     toast({
//       description: "Location sharing would open here"
//     });
//   };

//   const handleOpenMessageOptions = () => {
//     toast({
//       description: "Message options would open here"
//     });
//   };

//   return (
//     <MainLayout showSidebar title="Broadcast messages">
//       <div className="mb-8 space-y-6">
//         <MessageCard onOptionsClick={handleOpenMessageOptions}>
//           <p className="text-sm leading-relaxed">
//             {"Text Text Text"}
//           </p>
//         </MessageCard>

//         <LocationCard
//           coordinates="30.0768163914401931.2847391229373"
//           onOptionsClick={handleOpenMessageOptions}
//         />

//         <ProgressBar
//           progress={25}
//           onOptionsClick={handleOpenMessageOptions}
//         />
//       </div>

//       <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
//         {/* الحاوية التي تحتوي على حقل الإدخال والأزرار */}
//         <input
//           type="text"
//           value={messageText}
//           onChange={(e) => setMessageText(e.target.value)}
//           className="p-3 border border-gray-300 rounded-l-md w-[1050px]"  // عرض ثابت
//           placeholder="Create"
//         />
//         <button
//           onClick={handleShareLocation}
//           className="px-3 py-2 border border-gray-300 rounded-md"
//         >
//           <MapPin size={20} />
//         </button>
//         <button
//           className="px-3 py-2 border border-gray-300 rounded-md"
//         >
//           <MoreHorizontal size={20} />
//         </button>

//         {/* زر Send Message */}
//         <button
//           onClick={handleSendMessage}
//           className="px-5 py-3 bg-broadcast-blue text-white rounded-md"
//         >
//           Send Message
//         </button>
//       </div>

//     </MainLayout>
//   );
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
// import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MainLayout } from '../../layouts/MainLayout';
// import { MessageCard } from '../../components/MessageCard';
// import { LocationCard } from '../../components/LocationCard';
// import { ProgressBar } from '../../components/ProgressBar';
// import { MapPin, X, Mail, User } from 'lucide-react';
// import { useToast } from '../../hooks/use-toast';
// import { DropdownMenu } from '../../components/DropdownMenu';
// import { SendOptionsDropdown } from '../../components/CustomDropdownMenu';


// // Mock agent data
// const mockAgents = [
//   { id: 1, name: "Ahmed Mohamed", email: "ahmed.mohamed@example.com", status: "Active" },
//   { id: 2, name: "Sara Ali", email: "sara.ali@example.com", status: "Inactive" },
//   { id: 3, name: "Omar Hassan", email: "omar.hassan@example.com", status: "Active" }
// ];

// export const MessagesPage: FC = () => {
//   const [messageText, setMessageText] = useState('');
//   const [currentView, setCurrentView] = useState('View Message');
//   const [showAddAgentModal, setShowAddAgentModal] = useState(false);
//   const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
//   const [newAgentEmail, setNewAgentEmail] = useState('');
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [showAddQueryModal, setShowAddQueryModal] = useState(false);
//   const [queryName, setQueryName] = useState('');
//   const [queryDescription, setQueryDescription] = useState('');
//   const [showSendProcessModal, setShowSendProcessModal] = useState(false);
//   const [processProgress, setProcessProgress] = useState(0);
//   const [processName, setProcessName] = useState('');
//   const [showSendLocationModal, setShowSendLocationModal] = useState(false);
//   const [locationContent, setLocationContent] = useState('');
//   const [locationLat, setLocationLat] = useState('');
//   const [locationLng, setLocationLng] = useState('');



//   const handleSendMessage = () => {
//     if (!messageText.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter a message",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "Success",
//       description: "Message sent successfully!"
//     });

//     setMessageText('');
//   };

//   const handleShareLocation = () => {
//     toast({
//       description: "Location sharing would open here"
//     });
//   };

//   const handleOpenMessageOptions = () => {
//     toast({
//       description: "Message options would open here"
//     });
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

//   const handleMenuItemClick = (action: string) => {
//     // Handle menu actions
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
//       break;
//       case 'Send Query':
//         setShowAddQueryModal(true);
//       break;
//       default:
//         toast({
//           description: `${action} action selected`
//         });
//     }
//   };
//   const handleSendQuery = () => {
//     if (!queryName.trim() || !queryDescription.trim()) {
//       toast({
//         title: "Error",
//         description: "Please fill in both fields",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "Success",
//       description: "Query added successfully!"
//     });

//     setQueryName('');
//     setQueryDescription('');
//     setShowAddQueryModal(false);
//   };

//   // // Render content based on current view
//   const renderContent = () => {
//     switch (currentView) {
//       case "View Message":
//         return (
//           <div className="mb-8 space-y-6">
//             <MessageCard onOptionsClick={handleOpenMessageOptions}>
//               <p className="text-sm leading-relaxed">
//                 {"Text Text Text"}
//               </p>
//             </MessageCard>

//             <LocationCard
//               coordinates="30.0768163914401931.2847391229373"
//               onOptionsClick={handleOpenMessageOptions}
//             />

//             <ProgressBar
//               progress={25}
//               onOptionsClick={handleOpenMessageOptions}
//             />
//           </div>
//         );
      
//       case "View Location":
//         return (
//           <div className="mb-8">
//             <LocationCard 
//               coordinates="30.0768163914401931.2847391229373"
//               onOptionsClick={() => {}}
//             />
//           </div>
//         );
      
//       case "View Process":
//         return (
//           <div className="mb-8">
//             <ProgressBar 
//               progress={25} 
//               onOptionsClick={() => {}}
//             />
//           </div>
//         );
      
//       case "View Query":
//         return (
//           <div className="mb-8">
//             <MessageCard onOptionsClick={() => {}}>
//               <h3 className="font-bold mb-2">Query</h3>
//               <p>
//                 ...............................................................................
//                 ...............................................................................
//                 ...............................................................................
//               </p>
//             </MessageCard>
//           </div>
//         );
      
//       default:
//         return (
//           <div className="mb-8">
//             <p>Select a view from the menu</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick} >
//       {renderContent()}

//       <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
//         {/* Input container */}
//         <input
//           type="text"
//           value={messageText}
//           onChange={(e) => setMessageText(e.target.value)}
//           className="p-3 border border-gray-300 rounded-l-md w-[1000px]"  // عرض ثابت
//           placeholder="Create"
//         />
        
//         <button
//           onClick={() => setShowSendLocationModal(true)}
//           className="px-3 py-2 border border-gray-300 rounded-md"
//         >
//           <MapPin size={20} />
//         </button>
        
//         {/* Using the separate DropdownMenu component */}
//         {/* <DropdownMenu onItemClick={handleMenuItemClick}    isMenuBelow={false} /> */}
//         <SendOptionsDropdown onItemClick={handleMenuItemClick} />

//         {/* Send Message button */}
//         <button
//           onClick={handleSendMessage}
//           className="px-5 py-3 bg-blue-500 text-white rounded-md"
//         >
//           Send Message
//         </button>
//       </div>

//       {/* Add Agent Modal */}
//       {showAddAgentModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Agent</h2>
//               <button 
//                 onClick={() => setShowAddAgentModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail size={18} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   value={newAgentEmail}
//                   onChange={(e) => setNewAgentEmail(e.target.value)}
//                   className="pl-10 p-3 border border-gray-300 rounded-md w-full"
//                   placeholder="agent@example.com"
//                 />
//               </div>
//             </div>
            
//             <div className="flex justify-end">
//               <button
//                 onClick={handleAddAgent}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Add Agent
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Add Agent Modal */}
//       {showAddQueryModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Add Query</h2>
//         <button 
//           onClick={() => setShowAddQueryModal(false)}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Query Name
//         </label>
//         <div className="relative">
//           <input
//             type="text"
//             value={queryName}
//             onChange={(e) => setQueryName(e.target.value)}
//             className="p-3 border border-gray-300 rounded-md w-full"
//             placeholder="Enter query name"
//           />
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Query Description
//         </label>
//         <div className="relative">
//           <textarea
//             value={queryDescription}
//             onChange={(e) => setQueryDescription(e.target.value)}
//             className="p-3 border border-gray-300 rounded-md w-full"
//             placeholder="Enter query description"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button
//           onClick={handleSendQuery}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Add Query
//         </button>
//       </div>
//     </div>
//   </div>
// )}
// {showSendProcessModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Send Process</h2>
//         <button 
//           onClick={() => setShowSendProcessModal(false)}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       {/* Process Name */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Process Name
//         </label>
//         <input
//           type="text"
//           value={processName}
//           onChange={(e) => setProcessName(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md w-full"
//           placeholder="Enter process name"
//         />
//       </div>

//       {/* Process Progress */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Progress %
//         </label>
//         <input
//           type="number"
//           min="0"
//           max="100"
//           value={processProgress}
//           onChange={(e) => setProcessProgress(parseInt(e.target.value) || 0)}
//           className="p-3 border border-gray-300 rounded-md w-full"
//           placeholder="Enter progress percentage"
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           onClick={() => {
//             toast({
//               title: "Success",
//               description: "Process sent successfully!"
//             });
//             setShowSendProcessModal(false);
//           }}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   </div>
// )}

// {showSendLocationModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Send Location</h2>
//         <button 
//           onClick={() => setShowSendLocationModal(false)}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       {/* Location Content */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Description
//         </label>
//         <input
//           type="text"
//           value={locationContent}
//           onChange={(e) => setLocationContent(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md w-full"
//           placeholder="e.g. Emergency location"
//         />
//       </div>

//       {/* Latitude */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Latitude
//         </label>
//         <input
//           type="number"
//           value={locationLat}
//           onChange={(e) => setLocationLat(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md w-full"
//           placeholder="e.g. 40.7128"
//         />
//       </div>

//       {/* Longitude */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Longitude
//         </label>
//         <input
//           type="number"
//           value={locationLng}
//           onChange={(e) => setLocationLng(e.target.value)}
//           className="p-3 border border-gray-300 rounded-md w-full"
//           placeholder="e.g. -74.0060"
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           onClick={() => {
//             toast({
//               title: "Success",
//               description: "Location sent successfully!"
//             });
//             setShowSendLocationModal(false);
//           }}
//           className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//         >
//           Send
//         </button>
//       </div>
//       {/* Google Maps Picker */}
// <div className="mb-4">
//   <button
//     onClick={() => window.open("https://www.google.com/maps", "_blank")}
//     className="text-blue-600 hover:underline text-sm"
//   >
//     🌍 Pick from Google Maps
//   </button>
//   <p className="text-xs text-gray-500 mt-1">
//     Right click any point on the map, choose <strong>"What's here?"</strong>, then copy the coordinates.
//   </p>
// </div>
// {/* Paste from Clipboard */}
// <div className="flex justify-end mb-4">
//   <button
//     onClick={async () => {
//       const text = await navigator.clipboard.readText();
//       const match = text.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
//       if (match) {
//         setLocationLat(match[1]);
//         setLocationLng(match[2]);
//         toast({ title: "Coordinates pasted!" });
//       } else {
//         toast({ title: "Invalid format", description: "Make sure you copied coordinates like: 40.7128, -74.0060" });
//       }
//     }}
//     className="text-sm text-green-600 hover:underline"
//   >
//     📋 Paste Coordinates
//   </button>
// </div>

//     </div>
//   </div>
// )}


//       {/* View Agents Modal */}
//       {showViewAgentsModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Agents</h2>
//               <button 
//                 onClick={() => setShowViewAgentsModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {mockAgents.map((agent) => (
//                     <tr key={agent.id}>
//                       <td className="py-4 px-4 border-b border-gray-200">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
//                             <User size={20} className="text-gray-500" />
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{agent.name}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-500">
//                         {agent.email}
//                       </td>
//                       <td className="py-4 px-4 border-b border-gray-200">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           {agent.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </MainLayout>
//   );
// };
//------------------------------------------------------------------------------------------------------
// import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MainLayout } from '../../layouts/MainLayout';
// import { MessageCard } from '../../components/MessageCard';
// import { LocationCard } from '../../components/LocationCard';
// import { ProgressBar } from '../../components/ProgressBar';
// import { MapPin, X, Mail, User } from 'lucide-react';
// import { useToast } from '../../hooks/use-toast';
// import { DropdownMenu } from '../../components/DropdownMenu';
// import { SendOptionsDropdown } from '../../components/CustomDropdownMenu';

// // Mock agent data
// const mockAgents = [
//   { id: 1, name: "Ahmed Mohamed", email: "ahmed.mohamed@example.com", status: "Active" },
//   { id: 2, name: "Sara Ali", email: "sara.ali@example.com", status: "Inactive" },
//   { id: 3, name: "Omar Hassan", email: "omar.hassan@example.com", status: "Active" }
// ];

// // API endpoints and constants
// const BROADCAST_ID = "67f86af3b4f8989bb8402f01";
// const API_ENDPOINT = `api/v1/broadcasts/${BROADCAST_ID}/messages`;

// export const MessagesPage: FC = () => {
//   const [messageText, setMessageText] = useState('');
//   const [currentView, setCurrentView] = useState('View Message');
//   const [showAddAgentModal, setShowAddAgentModal] = useState(false);
//   const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
//   const [newAgentEmail, setNewAgentEmail] = useState('');
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [showAddQueryModal, setShowAddQueryModal] = useState(false);
//   const [queryName, setQueryName] = useState('');
//   const [queryDescription, setQueryDescription] = useState('');
//   const [showSendProcessModal, setShowSendProcessModal] = useState(false);
//   const [processProgress, setProcessProgress] = useState(0);
//   const [processName, setProcessName] = useState('');
//   const [showSendLocationModal, setShowSendLocationModal] = useState(false);
//   const [locationContent, setLocationContent] = useState('');
//   const [locationLat, setLocationLat] = useState('');
//   const [locationLng, setLocationLng] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendMessage = async () => {
//     if (!messageText.trim()) {
//       toast({
//         title: "Error",
//         description: "Please enter a message",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: "text",
//           content: messageText
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast({
//           title: "Success",
//           description: "Message sent successfully!"
//         });
//         setMessageText('');
//       } else {
//         toast({
//           title: "Error",
//           description: data.message || "Failed to send message",
//           variant: "destructive"
//         });
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast({
//         title: "Error",
//         description: "Failed to connect to the server",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleShareLocation = () => {
//     toast({
//       description: "Location sharing would open here"
//     });
//   };

//   const handleOpenMessageOptions = () => {
//     toast({
//       description: "Message options would open here"
//     });
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

//   const handleMenuItemClick = (action: string) => {
//     // Handle menu actions
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
//       break;
//       case 'Send Query':
//         setShowAddQueryModal(true);
//       break;
//       default:
//         toast({
//           description: `${action} action selected`
//         });
//     }
//   };
//   const handleSendQuery = () => {
//     if (!queryName.trim() || !queryDescription.trim()) {
//       toast({
//         title: "Error",
//         description: "Please fill in both fields",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "Success",
//       description: "Query added successfully!"
//     });

//     setQueryName('');
//     setQueryDescription('');
//     setShowAddQueryModal(false);
//   };

//   // Render content based on current view
//   const renderContent = () => {
//     switch (currentView) {
//       case "View Message":
//         return (
//           <div className="mb-8 space-y-6">
//             <MessageCard onOptionsClick={handleOpenMessageOptions}>
//               <p className="text-sm leading-relaxed">
//                 {"Text Text Text"}
//               </p>
//             </MessageCard>

//             <LocationCard
//               coordinates="30.0768163914401931.2847391229373"
//               onOptionsClick={handleOpenMessageOptions}
//             />

//             <ProgressBar
//               progress={25}
//               onOptionsClick={handleOpenMessageOptions}
//             />
//           </div>
//         );
      
//       case "View Location":
//         return (
//           <div className="mb-8">
//             <LocationCard 
//               coordinates="30.0768163914401931.2847391229373"
//               onOptionsClick={() => {}}
//             />
//           </div>
//         );
      
//       case "View Process":
//         return (
//           <div className="mb-8">
//             <ProgressBar 
//               progress={25} 
//               onOptionsClick={() => {}}
//             />
//           </div>
//         );
      
//       case "View Query":
//         return (
//           <div className="mb-8">
//             <MessageCard onOptionsClick={() => {}}>
//               <h3 className="font-bold mb-2">Query</h3>
//               <p>
//                 ...............................................................................
//                 ...............................................................................
//                 ...............................................................................
//               </p>
//             </MessageCard>
//           </div>
//         );
      
//       default:
//         return (
//           <div className="mb-8">
//             <p>Select a view from the menu</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick} >
//       {renderContent()}

//       <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
//         {/* Input container */}
//         <input
//           type="text"
//           value={messageText}
//           onChange={(e) => setMessageText(e.target.value)}
//           className="p-3 border border-gray-300 rounded-l-md w-[1000px]"
//           placeholder="Create"
//           disabled={isLoading}
//         />
        
//         <button
//           onClick={() => setShowSendLocationModal(true)}
//           className="px-3 py-2 border border-gray-300 rounded-md"
//           disabled={isLoading}
//         >
//           <MapPin size={20} />
//         </button>
        
//         <SendOptionsDropdown onItemClick={handleMenuItemClick} />

//         {/* Send Message button */}
//         <button
//           onClick={handleSendMessage}
//           className={`px-5 py-3 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded-md`}
//           disabled={isLoading}
//         >
//           {isLoading ? 'Sending...' : 'Send Message'}
//         </button>
//       </div>

//       {/* Add Agent Modal */}
//       {showAddAgentModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Agent</h2>
//               <button 
//                 onClick={() => setShowAddAgentModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail size={18} className="text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   value={newAgentEmail}
//                   onChange={(e) => setNewAgentEmail(e.target.value)}
//                   className="pl-10 p-3 border border-gray-300 rounded-md w-full"
//                   placeholder="agent@example.com"
//                 />
//               </div>
//             </div>
            
//             <div className="flex justify-end">
//               <button
//                 onClick={handleAddAgent}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Add Agent
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Add Query Modal */}
//       {showAddQueryModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Query</h2>
//               <button 
//                 onClick={() => setShowAddQueryModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Query Name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={queryName}
//                   onChange={(e) => setQueryName(e.target.value)}
//                   className="p-3 border border-gray-300 rounded-md w-full"
//                   placeholder="Enter query name"
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Query Description
//               </label>
//               <div className="relative">
//                 <textarea
//                   value={queryDescription}
//                   onChange={(e) => setQueryDescription(e.target.value)}
//                   className="p-3 border border-gray-300 rounded-md w-full"
//                   placeholder="Enter query description"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={handleSendQuery}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Add Query
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showSendProcessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Send Process</h2>
//               <button 
//                 onClick={() => setShowSendProcessModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Process Name */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Process Name
//               </label>
//               <input
//                 type="text"
//                 value={processName}
//                 onChange={(e) => setProcessName(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="Enter process name"
//               />
//             </div>

//             {/* Process Progress */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Progress %
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 max="100"
//                 value={processProgress}
//                 onChange={(e) => setProcessProgress(parseInt(e.target.value) || 0)}
//                 className="p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="Enter progress percentage"
//               />
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={() => {
//                   toast({
//                     title: "Success",
//                     description: "Process sent successfully!"
//                   });
//                   setShowSendProcessModal(false);
//                 }}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSendLocationModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Send Location</h2>
//               <button 
//                 onClick={() => setShowSendLocationModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Location Content */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <input
//                 type="text"
//                 value={locationContent}
//                 onChange={(e) => setLocationContent(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="e.g. Emergency location"
//               />
//             </div>

//             {/* Latitude */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Latitude
//               </label>
//               <input
//                 type="number"
//                 value={locationLat}
//                 onChange={(e) => setLocationLat(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="e.g. 40.7128"
//               />
//             </div>

//             {/* Longitude */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Longitude
//               </label>
//               <input
//                 type="number"
//                 value={locationLng}
//                 onChange={(e) => setLocationLng(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="e.g. -74.0060"
//               />
//             </div>

//             <div className="flex justify-end">
//               <button
//                 onClick={() => {
//                   toast({
//                     title: "Success",
//                     description: "Location sent successfully!"
//                   });
//                   setShowSendLocationModal(false);
//                 }}
//                 className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//               >
//                 Send
//               </button>
//             </div>
//             {/* Google Maps Picker */}
//             <div className="mb-4">
//               <button
//                 onClick={() => window.open("https://www.google.com/maps", "_blank")}
//                 className="text-blue-600 hover:underline text-sm"
//               >
//                 🌍 Pick from Google Maps
//               </button>
//               <p className="text-xs text-gray-500 mt-1">
//                 Right click any point on the map, choose <strong>"What's here?"</strong>, then copy the coordinates.
//               </p>
//             </div>
//             {/* Paste from Clipboard */}
//             <div className="flex justify-end mb-4">
//               <button
//                 onClick={async () => {
//                   const text = await navigator.clipboard.readText();
//                   const match = text.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
//                   if (match) {
//                     setLocationLat(match[1]);
//                     setLocationLng(match[2]);
//                     toast({ title: "Coordinates pasted!" });
//                   } else {
//                     toast({ title: "Invalid format", description: "Make sure you copied coordinates like: 40.7128, -74.0060" });
//                   }
//                 }}
//                 className="text-sm text-green-600 hover:underline"
//               >
//                 📋 Paste Coordinates
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Agents Modal */}
//       {showViewAgentsModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Agents</h2>
//               <button 
//                 onClick={() => setShowViewAgentsModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {mockAgents.map((agent) => (
//                     <tr key={agent.id}>
//                       <td className="py-4 px-4 border-b border-gray-200">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
//                             <User size={20} className="text-gray-500" />
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{agent.name}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-500">
//                         {agent.email}
//                       </td>
//                       <td className="py-4 px-4 border-b border-gray-200">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           {agent.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </MainLayout>
//   );
// };

// import { MessageCard } from '../../components/MessageCard';
// import { LocationCard } from '../../components/LocationCard';
// import { ProgressBar } from '../../components/ProgressBar';
// import { MapPin, X, Mail, User } from 'lucide-react';
// import { DropdownMenu } from '../../components/DropdownMenu';
// import { SendOptionsDropdown } from '../../components/CustomDropdownMenu';

// import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MainLayout } from '../../layouts/MainLayout';
// import { useToast } from '../../hooks/use-toast';
// import { useModalState } from '../../hooks/use-modal-state';

// // مكونات العرض
// import { MessageView } from '../../components/views/MessageView';
// import { LocationView } from '../../components/views/LocationView';
// import { ProcessView } from '../../components/views/ProcessView';
// import { QueryView } from '../../components/views/QueryView';

// // المودالات
// import { AddAgentModal } from '../../components/modals/AddAgentModal';
// import { ViewAgentsModal } from '../../components/modals/ViewAgentsModal';
// import { AddQueryModal } from '../../components/modals/AddQueryModal';
// import { SendProcessModal } from '../../components/modals/SendProcessModal';
// import { SendLocationModal } from '../../components/modals/SendLocationModal';

// // مكونات أخرى
// import { MessageInput } from '../../components/MessageInput';

// // بيانات مثال
// const mockAgents = [
//   { id: 1, name: "أحمد محمد", email: "ahmed.mohamed@example.com", status: "Active" },
//   { id: 2, name: "سارة علي", email: "sara.ali@example.com", status: "Inactive" },
//   { id: 3, name: "عمر حسن", email: "omar.hassan@example.com", status: "Active" },
//   ];
  
//   export const DashboardPage: FC = () => {
//     const navigate = useNavigate();
//     // const toast = useToast();
  
//     // حالة عرض المودالات
//     const addAgentModal = useModalState();
//     const viewAgentsModal = useModalState();
//     const addQueryModal = useModalState();
//     const sendProcessModal = useModalState();
//     const sendLocationModal = useModalState();
//     const { toast } = useToast(); // ✅

  
//     // حالة المدخل
//     const [message, setMessage] = useState('');
//     const [view, setView] = useState<'message' | 'location' | 'process' | 'query'>('message');
  
//     const handleSend = () => {
//       if (!message.trim()) {
//         toast({ title: "الرسالة فارغة", description: "يرجى إدخال نص قبل الإرسال", variant: "destructive" });
//         return;
//       }
//       // مثال للإرسال
//       console.log("تم الإرسال:", message);
//       toast({ title: "تم الإرسال", description: "تم إرسال الرسالة بنجاح" });
//       setMessage('');
//     };
  
//     const renderView = () => {
//       switch (view) {
//         case 'message':
//           return <MessageView onOptionsClick={() => { /* function logic */ }} />
//         case 'location':
//           return <LocationView />;
//         case 'process':
//           return <ProcessView />;
//         case 'query':
//           return <QueryView />;
//         default:
//           return null;
//       }
//     };
  
//     return (
//       <MainLayout
//         title="لوحة التحكم"
//         // action={[
//         //   { label: "إضافة عميل", onClick: addAgentModal.open },
//         //   { label: "عرض العملاء", onClick: viewAgentsModal.open },
//         //   { label: "إرسال موقع", onClick: sendLocationModal.open },
//         //   { label: "إرسال عملية", onClick: sendProcessModal.open },
//         //   { label: "إضافة استعلام", onClick: addQueryModal.open },
//         // ]}
//       >
//         {renderView()}
//         <MessageInput
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onSend={handleSend}
//         />
//         <MessageInput onSendLocation={handleSendLocation} onMenuItemClick={handleMenuItemClick} />
  
//         {/* المودالات */}
//         <AddAgentModal isOpen={addAgentModal.isOpen} onClose={addAgentModal.close} />
//         <ViewAgentsModal isOpen={viewAgentsModal.isOpen} onClose={viewAgentsModal.close} agents={mockAgents} />
//         <SendLocationModal isOpen={sendLocationModal.isOpen} onClose={sendLocationModal.close} />
//         <SendProcessModal isOpen={sendProcessModal.isOpen} onClose={sendProcessModal.close} />
//         <AddQueryModal isOpen={addQueryModal.isOpen} onClose={addQueryModal.close} />
//       </MainLayout>
//     );
//   };