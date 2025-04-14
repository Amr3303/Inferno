
// import { FC, ReactNode } from 'react';
// import { BroadcastLogo } from '../components/BroadcastLogo';
// import { Menu } from 'lucide-react';
// import { SendOptionsDropdownHome } from '../components/HomeDropdownMenu';

// interface AuthLayoutProps {
//   children: ReactNode;
//   title?: string;
// }

// export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
//   return (
//     <div className="min-h-screen">
//       <header className="flex justify-between items-center p-4 border-b border-gray-300">
//         <div className="flex items-center">
//           <BroadcastLogo size="sm" />
//         </div>
//         <button className="p-2">
// <SendOptionsDropdownHome onItemClick={onMenuItemClick || setSelectedAction} /> {/* تمرير الفنكشن هنا */}        </button>
//       </header>
      
//       {title && (
//         <div className="text-center p-4">
//           <h1 className="text-2xl font-bold">{title}</h1>
//         </div>
//       )}
      
//       <main className="max-w-md mx-auto p-4 flex flex-col items-center">
//         <div className="my-8">
//           <BroadcastLogo size="lg" />
//         </div>
//         {children}
//       </main>
//     </div>
//   );
// };
// import { FC, ReactNode, useState } from 'react';
// import { BroadcastLogo } from '../components/BroadcastLogo';
// import { Menu } from 'lucide-react';
// import { SendOptionsDropdownHome } from '../components/HomeDropdownMenu';

// interface AuthLayoutProps {
//   children: ReactNode;
//   title?: string;
// }

// export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
//   const [selectedAction, setSelectedAction] = useState<string | null>(null);

//   // دالة لمعالجة النقر على العناصر
//   const onMenuItemClick = (action: string) => {
//     setSelectedAction(action);
//     console.log(`تم اختيار: ${action}`);
//   };

//   return (
//     <div className="min-h-screen">
//       <header className="flex justify-between items-center p-4 border-b border-gray-300">
//         <div className="flex items-center">
//           <BroadcastLogo size="sm" />
//         </div>
//         <button className="p-2">
//           {/* تمرير الدالة هنا لمكون الـ Dropdown */}
//           <SendOptionsDropdownHome onItemClick={onMenuItemClick} />
//         </button>
//       </header>
      
//       {title && (
//         <div className="text-center p-4">
//           <h1 className="text-2xl font-bold">{title}</h1>
//         </div>
//       )}
      
//       <main className="max-w-md mx-auto p-4 flex flex-col items-center">
//         <div className="my-8">
//           <BroadcastLogo size="lg" />
//         </div>
//         {children}
//       </main>
//     </div>
//   );
// };
import { FC, ReactNode, useState, useEffect } from 'react';
import { BroadcastLogo } from '../components/BroadcastLogo';
import { SendOptionsDropdownHome } from '../components/HomeDropdownMenu';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // دالة لمعالجة النقر على العناصر
  const onMenuItemClick = (action: string) => {
    setSelectedAction(action);
    console.log(`تم اختيار: ${action}`);
  };

  // استخدام useEffect للحصول على التوكن من localStorage عند تحميل المكون
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); // تعيين التوكن من localStorage
  }, []);

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="flex items-center">
          <BroadcastLogo size="sm" />
        </div>
        {/* شرط لعرض الـ Dropdown فقط إذا كان التوكن موجودًا */}
        {token && (
          <button className="p-2">
            <SendOptionsDropdownHome onItemClick={onMenuItemClick} />
          </button>
        )}
      </header>
      
      {title && (
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      )}
      
      <main className="max-w-md mx-auto p-4 flex flex-col items-center">
        <div className="my-8">
          <BroadcastLogo size="lg" />
        </div>
        {children}
      </main>
    </div>
  );
};
