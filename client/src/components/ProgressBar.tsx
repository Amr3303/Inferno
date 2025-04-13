// import { FC } from 'react';

// interface ProgressBarProps {
//   progress: number; // 0-100
//   markerCount?: number;
//   onOptionsClick?: () => void;
// }

// export const ProgressBar: FC<ProgressBarProps> = ({ 
//   progress, 
//   markerCount = 4,
//   onOptionsClick
// }) => {
//   // Create an array of marker positions
//   const markers = Array.from({ length: markerCount }, (_, i) => {
//     const position = (i / (markerCount - 1)) * 100;
//     return {
//       position,
//       active: position <= progress
//     };
//   });

//   return (
//     <div className="p-4 mb-4 message-card relative">
//       <h3 className="font-bold mb-4">Progress Bar: {progress}%</h3>
//       <div className="mt-6 mb-4">
//         <div className="progress-bar">
//           <div 
//             className="progress-fill" 
//             style={{ width: `${progress}%` }}
//           ></div>
          
//           {markers.map((marker, index) => (
//             <div
//               key={index}
//               className={`progress-marker ${marker.active ? 'active' : ''}`}
//               style={{ left: `${marker.position}%` }}
//             ></div>
//           ))}
//         </div>
//       </div>
      
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

interface ProgressBarProps {
  progress: number; // 0-100
  markerCount?: number;
  onOptionsClick?: () => void;
}

export const ProgressBar: FC<ProgressBarProps> = ({ 
  progress, 
  markerCount = 4,
  onOptionsClick
}) => {
  // Create an array of marker positions
  const markers = Array.from({ length: markerCount }, (_, i) => {
    const position = (i / (markerCount - 1)) * 100;
    return {
      position,
      active: Math.round(position) <= Math.round(progress)
    };
  });

  return (
    <div className="p-4 mb-4 message-card relative">
      <h3 className="font-bold mb-4">Progress Bar: {progress}%</h3>
      <div className="mt-6 mb-4">
        <div className="progress-bar relative h-2 bg-gray-300 rounded-full">
          <div 
            className="progress-fill transition-all duration-500 h-full bg-blue-600 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
          
          {markers.map((marker, index) => (
            <div
              key={index}
              className={`progress-marker w-2 h-2 rounded-full absolute -translate-x-1/2 top-[-4px] ${
                marker.active ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              style={{ left: `${marker.position}%` }}
              title={`${Math.round(marker.position)}%`}
            ></div>
          ))}
        </div>
      </div>
      
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
      
      <style>
        {`
          .progress-bar {
            position: relative;
            height: 8px;
            background-color: #e5e7eb;
            border-radius: 9999px;
          }
          .progress-fill {
            height: 100%;
            background-color: #3b82f6;
            border-radius: 9999px;
          }
        `}
      </style>
    </div>
  );
};
