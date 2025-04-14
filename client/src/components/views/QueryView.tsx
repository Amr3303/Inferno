import { FC } from 'react';
import { MessageCard } from '../MessageCard';

export const QueryView: FC = () => {
  return (
    <div className="mb-8">
      <MessageCard onOptionsClick={() => {}}>
        <h3 className="font-bold mb-2">استعلام</h3>
        <p>
          ...............................................................................
          ...............................................................................
          ...............................................................................
        </p>
      </MessageCard>
    </div>
  );
};