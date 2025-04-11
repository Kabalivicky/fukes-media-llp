
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
import HelpCenter from "./pages/HelpCenter";
import HelpCenterCategory from "./pages/HelpCenterCategory";
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
        <div className="min-h-screen bg-background bg-[url('/lovable-uploads/7aa001b2-00ae-4aed-9551-897de83da325.png')] bg-cover bg-center bg-fixed bg-opacity-20">
          <div className="min-h-screen bg-background/80 backdrop-blur-sm">
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
                <Route 
                  path="/help-center" 
                  element={
                    <ScrollToTopOnNavigate>
                      <HelpCenter />
                    </ScrollToTopOnNavigate>
                  } 
                />
                <Route 
                  path="/help-center/:categoryId" 
                  element={
                    <ScrollToTopOnNavigate>
                      <HelpCenterCategory />
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
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
