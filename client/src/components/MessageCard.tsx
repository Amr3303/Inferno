// import { FC, ReactNode } from 'react';

// interface MessageCardProps {
//   children: ReactNode;
//   onOptionsClick?: () => void;
// }

// export const MessageCard: FC<MessageCardProps> = ({ children, onOptionsClick }) => {
//   return (
//     <div className="message-card p-4 mb-4 relative">
//       <div className="text-left">{children}</div>
//       {onOptionsClick && (
//         <button 
//           onClick={onOptionsClick}
//           className="absolute top-2 right-2 p-1"
//         >
//           <div className="flex flex-col space-y-1">
//             <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
//             <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
//             <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
//           </div>
//         </button>
//       )}
//     </div>
//   );
// };
import { FC } from 'react';

interface MessageCardProps {
  content: string;
  onOptionsClick?: () => void;
}

export const MessageCard: FC<MessageCardProps> = ({ content, onOptionsClick }) => {
  return (
    <div className="message-card p-4 mb-4 relative">
      <div className="text-left">{content}</div>
      {onOptionsClick && (
        <button 
          onClick={onOptionsClick}
          className="absolute top-2 right-2 p-1"
        >
          <div className="flex flex-col space-y-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>
        </button>
      )}
    </div>
  );
};
