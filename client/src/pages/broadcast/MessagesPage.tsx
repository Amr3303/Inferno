
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
//       default:
//         toast({
//           description: `${action} action selected`
//         });
//     }
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
//           className="p-3 border border-gray-300 rounded-l-md w-[1050px]"  // عرض ثابت
//           placeholder="Create"
//         />
        
//         <button
//           onClick={handleShareLocation}
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
//                   <DocumentText size={18} className="text-gray-400" />
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
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout';
import { MessageCard } from '../../components/MessageCard';
import { LocationCard } from '../../components/LocationCard';
import { ProgressBar } from '../../components/ProgressBar';
import { MapPin, X, Mail, User } from 'lucide-react';
import { FileText } from 'lucide-react'; // instead of DocumentText
import { useToast } from '../../hooks/use-toast';
import { DropdownMenu } from '../../components/DropdownMenu';
import { SendOptionsDropdown } from '../../components/CustomDropdownMenu';

// Mock agent data
const mockAgents = [
  { id: 1, name: "Ahmed Mohamed", email: "ahmed.mohamed@example.com", status: "Active" },
  { id: 2, name: "Sara Ali", email: "sara.ali@example.com", status: "Inactive" },
  { id: 3, name: "Omar Hassan", email: "omar.hassan@example.com", status: "Active" }
];

export const MessagesPage: FC = () => {
  const [messageText, setMessageText] = useState('');
  const [currentView, setCurrentView] = useState('View Message');
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
  const [showAddProcessModal, setShowAddProcessModal] = useState(false); // Add state for Add Process modal
  const [newAgentEmail, setNewAgentEmail] = useState('');
  const [newProcessName, setNewProcessName] = useState(''); // Process name state
  const [newProcessDescription, setNewProcessDescription] = useState(''); // Process description state
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Message sent successfully!"
    });

    setMessageText('');
  };

  const handleShareLocation = () => {
    toast({
      description: "Location sharing would open here"
    });
  };

  const handleOpenMessageOptions = () => {
    toast({
      description: "Message options would open here"
    });
  };

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

  const handleAddProcess = () => {
    if (!newProcessName.trim() || !newProcessDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter both process name and description",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `Process "${newProcessName}" added successfully`
    });

    setNewProcessName('');
    setNewProcessDescription('');
    setShowAddProcessModal(false);
  };

  const handleMenuItemClick = (action: string) => {
    // Handle menu actions
    switch (action) {
      case "Add Agent":
        setShowAddAgentModal(true);
        break;
      case "View Agents":
        setShowViewAgentsModal(true);
        break;
      case "View Message":
      case "View Location":
      case "View Process":
      case "View Query":
        setCurrentView(action);
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
          <div className="mb-8 space-y-6">
            <MessageCard onOptionsClick={handleOpenMessageOptions}>
              <p className="text-sm leading-relaxed">
                {"Text Text Text"}
              </p>
            </MessageCard>

            <LocationCard
              coordinates="30.0768163914401931.2847391229373"
              onOptionsClick={handleOpenMessageOptions}
            />

            <ProgressBar
              progress={25}
              onOptionsClick={handleOpenMessageOptions}
            />
          </div>
        );
      
      case "View Location":
        return (
          <div className="mb-8">
            <LocationCard 
              coordinates="30.0768163914401931.2847391229373"
              onOptionsClick={() => {}}
            />
          </div>
        );
      
      case "View Process":
        return (
          <div className="mb-8">
            <ProgressBar 
              progress={25} 
              onOptionsClick={() => {}}
            />
          </div>
        );
      
      case "View Query":
        return (
          <div className="mb-8">
            <MessageCard onOptionsClick={() => {}} >
              <h3 className="font-bold mb-2">Query</h3>
              <p>
                ............................................................................... 
                ............................................................................... 
                ............................................................................... 
              </p>
            </MessageCard>
          </div>
        );
      
      default:
        return (
          <div className="mb-8">
            <p>Select a view from the menu</p>
          </div>
        );
    }
  };

  return (
    <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick} >
      {renderContent()}

      <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
        {/* Input container */}
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="p-3 border border-gray-300 rounded-l-md w-[1050px]"  // عرض ثابت
          placeholder="Create"
        />
        
        <button
          onClick={handleShareLocation}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <MapPin size={20} />
        </button>
        
        <SendOptionsDropdown onItemClick={handleMenuItemClick} />

        {/* Send Message button */}
        <button
          onClick={handleSendMessage}
          className="px-5 py-3 bg-blue-500 text-white rounded-md"
        >
          Send Message
        </button>
      </div>

      {/* Add Agent Modal */}
      {showAddAgentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Agent</h2>
              <button 
                onClick={() => setShowAddAgentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={newAgentEmail}
                  onChange={(e) => setNewAgentEmail(e.target.value)}
                  className="pl-10 p-3 border border-gray-300 rounded-md w-full"
                  placeholder="agent@example.com"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleAddAgent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Process Modal */}
      {showAddProcessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Process</h2>
              <button
                onClick={() => setShowAddProcessModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Process Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={newProcessName}
                  onChange={(e) => setNewProcessName(e.target.value)}
                  className="pl-10 p-3 border border-gray-300 rounded-md w-full"
                  placeholder="Process Name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Process Description
              </label>
              <textarea
                value={newProcessDescription}
                onChange={(e) => setNewProcessDescription(e.target.value)}
                className="pl-10 p-3 border border-gray-300 rounded-md w-full"
                placeholder="Describe the process..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleAddProcess}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Process
              </button>
            </div>
          </div>
        </div>
      )}

    </MainLayout>
  );
};
