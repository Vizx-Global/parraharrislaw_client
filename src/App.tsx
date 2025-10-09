import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound"; 
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ChatBubble from "@/components/ChatBubble"; 
import SignUpForm from "@/pages/Authentication/Registration";
import SignIn from "@/pages/Authentication/Login";
import DIY from "@/pages/Questionnaires/DIY";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/diy-plan" element={<DIY />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Both components will appear in bottom right */}
      <ScrollToTopButton />
      <ChatBubble />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;