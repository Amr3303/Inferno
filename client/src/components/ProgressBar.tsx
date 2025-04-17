import React from 'react';

interface ProgressCardProps {
  content: string; // المحتوى الذي سيكون عنوان شريط التقدم
  progress: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ content, progress }) => {
  // حساب الدوائر التي يجب أن تكون ممتلئة بناءً على التقدم
  const milestones = [25, 50, 75, 100];
  
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{content}' : {progress}%'</h3>
        <button className="text-xl">•••</button>
      </div>
      
      <div className="relative mt-4 mb-2">
        {/* الخط الأساسي */}
        <div className="h-2 bg-gray-300 rounded-full w-full"></div>
        
        {/* التقدم المملوء */}
        <div 
          className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
        
        {/* دوائر المراحل */}
        <div className="flex justify-between absolute w-full top-1/2 transform -translate-y-1/2">
          {milestones.map((milestone, index) => {
            const isFilled = progress >= milestone;
            const isActive = progress >= milestone && progress < milestones[index + 1];
            
            return (
              <div 
                key={milestone}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transform -translate-x-3
                  ${isFilled ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}
                  ${isActive ? 'ring-4 ring-blue-300' : ''}
                `}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};