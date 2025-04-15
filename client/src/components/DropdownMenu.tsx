// // DropdownMenu.tsx
// import { FC, useState, useRef, useEffect } from 'react';
// import { MoreHorizontal } from 'lucide-react';

// interface DropdownMenuProps {
//   onItemClick: (action: string) => void;
// }

// export const DropdownMenu: FC<DropdownMenuProps> = ({ onItemClick }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleMenuSelection = (action: string) => {
//     onItemClick(action);
//     setIsOpen(false);
//   };

//   const menuItems = [
//     "Add Agent",
//     "View Agents",
//     "View Message",
//     "View Location", 
//     "View Process",
//     "View Query"
//   ];

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={toggleMenu}
//         className="px-3 py-2 border border-gray-300 rounded-md"
//       >
//         <MoreHorizontal size={20} />
//       </button>
      
//       {isOpen && (
//         <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 w-48 overflow-hidden">
//           <div className="py-1">
//             {menuItems.map((item, index) => (
//               <button 
//                 key={item}
//                 className={`w-full text-left px-4 py-3 text-blue-500 hover:bg-gray-100 font-semibold ${
//                   index < menuItems.length - 1 ? 'border-b border-gray-200' : ''
//                 }`}
//                 onClick={() => handleMenuSelection(item)}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
import { FC, useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface DropdownMenuProps {
  onItemClick: (action: string) => void;
  isMenuBelow?: boolean;  // خاصية جديدة لتحديد مكان القائمة
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ onItemClick, isMenuBelow = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuSelection = (action: string) => {
    onItemClick(action);
    setIsOpen(false);
  };

  const menuItems = [
    "Add Agent",
    "View Agents",
    "View Message",
    "View Location",
    "View Process",
    "View Query"
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="px-3 py-2 border border-gray-300 rounded-md"
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 ${isMenuBelow ? 'top-full mt-2' : 'bottom-full mb-2'} right-0 bg-white rounded-lg shadow-lg border border-gray-200 w-48 overflow-hidden`}>
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-3 text-blue-500 hover:bg-gray-100 font-semibold ${index < menuItems.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                onClick={() => handleMenuSelection(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
