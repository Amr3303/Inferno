import { FC } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { ProgressCard } from '../../components/ProgressBar';

export const ProcessBarPage: FC = () => {
  return (
    <MainLayout showSidebar title="Broadcast Process bar">
      <ProgressCard
      content='Progress Bar'
        progress={25} 
      />
    </MainLayout>
  );
};
