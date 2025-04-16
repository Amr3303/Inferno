import { useState } from 'react';
import { useToast } from './use-toast';

interface MessageResponse {
  success: boolean;
  message: string;
  data?: {
    type: string;
    content: string;
    createdBy: string;
    broadcast: string;
    progress: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const useProgressApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Get token from localStorage
  const token = localStorage.getItem('token');

  const sendProgressMessage = async (content: string, progress: number): Promise<boolean> => {
    // Broadcast ID from localStorage
    const BROADCAST_ID = localStorage.getItem("selectedBroadcastId");
    
    // Change this to use the proxy
    const API_ENDPOINT = `/api/v1/broadcasts/${BROADCAST_ID}/messages`;
    
    if (!content.trim() || progress < 0 || progress > 100) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال وصف وتحديد نسبة تقدم صحيحة (من 0 إلى 100)",
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
          type: "progress",
          content,
          progress
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
          description: "تم إرسال التقدم بنجاح!"
        });
        return true;
      } else {
        toast({
          title: "خطأ",
          description: data.message || "فشل إرسال التقدم",
          variant: "destructive"
        });
        return false;
      }
    } catch (error: any) {
      console.error("خطأ في إرسال التقدم:", error);
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
    sendProgressMessage,
    isLoading
  };
};
