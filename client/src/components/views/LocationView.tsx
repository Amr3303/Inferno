import { FC } from 'react';
import { LocationCard } from '../LocationCard';

export const LocationView: FC = () => {
  return (
    <div className="mb-8">
      <LocationCard 
        coordinates="30.0768163914401931.2847391229373"
        onOptionsClick={() => {}}
      />
    </div>
  );
};