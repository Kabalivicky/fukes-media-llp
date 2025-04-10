
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Index from "./pages/Index";
import VFXResearch from "./pages/VFXResearch";
import VFXIndustryInsights from "./pages/VFXIndustryInsights";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <ScrollToTop>
                  <Index />
                </ScrollToTop>
              } 
            />
            <Route 
              path="/vfx-research" 
              element={
                <ScrollToTop>
                  <VFXResearch />
                </ScrollToTop>
              } 
            />
            <Route 
              path="/vfx-industry-insights" 
              element={
                <ScrollToTop>
                  <VFXIndustryInsights />
                </ScrollToTop>
              } 
            />
            <Route 
              path="/pricing" 
              element={
                <ScrollToTop>
                  <Pricing />
                </ScrollToTop>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route 
              path="*" 
              element={
                <ScrollToTop>
                  <NotFound />
                </ScrollToTop>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
