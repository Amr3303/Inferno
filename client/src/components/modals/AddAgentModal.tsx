import { FC, useState } from 'react';
import { X, Mail } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}


export const AddAgentModal: FC<AddAgentModalProps> = ({ isOpen, onClose }) => {
  const [newAgentEmail, setNewAgentEmail] = useState('');
  const { toast } = useToast();

  const handleAddAgent = () => {
    if (!newAgentEmail.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال عنوان بريد إلكتروني",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "نجاح",
      description: `تم إرسال دعوة للوكيل على ${newAgentEmail}`
    });

    setNewAgentEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">إضافة وكيل</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            البريد الإلكتروني
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
            إضافة وكيل
          </button>
        </div>
      </div>
    </div>
  );
};