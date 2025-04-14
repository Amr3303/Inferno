import { FC, ReactNode, useState, useEffect } from 'react';
import { BroadcastLogo } from '../components/BroadcastLogo';
import { DropdownMenu } from '../components/DropdownMenu';
import { SendOptionsDropdownHome } from '../components/HomeDropdownMenu';

interface MainLayoutProps {
  children: ReactNode | ((action: string | null) => ReactNode);
  title?: string;
  showSidebar?: boolean;
  onMenuItemClick?: (action: string) => void; // Prop جديد لتحديد التصرف عند اختيار عنصر من الـ Dropdown
}

interface Broadcast {
  id: string;
  name: string;
  description: string;
  role: string;
  agents?: string[];
}

export const MainLayout: FC<MainLayoutProps> = ({ 
  children, 
  title, 
  showSidebar = false,
  onMenuItemClick ,
}) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedBroadcastId, setSelectedBroadcastId] = useState<string | null>(null); // حالة جديدة لتخزين الـ broadcast المختار
  const [selectedUserRole, setSelectedUserRole] = useState<string | null>(null); // حالة جديدة لتخزين الـ userRole
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);

  // إجراء طلب API لتحميل البيانات
  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const token = localStorage.getItem('token'); // استرجاع الـ token من الـ localStorage
  
        const response = await fetch('https://inferno-neon.vercel.app/api/v1/broadcasts/my', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // إضافة الـ token في رأس الطلب
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        console.log('Data:', data); // طباعة البيانات المسترجعة
  
        if (data.success) {
          console.log("Broadcasts from API:", data.data);
          setBroadcasts(data.data); // تحديث حالة البث
        }
      } catch (error) {
        console.error('Error fetching broadcasts:', error);
      }
    };
    fetchBroadcasts();
  }, []);

  const renderContent = () => {
    if (typeof children === 'function') {
      return (children as (action: string | null) => ReactNode)(selectedAction);
    }
    return children;
  };

  const handleButtonClick = (id: string, role: string) => {
    console.log("Saving to localStorage:", { id, role });
    localStorage.setItem('selectedBroadcastId', id); // تخزين الـ ID في localStorage
    localStorage.setItem('selectedUserRole', role); // تخزين الـ userRole في localStorage
    setSelectedBroadcastId(id); // تحديث حالة الـ broadcast المختار
    setSelectedUserRole(role); // تحديث حالة الـ userRole
    setSelectedAction(id); // تحديث الحالة
    if (onMenuItemClick) {
      onMenuItemClick(id); // استدعاء الدالة الممررة
    }
    setTimeout(() => {
      const delayedId = localStorage.getItem('selectedBroadcastId');
      const delayedRole = localStorage.getItem('selectedUserRole');
      console.log("After delay, localStorage contains:", { delayedId, delayedRole });
    }, 100);
  };

  return (
    <div className="min-h-screen flex">
      {showSidebar && (
        <div className="w-[180px] border-r border-gray-300">
          <div className="p-4">
            <h2 className="font-bold mb-4">My Broadcast</h2>
            <div className="flex flex-col space-y-2">
              {broadcasts.map((broadcast) => (
                <button
                  key={broadcast.id}
                  className={`w-full text-left py-2 px-3 border border-gray-300 rounded ${
                    selectedBroadcastId === broadcast.id ? 'bg-blue-500 text-white' : '' // تغيير اللون إذا تم اختيار البث
                  }`}
                  onClick={() => handleButtonClick(broadcast.id, broadcast.role)} // تمرير الـ userRole هنا
                >
                  {broadcast.name} {/* استخدام الاسم من الـ API */}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">
        <header className="flex justify-between items-center p-4 border-b border-gray-300">
          <div className="flex items-center">
            <BroadcastLogo size="sm" />
          </div>
          <SendOptionsDropdownHome onItemClick={onMenuItemClick || setSelectedAction} /> {/* تمرير الفنكشن هنا */}
        </header>
        
        {title && (
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h1 className="text-xl font-bold">{title}</h1>
            <DropdownMenu onItemClick={onMenuItemClick || setSelectedAction} /> {/* تمرير الفنكشن هنا */}
          </div>
        )}
        
        <main className="p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
