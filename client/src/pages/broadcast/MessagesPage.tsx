import { FC, useState } from 'react';
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
import { useQueryApi } from '../../hooks/use-query-api';
import { useLocationApi } from '../../hooks/use-location-api';

// بيانات مثال
const mockAgents = [
  { id: 1, name: "أحمد محمد", email: "ahmed.mohamed@example.com", status: "Active" },
  { id: 2, name: "سارة علي", email: "sara.ali@example.com", status: "Inactive" },
  { id: 3, name: "عمر حسن", email: "omar.hassan@example.com", status: "Active" }
];

// API endpoints and constants
const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;

export const MessagesPage: FC = () => {
  const [messageText, setMessageText] = useState('');
  const [currentView, setCurrentView] = useState('View Message');
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
  const { sendTextMessage } = useMessageApi();

  const validateInputs = (token: string, queryName: string, queryDescription: string) => {
    if (!token) {
      toast({
        title: "Error",
        description: "No authentication token found. Please log in.",
        variant: "destructive"
      });
      return false;
    }

    if (!queryName.trim() || !queryDescription.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both fields",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };
  const handleSendMessage = async () => {
    const token = localStorage.getItem('token'); // أو authToken حسب ما حفظته
    if (!token) {
      toast({
        title: "Error",
        description: "Please login first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await sendTextMessage(messageText, token);
    if (success) {
      setMessageText('');
    }
    setIsLoading(false);
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

  const handleSendProcess = () => {
    toast({
      title: "Success",
      description: "Process sent successfully!"
    });
    setShowSendProcessModal(false);
  };

  const handlePasteCoordinates = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const match = text.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
      if (match) {
        setLocationLat(match[1]);
        setLocationLng(match[2]);
        toast({ title: "تم لصق الإحداثيات!" });
      } else {
        toast({
          title: "تنسيق غير صالح",
          description: "تأكد من نسخ الإحداثيات بالشكل: 40.7128, -74.0060"
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "لا يمكن الوصول إلى الحافظة"
      });
    }
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
      case 'Send Process':
        setShowSendProcessModal(true);
        break;
      case 'Send Query':
        setShowAddQueryModal(true);
        break;
      case 'Send Location':
        setShowSendLocationModal(true);
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
            <MessageCard onOptionsClick={() => { }}>
              <p className="text-sm leading-relaxed">
                {"Text Text Text"}
              </p>
            </MessageCard>

            <LocationCard
              coordinates="30.0768163914401931.2847391229373"
              onOptionsClick={() => { }}
            />

            <ProgressBar
              progress={25}
              onOptionsClick={() => { }}
            />
          </div>
        );
      case "View Location":
        return (
          <div className="mb-8">
            <LocationCard
              coordinates="30.0768163914401931.2847391229373"
              onOptionsClick={() => { }}
            />
          </div>
        );
      case "View Process":
        return (
          <div className="mb-8">
            <ProgressBar
              progress={25}
              onOptionsClick={() => { }}
            />
          </div>
        );
      case "View Query":
        return (
          <div className="mb-8">
            <MessageCard onOptionsClick={() => { }}>
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
  const selectedUserRole = localStorage.getItem('selectedUserRole');
  return (
    <MainLayout showSidebar title="Broadcast messages" onMenuItemClick={handleMenuItemClick} >
      {renderContent()}
      {selectedUserRole === 'transmitter' && (
        <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
          {/* إدخال الرسالة */}
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="p-3 border border-gray-300 rounded-l-md w-[1000px]"
            placeholder="Create"
            disabled={isLoading}
          />

          {/* زر الموقع */}
          <button
            onClick={() => setShowSendLocationModal(true)}
            className="px-3 py-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          >
            <MapPin size={20} />
          </button>

          {/* القائمة المنسدلة لخيارات الإرسال */}
          <SendOptionsDropdown onItemClick={handleMenuItemClick} />

          {/* زر إرسال الرسالة */}
          <button
            onClick={handleSendMessage}
            className={`px-5 py-3 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded-md`}
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
