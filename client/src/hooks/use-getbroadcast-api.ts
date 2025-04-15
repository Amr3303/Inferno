// import { useEffect, useState } from 'react';
// import { useToast } from './use-toast';

// interface Broadcast {
//   _id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   // أضف باقي الخصائص إذا كانت موجودة
// }

// interface BroadcastResponse {
//   success: boolean;
//   message: string;
//   data: Broadcast[];
// }

// export const useMyBroadcasts = () => {
//   const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchBroadcasts = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           toast({
//             title: 'خطأ',
//             description: 'يرجى تسجيل الدخول أولًا',
//             variant: 'destructive'
//           });
//           setIsLoading(false);
//           return;
//         }

//         const response = await fetch('https://inferno-neon.vercel.app/api/v1/broadcasts/my', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         const data: BroadcastResponse = await response.json();

//         if (data.success) {
//           setBroadcasts(data.data);
//         } else {
//           toast({
//             title: 'فشل التحميل',
//             description: data.message || 'حدث خطأ أثناء تحميل بيانات البث',
//             variant: 'destructive'
//           });
//         }
//       } catch (error: any) {
//         console.error('Error fetching broadcasts:', error);
//         toast({
//           title: 'خطأ في الاتصال',
//           description: error.message || 'فشل الاتصال بالخادم',
//           variant: 'destructive'
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBroadcasts();
//   }, [toast]);

//   return {
//     broadcasts,
//     isLoading,
//   };
// };
interface Broadcast {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  }
  
  interface BroadcastResponse {
    success: boolean;
    message: string;
    data: Broadcast[];
  }
  
  export const getMyBroadcasts = async (): Promise<Broadcast[] | null> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
  
      const response = await fetch('https://inferno-neon.vercel.app/api/v1/broadcasts/my', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const data: BroadcastResponse = await response.json();
      if (data.success) {
        return data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching broadcasts:', error);
      return null;
    }
  };
  