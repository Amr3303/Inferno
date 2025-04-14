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

export const useQueryApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const token = localStorage.getItem('token'); // على سبيل المثال من الـ localStorage
  // دالة لإرسال استعلامات
  const sendQueryMessage = async (query: string, details: string, token: string): Promise<boolean> => {
    if (!query.trim() || !details.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال الاستعلام والتفاصيل",
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
          type: "query",
          content: {
            query: query,
            details: details,
          }
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
          description: "تم إرسال الاستعلام بنجاح!"
        });
        return true;
      } else {
        toast({
          description: data.message || "فشل إرسال الاستعلام",
        });
        return false;
      }
    } catch (error) {
      console.error("خطأ في إرسال الاستعلام:", error);
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
    sendQueryMessage,
    isLoading,
  };
};
