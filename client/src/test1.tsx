// import { FC, useState } from 'react';
// import { X } from 'lucide-react';
// import { useToast } from '../../hooks/use-toast';
// import { useQueryApi } from '../../hooks/use-query-api';


// interface AddQueryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   queryName: string;
//   setQueryName: React.Dispatch<React.SetStateAction<string>>;
//   queryDescription: string;
//   setQueryDescription: React.Dispatch<React.SetStateAction<string>>;
//   onSubmit: () => void;
// }

// interface MessageResponse {
//   success: boolean;
//   message: string;
//   data?: {
//     type: string;
//     content: string;
//     createdBy: string;
//     broadcast: string;
//     _id: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   };
// }


// export const AddQueryModal: FC<AddQueryModalProps> = ({ isOpen, onClose }) => {
//   const [queryName, setQueryName] = useState('');
//   const [queryDescription, setQueryDescription] = useState('');
//   const { toast } = useToast();
//   const { sendQueryMessage } = useQueryApi();
//   const token = localStorage.getItem('token'); // أو authToken حسب ما حفظته
//   const [isLoading, setIsLoading] = useState(false);


//   // const handleSendQuery = async () => {
//   //   if (!queryName.trim() || !queryDescription.trim()) {
//   //     toast({
//   //       title: "خطأ",
//   //       description: "الرجاء ملء جميع الحقول",
//   //       variant: "destructive"
//   //     });
//   //     return;
//   //   }

//   //   const success = await sendQueryMessage(queryName, queryDescription, token);

//   //   if (success) {
//   //     toast({
//   //       title: "نجاح",
//   //       description: "تم إضافة الاستعلام بنجاح!"
//   //     });
//   //     setQueryName('');
//   //     setQueryDescription('');
//   //     onClose();
//   //   } else {
//   //     toast({
//   //       title: "خطأ",
//   //       description: "فشل في إرسال الاستعلام",
//   //       variant: "destructive"
//   //     });
//   //   }
//   // };
//   // const handleSendQuery = async () => {
//   //   if (!queryName.trim() || !queryDescription.trim()) {
//   //     toast({
//   //       title: "خطأ",
//   //       description: "الرجاء ملء جميع الحقول",
//   //       variant: "destructive"
//   //     });
//   //     return;
//   //   }
  
//   //   setIsLoading(true);
//   //   try {
//   //     const response = await fetch('https://inferno-neon.vercel.app/api/v1/broadcasts/67f86af3b4f8989bb8402f01/messages', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         Authorization: `Bearer ${token}`
//   //       },
//   //       body: JSON.stringify({ name: queryName, description: queryDescription })
//   //     });
  
//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }
  
//   //     const responseText = await response.text();
//   //     console.log("Response text:", responseText);
//   //     const data: MessageResponse = responseText ? JSON.parse(responseText) : {};
  
