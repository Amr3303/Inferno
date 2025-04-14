import { useState } from 'react';
import { useToast } from './use-toast';

// API endpoints and constants
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

export const useMessageApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const token = localStorage.getItem('token'); // على سبيل المثال من الـ localStorage
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseText = await response.text();
      console.log("Response text:", responseText);
      const data: MessageResponse = responseText ? JSON.parse(responseText) : {};
  
      if (data.success) {
        toast({
          title: "نجاح",
          description: "تم إرسال الرسالة بنجاح!"
        });
        return true;
      } else {
        toast({
          // title: "خطأ",
          description: data.message || "فشل إرسال الرسالة",
          // variant: "destructive"
        });
        return false;
      }
    } catch (error) {
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
}
