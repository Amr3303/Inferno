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
// import { useState } from 'react';
// import { useToast } from './use-toast';

// export const useMessageApi = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   const sendTextMessage = async (content: string, token: string): Promise<boolean> => {
//     const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
//     const API_ENDPOINT = `https://inferno-neon.vercel.app/api/v1/broadcasts/${BROADCAST_ID}/messages`;
    
//     if (!content.trim()) {
//       toast({
//         title: "Error",
//         description: "Message cannot be empty",
//         variant: "destructive"
//       });
//       return false;
//     }
  
//     if (!token) {
//       toast({
//         title: "Error",
//         description: "No authentication token. Please login first",
//         variant: "destructive"
//       });
//       return false;
//     }

//     if (!BROADCAST_ID) {
//       toast({
//         title: "Error",
//         description: "No broadcast selected. Please select a broadcast first.",
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
//         // Check for 403 error specifically
//         if (response.status === 403) {
//           toast({
//             title: "Error",
//             description: "Authentication failed or you don't have permission to send messages",
//             variant: "destructive"
//           });
//         } else {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return false;
//       }
  
//       const responseText = await response.text();
//       console.log("Response text:", responseText);
//       const data = responseText ? JSON.parse(responseText) : {};
  
//       if (data.success) {
//         return true;
//       } else {
//         toast({
//           description: data.message || "Failed to send message",
//           variant: "destructive"
//         });
//         return false;
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Failed to connect to server",
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
export const useMessageApi = () => {
  const sendTextMessage = async (content: string, token: string) => {
    try {
      const selectedBroadcastId = localStorage.getItem("selectedBroadcastId");
      console.log("Token:", token);
      
      // Change this to use the proxy
      const response = await fetch(`/api/v1/broadcasts/${selectedBroadcastId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          type: "text",
          content
        })
      });
      
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      try {
        // Parse the JSON response properly
        const data = JSON.parse(responseText);
        
        // Check for success using the correct property from your API
        // Note the typo in the API response: "sucess" instead of "success"
        return data.sucess === true;
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        return false;
      }
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  };

  return { sendTextMessage };
};