//   //     if (data.success) {
//   //       toast({
//   //         title: "نجاح",
//   //         description: "تم إرسال الرسالة بنجاح!"
//   //       });
//   //       setQueryName('');
//   //       setQueryDescription('');
//   //       onClose();
//   //     } else {
//   //       toast({
//   //         description: data.message || "فشل إرسال الرسالة"
//   //       });
//   //     }
//   //   } catch (error: any) {
//   //     console.error("خطأ في إرسال الرسالة:", error);
//   //     toast({
//   //       title: "خطأ",
//   //       description: error.message || "فشل الاتصال بالخادم",
//   //       variant: "destructive"
//   //     });
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const handleSendQuery = async () => {
//     if (!queryName.trim() || !queryDescription.trim()) {
//       toast({
//         title: "خطأ",
//         description: "الرجاء ملء جميع الحقول",
//         variant: "destructive"
//       });
//       return;
//     }
  
//     setIsLoading(true);
//     try {
//       const response = await fetch('https://inferno-neon.vercel.app/api/v1/broadcasts/67f86af3b4f8989bb8402f01/messages', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           type: "query",
//           content: {
//             query: queryName,
//             details: queryDescription
//           }
//         })
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const responseText = await response.text();
//       console.log("Response text:", responseText);
//       const data: MessageResponse = responseText ? JSON.parse(responseText) : {};
  
//       if (data.success) {
//         toast({
//           title: "نجاح",
//           description: "تم إرسال الرسالة بنجاح!"
//         });
//         setQueryName('');
//         setQueryDescription('');
//         onClose();
//       } else {
//         toast({
//           description: data.message || "فشل إرسال الرسالة"
//         });
//       }
//     } catch (error: any) {
//       console.error("خطأ في إرسال الرسالة:", error);
//       toast({
//         title: "خطأ",
//         description: error.message || "فشل الاتصال بالخادم",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">إضافة استعلام</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             اسم الاستعلام
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               value={queryName}
//               onChange={(e) => setQueryName(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md w-full"
//               placeholder="أدخل اسم الاستعلام"
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             وصف الاستعلام
//           </label>
//           <div className="relative">
//             <textarea
//               value={queryDescription}
//               onChange={(e) => setQueryDescription(e.target.value)}
//               className="p-3 border border-gray-300 rounded-md w-full"
//               placeholder="أدخل وصف الاستعلام"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <button
//             onClick={handleSendQuery}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             إضافة استعلام
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
// import { FC, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthLayout } from '../layouts/AuthLayout';
// import { useToast } from '../hooks/use-toast';

// export const LoginPage: FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!email || !password) {
//       toast({
//         title: "Error",
//         description: "Please fill in all fields",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     // For demo purposes, we'll just check if a user exists in localStorage
//     const userString = localStorage.getItem('user');
    
//     if (userString) {
//       const user = JSON.parse(userString);
      
//       if (user.email === email) {
//         // Successful login
//         toast({
//           title: "Success",
//           description: "Logged in successfully!"
//         });
//         navigate('/dashboard');
//         return;
//       }
//     }
    
//     // Demo mode - allow any login
//     localStorage.setItem('user', JSON.stringify({ email }));
//     navigate('/dashboard');
//   };

//   return (
//     <AuthLayout title="Login">
//       <form onSubmit={handleLogin} className="w-full max-w-md">
//         <div className="mb-4">
//           <label htmlFor="email" className="block mb-2">Gmail</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Email address"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label htmlFor="password" className="block mb-2">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Password"
//           />
//         </div>
        
//         <button 
//           type="submit" 
//           className="w-full py-3 px-6 bg-broadcast-blue text-white rounded-md mt-4"
//         >
//           Login
//         </button>
        
//         <div className="text-center mt-4">
//           <Link to="/forgot-password" className="text-blue-500">
//             Did you forget your password?
//           </Link>
//         </div>
//       </form>
//     </AuthLayout>
//   );
// };
//  

// // export const LoginPage: FC = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const { toast } = useToast();
// //   const navigate = useNavigate();

// //   // const handleLogin = async (e: React.FormEvent) => {
// //   //   e.preventDefault();

// //   //   if (!email || !password) {
// //   //     toast({
// //   //       title: "Error",
// //   //       description: "Please fill in all fields",
// //   //       variant: "destructive"
// //   //     });
// //   //     return;
// //   //   }

// //   //   try {
// //   //     const response = await fetch("https://inferno-neon.vercel.app/api/v1/auth/login", {
// //   //       method: "POST",
// //   //       headers: {
// //   //         "Content-Type": "application/json"
// //   //       },
// //   //       body: JSON.stringify({ email, password })
// //   //     });

// //   //     if (!response.ok) {
// //   //       const errorData = await response.json();
// //   //       toast({
// //   //         title: "Login Failed",
// //   //         description: errorData.message || "Invalid credentials",
// //   //         variant: "destructive"
// //   //       });
// //   //       return;
// //   //     }

// //   //     const data = await response.json();

// //   //     // Save user info and token in localStorage
// //   //     localStorage.setItem('user', JSON.stringify(data.user));
// //   //     localStorage.setItem('token', data.token);

// //   //     toast({
// //   //       title: "Success",
// //   //       description: "Logged in successfully!"
// //   //     });

// //   //     navigate('/dashboard');
// //   //   } catch (error) {
// //   //     toast({
// //   //       title: "Error",
// //   //       description: "Something went wrong. Please try again.",
// //   //       variant: "destructive"
// //   //     });
// //   //   }
// //   // };
// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
  
// //     if (!email || !password) {
// //       toast({
// //         title: "Error",
// //         description: "Please fill in all fields",
// //         variant: "destructive"
// //       });
// //       return;
// //     }
  
// //     try {
// //       const response = await fetch("/api/v1/auth/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({ email, password })
// //       });
      
  
// //       const data = await response.json();
  
// //       if (!response.ok) {
// //         throw new Error(data.message || "Login failed");
// //       }
  
// //       localStorage.setItem('user', JSON.stringify(data.user));
// //       localStorage.setItem('token', data.token);
  
// //       toast({
// //         title: "Success",
// //         description: "Logged in successfully!"
// //       });
  
// //       navigate('/dashboard');
// //     } catch (error: any) {
// //       console.error("Fetch error:", error); // DEBUG هنا
// //       toast({
// //         title: "Network Error",
// //         description: error.message || "Failed to fetch data from server.",
// //         variant: "destructive"
// //       });
// //     }
// //   };
   

// //   return (
// //     <AuthLayout title="Login">
// //       <form onSubmit={handleLogin} className="w-full max-w-md">
// //         <div className="mb-4">
// //           <label htmlFor="email" className="block mb-2">Gmail</label>
// //           <input
// //             id="email"
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded"
// //             placeholder="Email address"
// //           />
// //         </div>

// //         <div className="mb-6">
// //           <label htmlFor="password" className="block mb-2">Password</label>
// //           <input
// //             id="password"
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded"
// //             placeholder="Password"
// //           />
// //         </div>

// //         <button 
// //           type="submit" 
// //           className="w-full py-3 px-6 bg-broadcast-blue text-white rounded-md mt-4"
// //         >
// //           Login
// //         </button>

// //         <div className="text-center mt-4">
// //           <Link to="/forgot-password" className="text-blue-500">
// //             Did you forget your password?
// //           </Link>
// //         </div>
// //       </form>
// //     </AuthLayout>
// //   );
// // };
// import { FC, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthLayout } from '../layouts/AuthLayout';
// import { useToast } from '../hooks/use-toast';

// export const LoginPage: FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast({
//         title: "Error",
//         description: "Please fill in all fields",
//         variant: "destructive"
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log('API Response:', data); // Check if the token is in the response


//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }

//       // localStorage.setItem('user', JSON.stringify(data.user));
//       // localStorage.setItem('token', data.token);
//       // console.log('token', localStorage.getItem('token'));
//       // console.log('user', localStorage.getItem('user'));
//       try {
//         localStorage.setItem('user', JSON.stringify(data.user));
//         localStorage.setItem('token', data.token);
//         console.log('Token saved:', localStorage.getItem('token'));
//         console.log('User saved:', localStorage.getItem('user'));
//       } catch (error) {
//         console.error('Error saving to localStorage:', error);
//       }
//       console.log('User:', data.user);
//       console.log('Token:', data.token);
// if (typeof localStorage !== "undefined") {
//   // يمكنك استخدام localStorage هنا
// } else {
//   console.log("localStorage is not available in this environment.");
// }
//       toast({
//         title: "Success",
//         description: "Logged in successfully!"
//       });

//       navigate('/dashboard');
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || 'Something went wrong',
//         variant: "destructive"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout title="Login">
//       <form onSubmit={handleLogin} className="w-full max-w-md">
//         <div className="mb-4">
//           <label htmlFor="email" className="block mb-2">Gmail</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Email address"
//             disabled={loading}
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="password" className="block mb-2">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Password"
//             disabled={loading}
//           />
//         </div>

//         <button 
//           type="submit" 
//           className={`w-full py-3 px-6 bg-broadcast-blue text-white rounded-md mt-4 transition-opacity duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={loading}
//         >
//           {loading ? 'Loading...' : 'Login'}
//         </button>

//         <div className="text-center mt-4">
//           <Link to="/forgot-password" className="text-blue-500">
//             Did you forget your password?
//           </Link>
//         </div>
//       </form>
//     </AuthLayout>
//   );
// };
