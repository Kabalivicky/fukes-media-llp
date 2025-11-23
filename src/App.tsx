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
import PowerOnIntro from "./components/PowerOnIntro";
import AccessibilityProvider from "./components/AccessibilityProvider";
import { MotionConfig } from "framer-motion";

// Lazy loaded components for better performance
const AppRouter = lazy(() => import("./components/Layout/AppRouter"));

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
  const [isPoweredOn, setIsPoweredOn] = useState(
    () => sessionStorage.getItem('powerOnComplete') === 'true'
  );
  const [isAppReady, setIsAppReady] = useState(false);
  
  // Enable custom cursor effect
  useCursorEffect({
    trailLength: 0,
    trailColor: 'rgba(0, 87, 183, 0.0)',
    trailSize: 0,
    hideNativeCursor: false,
    enabled: false
  });
  
  // Set mobile viewport height
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);
  
  // Check if intro has been seen and set app ready state
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
      setIsAppReady(true);
    } else if (isPoweredOn) {
      // After power on, wait for loading intro
      const timer = setTimeout(() => {
        setIsAppReady(true);
        sessionStorage.setItem('hasSeenIntro', 'true');
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isPoweredOn]);

  const handlePowerOnComplete = () => {
    setIsPoweredOn(true);
    sessionStorage.setItem('powerOnComplete', 'true');
  };

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
                <MotionConfig reducedMotion="user" transition={{ duration: 0.3 }}>
                  <div className="min-h-screen bg-background content-loader">
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      {/* Power On Intro - Shows first */}
                      {!isPoweredOn && <PowerOnIntro onComplete={handlePowerOnComplete} />}
                      
                      {/* Loading Intro - Shows after power on */}
                      {isPoweredOn && !isAppReady && <LoadingIntro />}
                      
                      {/* Navigation Controls */}
                      <ScrollToTop showBelow={400} />
                      
                      {/* Main Application Routes - Show when ready */}
                      {isPoweredOn && isAppReady && (
                        <Suspense fallback={<LoadingFallback />}>
                          <ErrorBoundary>
                            <div className="fade-in-up">
                              <AppRouter />
                            </div>
                          </ErrorBoundary>
                        </Suspense>
                      )}
                    </BrowserRouter>
                  </div>
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
