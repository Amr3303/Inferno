
import { FC } from 'react';
import { MapPin } from 'lucide-react';

interface LocationCardProps {
  coordinates: string;
  onOptionsClick?: () => void;
}

export const LocationCard: FC<LocationCardProps> = ({ coordinates, onOptionsClick }) => {
  return (
    <div className="location-card p-4 mb-4 relative">
      <h3 className="font-bold mb-2">Location Sharing</h3>
      <div className="flex items-center">
        <div className="w-16 h-16 mr-4 overflow-hidden rounded-md relative">
          <div className="bg-green-500 w-full h-full flex items-center justify-center text-white">
            <MapPin size={24} />
          </div>
        </div>
        <span className="text-blue-600">{coordinates}</span>
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
    </div>
  );
};
