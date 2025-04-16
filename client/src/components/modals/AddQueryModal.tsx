import { FC, useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useQueryApi } from '../../hooks/use-query-api';

interface AddQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageResponse {
  success: boolean;
  message: string;
  data?: {
    type: string;
    content: string;
    createdBy: string;
    broadcast: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const AddQueryModal: FC<AddQueryModalProps> = ({ isOpen, onClose }) => {
  const [queryName, setQueryName] = useState('');
  const [queryDescription, setQueryDescription] = useState('');
  const { toast } = useToast();
  const token = localStorage.getItem('token');
  const { sendQueryMessage, isLoading } = useQueryApi();

  const handleSendQuery = async () => {
    if (!queryName.trim() || !queryDescription.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    if (!token) {
      toast({
        title: "Error",
        description: "Please log in first.",
        variant: "destructive"
      });
      return;
    }
  
    const success = await sendQueryMessage(queryName, queryDescription, token);
    if (success) {
      setQueryName('');
      setQueryDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add query</h2>
          <button
            onClick={onClose}
            title="Close modal" 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
          Query name
          </label>
          <div className="relative">
            <input
              type="text"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full"
              placeholder="Enter the query name"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Query description
          </label>
          <div className="relative">
            <textarea
              value={queryDescription}
              onChange={(e) => setQueryDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full"
              placeholder="Enter a description of the query."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSendQuery}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-all 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Add query"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
