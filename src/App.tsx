import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import LoadingIntro from "./components/LoadingIntro";
import AccessibilityProvider from "./components/AccessibilityProvider";
import { MotionConfig } from "framer-motion";
import CursorFollower from "./components/CursorFollower";
import { AuthProvider } from "./contexts/AuthContext";

// Lazy loaded components for better performance
const AppRouter = lazy(() => import("./components/Layout/AppRouter"));

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
  const [isAppReady, setIsAppReady] = useState(false);
  
  // Check if intro has been seen and set app ready state
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
      setIsAppReady(true);
    } else {
      // Set a timeout as fallback to ensure app loads even if intro fails
      const fallbackTimer = setTimeout(() => {
        setIsAppReady(true);
        sessionStorage.setItem('hasSeenIntro', 'true');
      }, 8000); // 8 second fallback
      
      const quickTimer = setTimeout(() => {
        setIsAppReady(true);
      }, 100);
      
      return () => {
        clearTimeout(fallbackTimer);
        clearTimeout(quickTimer);
      };
    }
  }, []);

  // Global loading fallback component
  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-primary text-xl">Loading...</div>
    </div>
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider defaultTheme="dark">
            <AccessibilityProvider>
              <TooltipProvider>
                <MotionConfig reducedMotion="user">
                  <BrowserRouter>
                    <AuthProvider>
                      <div className="min-h-screen bg-background">
                        {/* Custom Cursor Follower */}
                        <CursorFollower size={24} mixBlendMode="difference" />
                        
                        <Toaster />
                        <Sonner />
                        {/* Loading Intro - Always render but handles its own visibility */}
                        <LoadingIntro />
                        
                        {/* Navigation Controls */}
                        <ScrollToTop showBelow={400} />
                        
                        {/* Main Application Routes - Always render when app is ready */}
                        {isAppReady && (
                          <Suspense fallback={<LoadingFallback />}>
                            <ErrorBoundary>
                              <AppRouter />
                            </ErrorBoundary>
                          </Suspense>
                        )}
                      </div>
                    </AuthProvider>
                  </BrowserRouter>
                </MotionConfig>
              </TooltipProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
