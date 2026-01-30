import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Compare from "./pages/Compare";
import PersonalLoans from "./pages/PersonalLoans";
import FDRSavings from "./pages/FDRSavings";
import Banks from "./pages/Banks";
import Guides from "./pages/Guides";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import PasswordReset from "./pages/PasswordReset";
import Premium from "./pages/Premium";
import MonthlyPicks from "./pages/MonthlyPicks";
import Eligibility from "./pages/Eligibility";
import SignUp from "./pages/SignUp";
import CardDetails from "./pages/CardDetails";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import FinancialTips from "./pages/FinancialTips";
import HelpCenter from "./pages/HelpCenter";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CardQuiz from "./pages/CardQuiz";
import CreditCardCostCalculator from "./components/calculators/CreditCardCostCalculator";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/loans" element={<PersonalLoans />} />
            <Route path="/savings" element={<FDRSavings />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/tips" element={<FinancialTips />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/newsletter" element={<MonthlyPicks />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cards/:id" element={<CardDetails />} />
            <Route path="/quiz" element={<CardQuiz />} />
            <Route path="/tools/calculator" element={<div className="container py-10 max-w-4xl"><CreditCardCostCalculator /></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
