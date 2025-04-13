
import { FC } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { MessageCard } from '../../components/MessageCard';

export const QueryPage: FC = () => {
  return (
    <MainLayout showSidebar title="Broadcast Query">
      <MessageCard onOptionsClick={() => {}}>
        <h3 className="font-bold mb-2">Query</h3>
        <p>
          ...............................................................................
          ...............................................................................
          ...............................................................................
        </p>
      </MessageCard>
    </MainLayout>
  );
};
