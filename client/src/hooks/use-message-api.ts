// import { useState } from 'react';
// import { useToast } from './use-toast';

// // API endpoints and constants
// const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
// const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;

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

// export const useMessageApi = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   const token = localStorage.getItem('token'); // على سبيل المثال من الـ localStorage
//   const sendTextMessage = async (content: string, token: string): Promise<boolean> => {
//     if (!content.trim()) {
//       toast({
//         title: "خطأ",
//         description: "الرجاء إدخال رسالة",
//         variant: "destructive"
//       });
//       return false;
//     }
  
//     if (!token) {
//       toast({
//         title: "خطأ",
//         description: "لا يوجد رمز توثيق. الرجاء تسجيل الدخول",
//         variant: "destructive"
//       });
//       return false;
//     }
  
//     setIsLoading(true);
  
//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           type: "text",
//           content: content
//         })
//       });
  
//       if (!response.ok) {
//         // فحص خطأ 403 على وجه التحديد
//         if (response.status === 403) {
//           toast({
//             title: "خطأ",
//             description: "التوثيق فشل أو ليس لديك صلاحيات كافية لإرسال الرسائل",
//             variant: "destructive"
//           });
//         } else {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return false;
//       }
  
//       const responseText = await response.text();
//       console.log("Response text:", responseText);
//       const data: MessageResponse = responseText ? JSON.parse(responseText) : {};
  
//       if (data.success) {
//         toast({
//           title: "نجاح",
//           description: "تم إرسال الرسالة بنجاح!"
//         });
//         return true;
//       } else {
//         toast({
//           description: data.message || "فشل إرسال الرسالة",
//         });
//         return false;
//       }
//     } catch (error) {
//       console.error("خطأ في إرسال الرسالة:", error);
//       toast({
//         title: "خطأ",
//         description: error.message || "فشل الاتصال بالخادم",
//         variant: "destructive"
//       });
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return {
//     sendTextMessage,
//     isLoading,
//   };
// }
import { useState } from 'react';
import { useToast } from './use-toast';
import Pusher from 'pusher-js';

const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;

interface MessageResponse {
  success: boolean;
  message: string;
  data?: {
    type: string;
    content: string;
    createdBy: string;
    broadcast: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// إعداد Pusher
const pusher = new Pusher('7cc17b8ffe1acd631dea', {
  cluster: 'eu',
  forceTLS: true
});

export const useMessageApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const token = localStorage.getItem('token');

  const sendTextMessage = async (content: string, token: string): Promise<boolean> => {
    if (!content.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رسالة",
        variant: "destructive"
      });
      return false;
    }

    if (!token) {
      toast({
        title: "خطأ",
        description: "لا يوجد رمز توثيق. الرجاء تسجيل الدخول",
        variant: "destructive"
      });
      return false;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "text",
          content: content
        })
      });

      if (!response.ok) {
        if (response.status === 403) {
          toast({
            title: "خطأ",
            description: "التوثيق فشل أو ليس لديك صلاحيات كافية لإرسال الرسائل",
            variant: "destructive"
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return false;
      }

      const responseText = await response.text();
      console.log("Response text:", responseText);
      const data: MessageResponse = responseText ? JSON.parse(responseText) : {};

      if (data.success && data.data) {
        toast({
          title: "نجاح",
          description: "تم إرسال الرسالة بنجاح!"
        });

        // بث الرسالة عبر Pusher
        const pusherChannel = pusher.subscribe(`broadcast-${BROADCAST_ID}`);
        pusherChannel.trigger('new-message', {
          message: data.data,
        });

        return true;
      } else {
        toast({
          description: data.message || "فشل إرسال الرسالة",
        });
        return false;
      }
    } catch (error: any) {
      console.error("خطأ في إرسال الرسالة:", error);
      toast({
        title: "خطأ",
        description: error.message || "فشل الاتصال بالخادم",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendTextMessage,
    isLoading,
  };
};
