
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import RegisterSuccess from "./pages/RegisterSuccess";
import CustomerDashboard from "./pages/customer/Dashboard";
import NewService from "./pages/customer/NewService";
import TransporterDashboard from "./pages/transporter/Dashboard";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register-success" element={<RegisterSuccess />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/new-service" element={<NewService />} />
            <Route path="/transporter/dashboard" element={<TransporterDashboard />} />
            {/* AÑADIR TODAS LAS RUTAS PERSONALIZADAS ENCIMA DE LA RUTA COMODÍN "*" */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
