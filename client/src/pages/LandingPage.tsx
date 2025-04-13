
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BroadcastLogo } from '../components/BroadcastLogo';
import { AuthLayout } from '../layouts/AuthLayout';

export const LandingPage: FC = () => {
  return (
    <AuthLayout>
      <div className="text-center w-full max-w-md">
        <p className="text-xl mb-12 mt-4">
          Stay in the loop with instant updates! This broadcaster keeps everyone 
          connected with real-time messages, from quick texts to shared locations and 
          progress vibes.
        </p>
        
        <div className="flex flex-col space-y-4 mt-8">
          <Link to="/register" className="w-full">
            <button className="w-full py-3 px-6 bg-broadcast-blue text-white rounded-md">
              Register
            </button>
          </Link>
          
          <Link to="/login" className="text-gray-500 hover:text-gray-700">
            Or Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
