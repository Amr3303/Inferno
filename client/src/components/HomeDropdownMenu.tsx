// import { FC, useState, useEffect, useRef } from 'react';
// import { MoreHorizontal } from 'lucide-react';

// interface SendOptionsDropdownHome {
//   onItemClick: (action: string) => void;
// }

// export const SendOptionsDropdownHome: FC<SendOptionsDropdownHome> = ({ onItemClick }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => {
//     setIsOpen((prevState) => !prevState);
//   };

//   const handleItemClick = (action: string) => {
//     onItemClick(action);
//     setIsOpen(false); // Close the dropdown after selecting an item
//   };

//   const closeDropdown = (e: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     // Close dropdown when clicking outside of it
//     document.addEventListener('mousedown', closeDropdown);
//     return () => {
//       document.removeEventListener('mousedown', closeDropdown);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={toggleDropdown}
//         className="px-3 py-2 border border-gray-300 rounded-md"
//       >
//         <MoreHorizontal size={20} /> {/* هنا تم إضافة الأيقونة */}
//       </button>

//       {isOpen && (
//         <div
//           id="send-options-dropdown"
//           className="absolute top-full mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
//         >
//           <button
//             onClick={() => handleItemClick('Open Dashboard')}
//             className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             aria-label="Open Dashboard"
//           >
//             Open Dashboard
//           </button>
//           <button
//             onClick={() => handleItemClick('Sign Out')}
//             className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             aria-label="Sign Out"
//           >
//             Sign Out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

import { FC, useState, useEffect, useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // استيراد useNavigate

interface SendOptionsDropdownHome {
  onItemClick: (action: string) => void;
  isMenuBelow?: boolean;
}

export const SendOptionsDropdownHome: FC<SendOptionsDropdownHome> = ({ onItemClick , isMenuBelow = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleItemClick = (action: string) => {
    onItemClick(action);
    setIsOpen(false); // Close the dropdown after selecting an item
  };

  const closeDropdown = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Close dropdown when clicking outside of it
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-3 py-2 border border-gray-300 rounded-md"
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <div
          id="send-options-dropdown"
          className={`absolute z-50 ${isMenuBelow ? 'top-full mt-2' : 'bottom-full mb-2'} right-0 bg-white rounded-lg shadow-lg border border-gray-200 w-48 overflow-hidden`}
        >
          <button
            onClick={() =>{
                navigate('/dashboard'); // التوجيه إلى صفحة الـ Dashboard
                handleItemClick('Open Dashboard');  // تنفيذ باقي الأكشن بعد التوجيه
            }
            }
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            aria-label="Open Dashboard"
          >
            Open Dashboard
          </button>
          <button
            onClick={() =>{
                navigate('/broadcast/messages');
                handleItemClick('Open Messages');  // تنفيذ باقي الأكشن بعد التوجيه
            }
            }
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            aria-label="Open Messages"
          >
            Open Broadcast
          </button>
          <button
            onClick={() => 
                {
                    navigate('/');
                    localStorage.clear()
                }
            }
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            aria-label="Sign Out"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
