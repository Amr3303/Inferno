
import { FC, ReactNode } from 'react';
import { BroadcastLogo } from '../components/BroadcastLogo';
import { Menu } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="flex items-center">
          <BroadcastLogo size="sm" />
        </div>
        <button className="p-2">
          <Menu size={24} />
        </button>
      </header>
      
      {title && (
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      )}
      
      <main className="max-w-md mx-auto p-4 flex flex-col items-center">
        <div className="my-8">
          <BroadcastLogo size="lg" />
        </div>
        {children}
      </main>
    </div>
  );
};
