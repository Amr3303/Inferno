import { FC } from 'react';
import { X, User } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface ViewAgentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
}

export const ViewAgentsModal: FC<ViewAgentsModalProps> = ({ isOpen, onClose, agents }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">الوكلاء</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                  الاسم
                </th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                  البريد الإلكتروني
                </th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td className="py-4 px-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-500">
                    {agent.email}
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {agent.status === 'Active' ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};