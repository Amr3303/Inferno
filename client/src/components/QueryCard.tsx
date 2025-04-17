import { FC } from 'react';

interface QueryCardProps {
  content: {
    query: string;
    details: string;
  };
  onOptionsClick?: () => void;
}

export const QueryCard: FC<QueryCardProps> = ({ content, onOptionsClick }) => {
  return (
    <div className="query-card p-4 mb-4 relative border border-blue-300 rounded-lg bg-blue-50">
      <div className="text-left text-sm">
        <p><span className="font-semibold">Query:</span> {content.query}</p>
        <p><span className="font-semibold">Details:</span> {content.details}</p>
      </div>
      {onOptionsClick && (
        <button 
          onClick={onOptionsClick}
          className="absolute top-2 right-2 p-1"
        >
          <div className="flex flex-col space-y-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>
        </button>
      )}
    </div>
  );
};
