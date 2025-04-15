// import { useState } from 'react';

// export const useFetchMessagesType = () => {
//   const [messagesType, setMessages] = useState<any[]>([]);
//   const [loadingType, setLoading] = useState(false);

//   const fetchMessagesType = async (broadcastId: string, token: string, type: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://inferno-neon.vercel.app/api/v1/broadcasts/${broadcastId}/messages?type=${type}`, 
//         {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch messages');
//       }

//       const data = await response.json();
//       setMessages(data.messages || []); // تأكد من أن البيانات تحتوي على الرسائل
//     } catch (error) {
//       console.error("Error fetching messages: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { messagesType, loadingType, fetchMessagesType };
// };
