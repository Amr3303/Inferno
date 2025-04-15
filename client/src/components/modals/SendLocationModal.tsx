import { FC, useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useLocationApi } from '../../hooks/use-location-api';  // تأكد من استخدام الدالة من الـ hook

interface SendLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: () => void;
}

export const SendLocationModal: FC<SendLocationModalProps> = ({ isOpen, onClose }) => {
  const [locationContent, setLocationContent] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const { toast } = useToast();
  const { sendLocationMessage, isLoading } = useLocationApi();  // استدعاء الـ hook

  const handleSendLocation = async () => {
    if (!locationContent.trim() || !locationLat.trim() || !locationLng.trim()) {
      toast({
        title: "error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "error",
        description: "Please log in first.",
        variant: "destructive"
      });
      return;
    }

    // إرسال الموقع عبر الـ API
    const success = await sendLocationMessage(locationContent, parseFloat(locationLat), parseFloat(locationLng));
    if (success) {
      setLocationContent('');
      setLocationLat('');
      setLocationLng('');
      onClose();  // إغلاق المودال بعد إرسال الموقع
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">إرسال موقع</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Location Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={locationContent}
            onChange={(e) => setLocationContent(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full"
            placeholder="Example: Emergency Site"
          />
        </div>

        {/* Latitude */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            latitude
          </label>
          <input
            type="number"
            value={locationLat}
            onChange={(e) => setLocationLat(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full"
            placeholder="Example: 40.7128"
          />
        </div>

        {/* Longitude */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <input
            type="number"
            value={locationLng}
            onChange={(e) => setLocationLng(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full"
            placeholder="Example: -74.0060"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSendLocation}
            className={`px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-green-500'} text-white rounded-md hover:bg-green-600`}
            disabled={isLoading} // تعطيل الزر أثناء تحميل
          >
            {isLoading ? 'Sending...' : 'Sending'}
          </button>
        </div>

        {/* Google Maps Picker */}
        <div className="mb-4">
          <button
            onClick={() => window.open("https://www.google.com/maps", "_blank")}
            className="text-blue-600 hover:underline text-sm"
          >
            🌍 Select from Google Maps
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Right-click on any point on the map, and choose<strong>"What is this place?"</strong>, then copy the coordinates.
          </p>
        </div>

        {/* Paste from Clipboard */}
        <div className="flex justify-end mb-4">
          <button
            onClick={async () => {
              try {
                const text = await navigator.clipboard.readText();
                const match = text.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
                if (match) {
                  setLocationLat(match[1]);
                  setLocationLng(match[2]);
                  toast({ title: "Coordinates pasted!" });
                } else {
                  toast({
                    title: "Invalid format",
                    description: "Make sure to copy the coordinates in the format: 40.7128, -74.0060"
                  });
                }
              } catch (error) {
                toast({
                  title: "error",
                  description: "The clipboard cannot be accessed"
                });
              }
            }}
            className="text-sm text-green-600 hover:underline"
          >
            📋 Paste coordinates
          </button>
        </div>
      </div>
    </div>
  );
};