
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
import ScrollToTop from "./components/ScrollToTop";

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

const ScrollToTopOnNavigate = ({ children }: { children: React.ReactNode }) => {
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
          <ScrollToTop showBelow={400} />
          <Routes>
            <Route 
              path="/" 
              element={
                <ScrollToTopOnNavigate>
                  <Index />
                </ScrollToTopOnNavigate>
              } 
            />
            <Route 
              path="/vfx-research" 
              element={
                <ScrollToTopOnNavigate>
                  <VFXResearch />
                </ScrollToTopOnNavigate>
              } 
            />
            <Route 
              path="/vfx-industry-insights" 
              element={
                <ScrollToTopOnNavigate>
                  <VFXIndustryInsights />
                </ScrollToTopOnNavigate>
              } 
            />
            <Route 
              path="/pricing" 
              element={
                <ScrollToTopOnNavigate>
                  <Pricing />
                </ScrollToTopOnNavigate>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route 
              path="*" 
              element={
                <ScrollToTopOnNavigate>
                  <NotFound />
                </ScrollToTopOnNavigate>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
