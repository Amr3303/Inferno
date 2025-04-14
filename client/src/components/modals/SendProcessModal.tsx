// import { FC, useState } from 'react';
// import { X } from 'lucide-react';
// import { useToast } from '../../hooks/use-toast';

// interface SendProcessModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   processName: string;
//   setProcessName: React.Dispatch<React.SetStateAction<string>>;
//   processProgress: number;
//   setProcessProgress: React.Dispatch<React.SetStateAction<number>>;
//   onSubmit: () => void;
// }

// export const SendProcessModal: FC<SendProcessModalProps> = ({ isOpen, onClose }) => {
//   const [processName, setProcessName] = useState('');
//   const [processProgress, setProcessProgress] = useState(0);
//   const { toast } = useToast();

//   const handleSendProcess = () => {
//     if (!processName.trim()) {
//       toast({
//         title: "خطأ",
//         description: "الرجاء إدخال اسم العملية",
//         variant: "destructive"
//       });
//       return;
//     }

//     toast({
//       title: "نجاح",
//       description: "تم إرسال العملية بنجاح!"
//     });

//     setProcessName('');
//     setProcessProgress(0);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">إرسال عملية</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Process Name */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             اسم العملية
//           </label>
//           <input
//             type="text"
//             value={processName}
//             onChange={(e) => setProcessName(e.target.value)}
//             className="p-3 border border-gray-300 rounded-md w-full"
//             placeholder="أدخل اسم العملية"
//           />
//         </div>

//         {/* Process Progress */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             نسبة التقدم %
//           </label>
//           <input
//             type="number"
//             min="0"
//             max="100"
//             value={processProgress}
//             onChange={(e) => setProcessProgress(parseInt(e.target.value) || 0)}
//             className="p-3 border border-gray-300 rounded-md w-full"
//             placeholder="أدخل نسبة التقدم"
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             onClick={handleSendProcess}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             إرسال
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
import { FC, useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useProgressApi } from '../../hooks/use-process-api'; // ← استدعاء الـ hook الجديد

interface SendProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  processName: string;
  setProcessName: React.Dispatch<React.SetStateAction<string>>;
  processProgress: number;
  setProcessProgress: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
}

export const SendProcessModal: FC<SendProcessModalProps> = ({ isOpen, onClose }) => {
  const [processName, setProcessName] = useState('');
  const [processProgress, setProcessProgress] = useState(0);
  const { toast } = useToast();
  const { sendProgressMessage, isLoading } = useProgressApi(); // ← استخدام hook التقدم

  const handleSendProcess = async () => {
    const success = await sendProgressMessage(processName, processProgress);
    if (success) {
      setProcessName('');
      setProcessProgress(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">إرسال عملية</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Process Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            اسم العملية
          </label>
          <input
            type="text"
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full"
            placeholder="أدخل اسم العملية"
          />
        </div>

        {/* Process Progress */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            نسبة التقدم %
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={processProgress}
            onChange={(e) => setProcessProgress(parseInt(e.target.value) || 0)}
            className="p-3 border border-gray-300 rounded-md w-full"
            placeholder="أدخل نسبة التقدم"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSendProcess}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isLoading ? 'جاري الإرسال...' : 'إرسال'}
          </button>
        </div>
      </div>
    </div>
  );
};
