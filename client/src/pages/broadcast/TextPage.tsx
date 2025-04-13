
import { FC } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { MessageCard } from '../../components/MessageCard';

export const TextPage: FC = () => {
  return (
    <MainLayout showSidebar title="Broadcast Text">
      <MessageCard onOptionsClick={() => {}}>
        <p>
          Test Test Test Test Test Test Test Test Test Test Test Test 
          Test Test Test Test Test Test Test Test Test Test Test Test
          Test Test Test Test Test Test Test Test Test Test Test Test
          Test Test Test Test Test Test Test Test Test Test Test Test
        </p>
      </MessageCard>
    </MainLayout>
  );
};
