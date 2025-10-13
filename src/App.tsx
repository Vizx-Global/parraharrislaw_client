import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound"; 
import Attorneys from "./pages/Attorneys";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ChatBubble from "@/components/ChatBubble"; 
import SignUpForm from "@/pages/Authentication/Registration";
import SignIn from "@/pages/Authentication/Login";
import DIY from "@/pages/Questionnaires/DIYPlan/InteractiveCoParentingQuestionnaire";
import AdvancedPlan from "@/pages/Questionnaires/AdvancedPlan/AdvancedCoParentingQuestionnaire";


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
          <Route path="/advance-plan" element={<AdvancedPlan />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/attorneys" element={<Attorneys />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </BrowserRouter>
      
      {/* Both components will appear in bottom right */}
      <ScrollToTopButton />
      <ChatBubble />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;