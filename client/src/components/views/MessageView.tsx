import { FC } from 'react';
import { MessageCard } from '../MessageCard';
import { LocationCard } from '../LocationCard';
import { ProgressBar } from '../ProgressBar';

interface MessageViewProps {
  onOptionsClick: () => void;
}

export const MessageView: FC<MessageViewProps> = ({ onOptionsClick }) => {
  return (
    <div className="mb-8 space-y-6">
      <MessageCard onOptionsClick={onOptionsClick}>
        <p className="text-sm leading-relaxed">
          {"نص الرسالة هنا"}
        </p>
      </MessageCard>

      <LocationCard
        coordinates="30.0768163914401931.2847391229373"
        onOptionsClick={onOptionsClick}
      />

      <ProgressBar
        progress={25}
        onOptionsClick={onOptionsClick}
      />
    </div>
  );
};