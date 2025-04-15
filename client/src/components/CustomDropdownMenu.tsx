import { FC, useState, useEffect, useRef } from 'react';

interface SendOptionsDropdownProps {
  onItemClick: (action: string) => void;
}

export const SendOptionsDropdown: FC<SendOptionsDropdownProps> = ({ onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
<<<<<<< Updated upstream
  onClick={toggleDropdown}
  className="p-1 border-2 border-gray-300 rounded-md bg-white text-gray-700"
  aria-expanded={isOpen ? 'true' : 'false'}
  aria-haspopup="true"
  aria-controls="send-options-dropdown"
  title="Select Action"
>
  <span className="text-xl">☰</span>
</button>


=======
        type="button"
        title="Toggle dropdown menu"
        onClick={toggleDropdown}
        className="p-1 border-2 border-gray-300 rounded-md bg-white text-gray-700"
      >
        <span className="text-xl">☰</span>
      </button>
>>>>>>> Stashed changes

      {isOpen && (
        <div
          className="absolute bottom-full mb-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <button
<<<<<<< Updated upstream
            onClick={() => handleItemClick('Send Process')}
=======
            type="button"
            title="Send process message"
            onClick={() => handleItemClick("Send Process")}
>>>>>>> Stashed changes
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Send Process
          </button>
          <button
<<<<<<< Updated upstream
            onClick={() => handleItemClick('Send Query')}
=======
            type="button"
            title="Send query message"
            onClick={() => handleItemClick("Send Query")}
>>>>>>> Stashed changes
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Send Query
          </button>
        </div>
      )}
    </div>
  );
};
