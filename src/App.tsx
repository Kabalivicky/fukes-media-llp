
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import AppRouter from "./components/Layout/AppRouter";
import ScrollToTop from "./components/ScrollToTop";
import LoadingIntro from "./components/LoadingIntro";
import ScrollProgressIndicator from "./components/ScrollProgressIndicator";

// Hooks
import useCursorEffect from "./hooks/useCursorEffect";

// Create QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Enable custom cursor effect
  useCursorEffect({
    trailLength: 8,
    trailColor: 'rgba(0, 87, 183, 0.4)',
    trailSize: 6,
    hideNativeCursor: false,
    enabled: true
  });
  
  // After a short delay, mark as loaded to allow animations to start
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                {/* Loading Intro */}
                <LoadingIntro />
                
                {/* Navigation Controls */}
                <ScrollToTop showBelow={400} />
                
                {/* Scroll Progress Indicator */}
                <ScrollProgressIndicator />
                
                {/* Main Application Routes */}
                {isLoaded && <AppRouter />}
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
