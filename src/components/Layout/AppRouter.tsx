
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Index';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Team from '@/pages/Team';
import Pricing from '@/pages/Pricing';
import Resources from '@/pages/Resources';
import VFXResearch from '@/pages/VFXResearch';
import VFXIndustryInsights from '@/pages/VFXIndustryInsights';
import ContractBuilder from '@/pages/ContractBuilder';
import FreelancerPortal from '@/pages/FreelancerPortal';
import HelpCenter from '@/pages/HelpCenter';
import HelpCenterCategory from '@/pages/HelpCenterCategory';
import ProductionGuidelines from '@/pages/ProductionGuidelines';
import NotFound from '@/pages/NotFound';
import News from '@/pages/News';
import ChatAssistant from '@/pages/ChatAssistant';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/team" element={<Team />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/vfx-research" element={<VFXResearch />} />
      <Route path="/vfx-industry-insights" element={<VFXIndustryInsights />} />
      <Route path="/contract-builder" element={<ContractBuilder />} />
      <Route path="/freelancer-portal" element={<FreelancerPortal />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/help-center/:category" element={<HelpCenterCategory />} />
      <Route path="/production-guidelines" element={<ProductionGuidelines />} />
      <Route path="/news" element={<News />} />
      <Route path="/chat-assistant" element={<ChatAssistant />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
