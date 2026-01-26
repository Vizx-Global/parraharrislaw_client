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
import AdvancedPlanDashboard from "@/pages/Questionnaires/AdvancedPlan/DashboardPage";
import HowWeWork from "./pages/HowWeWork";
import Pricing from "./pages/Pricing";
import AdvancedPlanQuestionnaire from '@/pages/Questionnaires/AdvancedPlan/AdvancedCoParentingQuestionnaire';
import DIYToAdvance from '@/pages/Questionnaires/AdvancedPlan/DIYToAdvance';
import AttorneyMessages from "./pages/Dashboard/AttorneyMessages";
import Documents from "./pages/Dashboard/Documents";
import FinancialInfo from "./pages/Dashboard/FinancialInfo";
import Consultation from "./pages/Dashboard/Consultation";
import Billing from "./pages/Dashboard/Billing";
import Support from "./pages/Dashboard/Support";

const queryClient = new QueryClient();

const handleQuestionnaireComplete = (formData: any) => {
  console.log('Questionnaire completed for Advanced Plan:', formData);
};

const handleAutoSave = (draftData: any) => {
  console.log('Auto-saving draft for Advanced Plan:', draftData);
};

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
          <Route path="/attorneys" element={<Attorneys />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/advance-plan-dashboard" element={<AdvancedPlanDashboard />} />
          <Route path="/dashboard/parenting-plan/questionnaire" element={<AdvancedPlanQuestionnaire onComplete={handleQuestionnaireComplete} onSaveDraft={handleAutoSave} />} />
          <Route path="/dashboard/messages" element={<AttorneyMessages />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/financial" element={<FinancialInfo />} />
          <Route path="/dashboard/consultation" element={<Consultation />} />
          <Route path="/dashboard/billing" element={<Billing />} />
          <Route path="/dashboard/support" element={<Support />} />
          <Route path="/advance-plan" element={<DIYToAdvance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ScrollToTopButton />
      <ChatBubble />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;