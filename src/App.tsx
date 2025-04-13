
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import VFXResearch from "./pages/VFXResearch";
import VFXIndustryInsights from "./pages/VFXIndustryInsights";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import HelpCenter from "./pages/HelpCenter";
import HelpCenterCategory from "./pages/HelpCenterCategory";
import ProductionGuidelines from "./pages/ProductionGuidelines";

// Components
import ScrollToTop from "./components/ScrollToTop";
import LoadingIntro from "./components/LoadingIntro";
import EnhancedBackground from "./components/EnhancedBackground";
import GlowEffect from "./components/GlowEffect";
import ParallaxLines from "./components/ParallaxLines";

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

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const App = () => (
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
              
              {/* Background Effects */}
              <EnhancedBackground />
              <GlowEffect />
              <ParallaxLines count={15} opacity={0.03} />
              
              {/* Navigation Controls */}
              <ScrollToTop showBelow={400} />
              
              {/* Page Routes with Transitions */}
              <AnimatePresence mode="wait">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <motion.div
                        key="home"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                      >
                        <Index />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/vfx-research" 
                    element={
                      <motion.div
                        key="vfx-research"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                      >
                        <VFXResearch />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/vfx-industry-insights" 
                    element={
                      <motion.div
                        key="vfx-industry-insights"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                      >
                        <VFXIndustryInsights />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/pricing" 
                    element={
                      <motion.div
                        key="pricing"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                      >
                        <Pricing />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/help-center" 
                    element={
                      <motion.div
                        key="help-center"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                      >
                        <HelpCenter />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/help-center/:categoryId" 
                    element={
                      <motion.div
                        key="help-center-category"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                      >
                        <HelpCenterCategory />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/production-guidelines" 
                    element={
                      <motion.div
                        key="production-guidelines"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                      >
                        <ProductionGuidelines />
                      </motion.div>
                    } 
                  />
                  
                  {/* Catch-all route */}
                  <Route 
                    path="*" 
                    element={
                      <motion.div
                        key="not-found"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                      >
                        <NotFound />
                      </motion.div>
                    } 
                  />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
