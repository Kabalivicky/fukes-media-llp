
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import VFXResearch from "./pages/VFXResearch";
import VFXIndustryInsights from "./pages/VFXIndustryInsights";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import HelpCenter from "./pages/HelpCenter";
import HelpCenterCategory from "./pages/HelpCenterCategory";
import ProductionGuidelines from "./pages/ProductionGuidelines";
import ScrollToTop from "./components/ScrollToTop";
import LoadingIntro from "./components/LoadingIntro";
import EnhancedBackground from "./components/EnhancedBackground";
import GlowEffect from "./components/GlowEffect";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <LoadingIntro />
              <EnhancedBackground />
              <GlowEffect />
              <ScrollToTop showBelow={400} />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/vfx-research" element={<VFXResearch />} />
                <Route path="/vfx-industry-insights" element={<VFXIndustryInsights />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/help-center/:categoryId" element={<HelpCenterCategory />} />
                <Route path="/production-guidelines" element={<ProductionGuidelines />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
