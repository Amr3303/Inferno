import { FC, useState } from 'react';
import { MapPin } from 'lucide-react';
import { SendOptionsDropdown } from '../components/CustomDropdownMenu';
import { useMessageApi } from '../hooks/use-message-api';

interface MessageInputProps {
  onSendLocation: () => void;
  onMenuItemClick: (action: string) => void;
}

export const MessageInput: FC<MessageInputProps> = ({ onSendLocation, onMenuItemClick }) => {
  const [messageText, setMessageText] = useState('');
  const { isLoading, sendTextMessage } = useMessageApi();

  const handleSendMessage = async () => {
    const success = await sendTextMessage(messageText);
    if (success) {
      setMessageText('');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 flex justify-end items-center space-x-2">
      {/* Input container */}
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="p-3 border border-gray-300 rounded-l-md w-[1000px]"
        placeholder="اكتب رسالتك هنا"
        disabled={isLoading}
      />
      
      <button
        onClick={onSendLocation}
        className="px-3 py-2 border border-gray-300 rounded-md"
        disabled={isLoading}
      >
        <MapPin size={20} />
      </button>
      
      <SendOptionsDropdown onItemClick={onMenuItemClick} />

      {/* Send Message button */}
      <button
        onClick={handleSendMessage}
        className={`px-5 py-3 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} text-white rounded-md`}
        disabled={isLoading}
      >
        {isLoading ? 'جاري الإرسال...' : 'إرسال'}
      </button>
    </div>
  );
};