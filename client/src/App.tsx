
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateBroadcastPage } from "./pages/CreateBroadcastPage";
import { JoinBroadcastPage } from "./pages/JoinBroadcastPage";
import { MessagesPage } from "./pages/broadcast/MessagesPage";
import { TextPage } from "./pages/broadcast/TextPage";
import { LocationPage } from "./pages/broadcast/LocationPage";
import { ProcessBarPage } from "./pages/broadcast/ProcessBarPage";
import { QueryPage } from "./pages/broadcast/QueryPage";
import NotFound from "./pages/NotFound";
import { WebSocketProvider } from './contexts/WebSocketContext';
import { useParams } from 'react-router-dom';

const queryClient = new QueryClient();

// Create a wrapper for broadcast pages
const BroadcastWrapper = ({ children }) => {
  const { userId, broadcastId } = useParams();
  
  if (!userId || !broadcastId) {
    return children;
  }

  return (
    <WebSocketProvider userId={userId} broadcastId={broadcastId}>
      {children}
    </WebSocketProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/broadcast/create" element={<CreateBroadcastPage />} />
          <Route path="/broadcast/join" element={<JoinBroadcastPage />} />
          
          {/* Wrap broadcast pages with WebSocket provider */}
          <Route path="/broadcast/:broadcastId/messages" 
            element={<BroadcastWrapper><MessagesPage /></BroadcastWrapper>} />
          <Route path="/broadcast/:broadcastId/text" 
            element={<BroadcastWrapper><TextPage /></BroadcastWrapper>} />
          <Route path="/broadcast/:broadcastId/location" 
            element={<BroadcastWrapper><LocationPage /></BroadcastWrapper>} />
          <Route path="/broadcast/:broadcastId/process-bar" 
            element={<BroadcastWrapper><ProcessBarPage /></BroadcastWrapper>} />
          <Route path="/broadcast/:broadcastId/query" 
            element={<BroadcastWrapper><QueryPage /></BroadcastWrapper>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
