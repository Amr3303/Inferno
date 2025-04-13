
import { FC } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { ProgressBar } from '../../components/ProgressBar';

export const ProcessBarPage: FC = () => {
  return (
    <MainLayout showSidebar title="Broadcast Process bar">
      <ProgressBar 
        progress={25} 
        onOptionsClick={() => {}}
      />
    </MainLayout>
  );
};
