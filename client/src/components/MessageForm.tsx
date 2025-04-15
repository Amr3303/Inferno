import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { toast } from "./ui/use-toast";
import { useAuth } from "../hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface MessageFormProps {
  broadcastId: string;
}

const MessageForm = ({ broadcastId }: MessageFormProps) => {
  const { user } = useAuth();
  const [messageType, setMessageType] = useState<
    "text" | "query" | "location" | "progress"
  >("text");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (!user || !broadcastId) return;

    setIsSubmitting(true);

    try {
      // Prepare message based on type
      let messageData: Record<string, any> = {
        type: messageType,
        broadcast: broadcastId,
      };

      switch (messageType) {
        case "text":
          messageData.content = data.textContent;
          break;

        case "query":
          messageData.content = {
            query: data.queryQuestion,
            details: data.queryDetails,
          };
          break;

        case "location":
          messageData.content = data.locationDescription;
          messageData.coordinates = {
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude),
          };
          break;

        case "progress":
          messageData.content = data.progressDescription;
          messageData.progress = data.progressValue;
          break;
      }

      await axios.post(
        `/api/v1/broadcasts/${broadcastId}/messages`,
        messageData
      );

      toast({
        title: "Message sent",
        description: "Your message has been broadcast successfully",
      });

      // Reset form
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    switch (messageType) {
      case "text":
        return (
          <Textarea
            placeholder="Enter your message"
            className="min-h-[100px]"
            {...register("textContent", {
              required: "Message content is required",
            })}
          />
        );

      case "query":
        return (
          <div className="space-y-4">
            <Input
              placeholder="Question"
              {...register("queryQuestion", {
                required: "Question is required",
              })}
            />
            <Textarea
              placeholder="Additional details"
              className="min-h-[80px]"
              {...register("queryDetails", {
                required: "Details are required",
              })}
            />
          </div>
        );

      case "location":
        return (
          <div className="space-y-4">
            <Input
              placeholder="Location description"
              {...register("locationDescription", {
                required: "Description is required",
              })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                step="0.000001"
                placeholder="Latitude"
                {...register("latitude", {
                  required: "Latitude is required",
                  validate: (value) =>
                    !isNaN(parseFloat(value)) || "Must be a valid number",
                })}
              />
              <Input
                type="number"
                step="0.000001"
                placeholder="Longitude"
                {...register("longitude", {
                  required: "Longitude is required",
                  validate: (value) =>
                    !isNaN(parseFloat(value)) || "Must be a valid number",
                })}
              />
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-4">
            <Input
              placeholder="Progress description"
              {...register("progressDescription", {
                required: "Description is required",
              })}
            />
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>0%</span>
                <span>100%</span>
              </div>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                onValueChange={(value) => setValue("progressValue", value[0])}
              />
              <Input
                type="hidden"
                {...register("progressValue", { required: true })}
                value={50}
              />
            </div>
          </div>
        );
    }
  };

  if (!user) {
    return <p>Please log in to send messages.</p>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Send Broadcast Message</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <Tabs
            defaultValue="text"
            onValueChange={(value) => setMessageType(value as any)}
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="query">Query</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            <TabsContent value={messageType} className="pt-4">
              {renderFormFields()}
              {errors[`${messageType}Content`] && (
                <p className="text-sm text-destructive mt-1">
                  {errors[`${messageType}Content`]?.message as string}
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MessageForm;
