
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./MainLayout";
import { useEffect } from "react";

// Pages
import Index from "@/pages/Index";
import VFXResearch from "@/pages/VFXResearch";
import VFXIndustryInsights from "@/pages/VFXIndustryInsights";
import Pricing from "@/pages/Pricing";
import NotFound from "@/pages/NotFound";
import HelpCenter from "@/pages/HelpCenter";
import HelpCenterCategory from "@/pages/HelpCenterCategory";
import ProductionGuidelines from "@/pages/ProductionGuidelines";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Resources from "@/pages/Resources";
import ContractBuilder from "@/pages/ContractBuilder";
import FreelancerPortal from "@/pages/FreelancerPortal";
import Team from "@/pages/Team";

const AppRouter = () => {
  const location = useLocation();

  // Handle scroll restoration
  useEffect(() => {
    // Skip scroll restoration for anchor links
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout pageKey="home"><Index /></MainLayout>} />
        <Route path="/about" element={<MainLayout pageKey="about"><About /></MainLayout>} />
        <Route path="/services" element={<MainLayout pageKey="services"><Services /></MainLayout>} />
        <Route path="/resources" element={<MainLayout pageKey="resources"><Resources /></MainLayout>} />
        <Route path="/vfx-research" element={<MainLayout pageKey="vfx-research"><VFXResearch /></MainLayout>} />
        <Route path="/vfx-industry-insights" element={<MainLayout pageKey="vfx-industry-insights"><VFXIndustryInsights /></MainLayout>} /> 
        <Route path="/pricing" element={<MainLayout pageKey="pricing"><Pricing /></MainLayout>} />
        <Route path="/contract-builder" element={<MainLayout pageKey="contract-builder"><ContractBuilder /></MainLayout>} />
        <Route path="/freelancer-portal" element={<MainLayout pageKey="freelancer-portal"><FreelancerPortal /></MainLayout>} />
        <Route path="/team" element={<MainLayout pageKey="team"><Team /></MainLayout>} />
        <Route path="/help-center" element={<MainLayout pageKey="help-center"><HelpCenter /></MainLayout>} />
        <Route path="/help-center/:categoryId" element={<MainLayout pageKey="help-center-category"><HelpCenterCategory /></MainLayout>} />
        <Route path="/production-guidelines" element={<MainLayout pageKey="production-guidelines"><ProductionGuidelines /></MainLayout>} />
        <Route path="*" element={<MainLayout pageKey="not-found"><NotFound /></MainLayout>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
