
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { BroadcastLogo } from '../components/BroadcastLogo';

export const DashboardPage: FC = () => {
  return (
    <AuthLayout>
      <div className="text-center w-full max-w-md">
        <p className="text-xl mb-12 mt-4">
          Welcome to broadcasting platform. You can easily start a new broadcast or
          join an existing one.
        </p>
        
        <div className="flex flex-col space-y-4 mt-8">
          <Link to="/broadcast/create" className="w-full">
            <button className="w-full py-3 px-6 bg-broadcast-blue text-white rounded-md">
              Create Broadcast
            </button>
          </Link>
          
          <Link to="/broadcast/join" className="w-full">
            <button className="w-full py-3 px-6 bg-broadcast-blue text-white rounded-md">
              Join Broadcast
            </button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
