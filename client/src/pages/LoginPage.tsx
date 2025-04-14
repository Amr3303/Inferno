import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { useToast } from '../hooks/use-toast';
import { getMyBroadcasts } from '../hooks/use-getbroadcast-api';

export const LoginPage: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('API Response:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // **IMPORTANT: Adjust these lines based on the actual structure of your `data` object**
            // **Inspect the `API Response` in your browser's console to find the correct paths**
            try {
                if (typeof localStorage !== 'undefined' && data && data.token && data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                    console.log('Token saved:', localStorage.getItem('token'));
                    console.log('User saved:', localStorage.getItem('user'));
                } else if (typeof localStorage !== 'undefined' && data && data.data && data.data.token && data.data.user) {
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    localStorage.setItem('token', data.data.token);
                    console.log('Token saved:', localStorage.getItem('token'));
                    console.log('User saved:', localStorage.getItem('user'));
                }
                 else {
                    console.warn('localStorage is not available or token/user structure in response is unexpected.');
                    toast({
                        title: "Warning",
                        description: "Local storage is not available or login information structure is incorrect.",
                    });
                }
            } catch (localStorageError) {
                console.error('Error saving to localStorage:', localStorageError);
                toast({
                    title: "Error",
                    description: "Failed to save login information.",
                    variant: "destructive"
                });
            }

            toast({
                title: "Success",
                description: "Logged in successfully!"
            });             
            // تحقق من وجود بثوص
            const broadcasts = await getMyBroadcasts();
            console.log('User broadcasts:', broadcasts);
            console.log('User broadcasts:', broadcasts.length);
            if (broadcasts.length === 0) {
                navigate('/dashboard');
              } else {
                navigate('/broadcast/messages');
              }              
            // navigate('/dashboard');

        } catch (error: any) {
            console.error('Login Error:', error);
            toast({
                title: "Error",
                description: error.message || 'Something went wrong',
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Login">
            <form onSubmit={handleLogin} className="w-full max-w-md">
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
                    {loading ? 'Loading...' : 'Login'}
                </button>

                <div className="text-center mt-4">
                    <Link to="/forgot-password" className="text-blue-500">
                        Did you forget your password?
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};