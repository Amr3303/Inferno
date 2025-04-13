
import { FC } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { LocationCard } from '../../components/LocationCard';

export const LocationPage: FC = () => {
  return (
    <MainLayout showSidebar title="Broadcast Location">
      <LocationCard 
        coordinates="30.0768163914401931.2847391229373"
        onOptionsClick={() => {}}
      />
    </MainLayout>
  );
};
