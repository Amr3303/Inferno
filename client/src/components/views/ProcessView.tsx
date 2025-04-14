import { FC } from 'react';
import { ProgressBar } from '../ProgressBar';

export const ProcessView: FC = () => {
  return (
    <div className="mb-8">
      <ProgressBar 
        progress={25} 
        onOptionsClick={() => {}}
      />
    </div>
  );
};