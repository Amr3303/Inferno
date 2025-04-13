
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

const queryClient = new QueryClient();

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
          <Route path="/broadcast/messages" element={<MessagesPage />} />
          <Route path="/broadcast/text" element={<TextPage />} />
          <Route path="/broadcast/location" element={<LocationPage />} />
          <Route path="/broadcast/process-bar" element={<ProcessBarPage />} />
          <Route path="/broadcast/query" element={<QueryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
