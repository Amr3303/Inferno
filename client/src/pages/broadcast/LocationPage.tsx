import { FC } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { LocationCard } from '../../components/LocationCard';

export const LocationPage: FC = () => {
  return (
    <MainLayout showSidebar title="Broadcast Location">
      <LocationCard 
        content='test'
        coordinates={{ lat: 30.100833311940708, lng: 31.19967536522449 }} // تحديد الإحداثيات هنا
        onOptionsClick={() => {
          // إضافة وظيفة عند الضغط على الزر
        }}
      />
    </MainLayout>
  );
};
