import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppNav from "./components/AppNav";
import Index from "./pages/Index.tsx";
import Brief from "./pages/Brief.tsx";
import Create from "./pages/Create.tsx";
import Status from "./pages/Status.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="h-screen flex flex-col bg-background">
          <AppNav />
          <Routes>
            <Route path="/" element={<Navigate to="/brief" replace />} />
            <Route path="/brief" element={<Brief />} />
            <Route path="/create" element={<Create />} />
            <Route path="/review" element={<Index />} />
            <Route path="/status" element={<Status />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
