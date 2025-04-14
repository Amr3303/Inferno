import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { useToast } from '../hooks/use-toast';

export const RegisterPage: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true); // 👈 نبدأ التحميل

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('token', data.data.token);
      
      toast({
        title: 'Success',
        description: 'Account created successfully!',
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false); // 👈 نوقف التحميل
    }
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleRegister} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Username"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Gmail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email address"
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Password"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className={`w-full py-3 px-6 bg-broadcast-blue text-white rounded-md mt-4 transition-opacity duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Register'}
        </button>

        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
