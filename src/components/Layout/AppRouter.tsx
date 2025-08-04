
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import Home from '@/pages/Index';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Team from '@/pages/Team';
import Pricing from '@/pages/Pricing';
import AdvancedPricing from '@/pages/AdvancedPricing';
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
import VirtualProduction from '@/pages/VirtualProduction';
import ARVRShowroom from '@/pages/ARVRShowroom';
import MetaStudio from '@/pages/MetaStudio';
import RealTimePipeline from '@/pages/RealTimePipeline';
import AITools from '@/pages/AITools';
import VideoConverter from '@/pages/tools/VideoConverter';
import ImageConverter from '@/pages/tools/ImageConverter';
import AudioConverter from '@/pages/tools/AudioConverter';
import CodeConverter from '@/pages/tools/CodeConverter';
import ColorConverter from '@/pages/tools/ColorConverter';
import TextConverter from '@/pages/tools/TextConverter';
import DocumentConverter from '@/pages/tools/DocumentConverter';
import BlockchainIntegration from '@/components/BlockchainIntegration';
import GamifiedLearning from '@/components/GamifiedLearning';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
      <Route path="/team" element={<MainLayout><Team /></MainLayout>} />
      <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
      <Route path="/advanced-pricing" element={<MainLayout><AdvancedPricing /></MainLayout>} />
      <Route path="/resources" element={<MainLayout><Resources /></MainLayout>} />
      <Route path="/vfx-research" element={<MainLayout><VFXResearch /></MainLayout>} />
      <Route path="/vfx-industry-insights" element={<MainLayout><VFXIndustryInsights /></MainLayout>} />
      <Route path="/contract-builder" element={<MainLayout><ContractBuilder /></MainLayout>} />
      <Route path="/freelancer-portal" element={<MainLayout><FreelancerPortal /></MainLayout>} />
      <Route path="/help-center" element={<MainLayout><HelpCenter /></MainLayout>} />
      <Route path="/help-center/:category" element={<MainLayout><HelpCenterCategory /></MainLayout>} />
      <Route path="/production-guidelines" element={<MainLayout><ProductionGuidelines /></MainLayout>} />
      <Route path="/news" element={<MainLayout><News /></MainLayout>} />
      <Route path="/chat-assistant" element={<MainLayout><ChatAssistant /></MainLayout>} />
      <Route path="/virtual-production" element={<MainLayout><VirtualProduction /></MainLayout>} />
      <Route path="/ar-vr-showroom" element={<MainLayout><ARVRShowroom /></MainLayout>} />
      <Route path="/meta-studio" element={<MainLayout><MetaStudio /></MainLayout>} />
      <Route path="/real-time-pipeline" element={<MainLayout><RealTimePipeline /></MainLayout>} />
      <Route path="/ai-tools" element={<MainLayout><AITools /></MainLayout>} />
      <Route path="/tools/video-converter" element={<MainLayout><VideoConverter /></MainLayout>} />
      <Route path="/tools/image-converter" element={<MainLayout><ImageConverter /></MainLayout>} />
      <Route path="/tools/audio-converter" element={<MainLayout><AudioConverter /></MainLayout>} />
      <Route path="/tools/code-converter" element={<MainLayout><CodeConverter /></MainLayout>} />
      <Route path="/tools/color-converter" element={<MainLayout><ColorConverter /></MainLayout>} />
      <Route path="/tools/text-converter" element={<MainLayout><TextConverter /></MainLayout>} />
      <Route path="/tools/document-converter" element={<MainLayout><DocumentConverter /></MainLayout>} />
      <Route path="/blockchain" element={<MainLayout><BlockchainIntegration /></MainLayout>} />
      <Route path="/learning" element={<MainLayout><GamifiedLearning /></MainLayout>} />
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
};

export default AppRouter;
