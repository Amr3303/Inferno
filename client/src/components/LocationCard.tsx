
// import { FC } from 'react';
// import { MapPin } from 'lucide-react';

// interface LocationCardProps {
//   coordinates: string;
//   onOptionsClick?: () => void;
// }

// export const LocationCard: FC<LocationCardProps> = ({ coordinates, onOptionsClick }) => {
//   return (
//     <div className="location-card p-4 mb-4 relative">
//       <h3 className="font-bold mb-2">Location Sharing</h3>
//       <div className="flex items-center">
//         <div className="w-16 h-16 mr-4 overflow-hidden rounded-md relative">
//           <div className="bg-green-500 w-full h-full flex items-center justify-center text-white">
//             <MapPin size={24} />
//           </div>
//         </div>
//         <span className="text-blue-600">{coordinates}</span>
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
// import { FC } from 'react';
// import { MapPin } from 'lucide-react';

// interface LocationCardProps {
//   content: string; // محتوى الرسالة مثل "e"
//   coordinates: { lat: number; lng: number }; // الإحداثيات
//   onOptionsClick?: () => void;
// }

// export const LocationCard: FC<LocationCardProps> = ({ content, coordinates, onOptionsClick }) => {
//   const coordinatesString = `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`;

//   return (
//     <div className="location-card p-4 mb-4 relative">
//       <h3 className="font-bold mb-2">Location Sharing</h3>
//       <div className="flex items-center mb-3">
//         <div className="w-16 h-16 mr-4 overflow-hidden rounded-md relative">
//           <div className="bg-green-500 w-full h-full flex items-center justify-center text-white">
//             <MapPin size={24} />
//           </div>
//         </div>
//         <span className="text-blue-600">{content}</span>
//       </div>
//       <div className="flex items-center">
//         <span className="text-gray-600">Coordinates: </span>
//         <span className="text-blue-600 ml-2">{coordinatesString}</span>
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

// import { FC } from 'react';
// import { MapPin } from 'lucide-react';

// interface LocationCardProps {
//   content: string;
//   coordinates?: { lat: number; lng: number }; // Make coordinates optional
//   onOptionsClick?: () => void;
// }

// export const LocationCard: FC<LocationCardProps> = ({ content, coordinates, onOptionsClick }) => {
//   // Add a check for coordinates
//   const coordinatesString = coordinates 
//     ? `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`
//     : "Coordinates not available";

//   return (
//     <div className="location-card p-4 mb-4 relative">
//       <h3 className="font-bold mb-2">Location Sharing</h3>
//       <div className="flex items-center mb-3">
//         <div className="w-16 h-16 mr-4 overflow-hidden rounded-md relative">
//           <div className="bg-green-500 w-full h-full flex items-center justify-center text-white">
//             <MapPin size={24} />
//           </div>
//         </div>
//         <span className="text-blue-600">{content}</span>
//       </div>
//       <div className="flex items-center">
//         <span className="text-gray-600">Coordinates: </span>
//         <span className="text-blue-600 ml-2">{coordinatesString}</span>
//       </div>
//       {/* Rest of component remains the same */}
//     </div>
//   );
// };
import { FC } from 'react';
import { MapPin, MoreVertical } from 'lucide-react';

interface LocationCardProps {
  content: string;
  coordinates?: { lat: number; lng: number };
  onOptionsClick?: () => void;
}

export const LocationCard: FC<LocationCardProps> = ({ content, coordinates, onOptionsClick }) => {
  console.log("coordinates",coordinates)
  const coordinatesString = coordinates
    ? `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`
    : "Coordinates not available";

  return (
    <div className="location-card p-5 mb-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow relative">
      {/* Options button (top-right corner) */}
      {onOptionsClick && (
        <button
          onClick={onOptionsClick}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <MoreVertical size={20} />
        </button>
      )}

      <h3 className="text-lg font-semibold text-gray-800 mb-3">📍 Location Shared</h3>

      <div className="flex items-center mb-4">
        <div className="w-14 h-14 mr-4 rounded-lg bg-green-500 flex items-center justify-center text-white">
          <MapPin size={24} />
        </div>
        <span className="text-base text-gray-700">{content}</span>
      </div>

      <div className="text-sm text-gray-600">
        <span className="font-medium">Coordinates:</span>
        <span className="text-blue-600 ml-2">{coordinatesString}</span>
      </div>
    </div>
  );
};
