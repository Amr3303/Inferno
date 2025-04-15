import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BroadcastMessages from "../components/BroadcastMessages";
import MessageForm from "../components/MessageForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../hooks/useAuth";

interface Broadcast {
  _id: string;
  name: string;
  description: string;
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  agents: string[];
}

const BroadcastPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBroadcast = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/broadcasts/${id}`);
        setBroadcast(response.data.data);
      } catch (err) {
        console.error("Error fetching broadcast:", err);
        setError("Failed to load broadcast details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBroadcast();
    }
  }, [id]);

  const isTransmitter = user && broadcast?.createdBy._id === user._id;

  if (loading) {
    return <div className="flex justify-center p-10">Loading broadcast...</div>;
  }

  if (error || !broadcast) {
    return (
      <div className="p-10 text-center text-destructive">
        {error || "Broadcast not found"}
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{broadcast.name}</CardTitle>
              <CardDescription>{broadcast.description}</CardDescription>
            </div>
            <Badge variant={isTransmitter ? "destructive" : "secondary"}>
              {isTransmitter ? "Transmitter" : "Agent"}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <BroadcastMessages broadcastId={id as string} />
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Send Message</h2>
          {isTransmitter ? (
            <MessageForm broadcastId={id as string} />
          ) : (
            <Card className="bg-muted">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Only transmitters can send messages to this broadcast
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BroadcastPage;
