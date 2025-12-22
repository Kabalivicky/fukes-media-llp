import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Lazy load all page components for better performance
const Home = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Team = lazy(() => import('@/pages/Team'));
const VFXResearch = lazy(() => import('@/pages/VFXResearch'));
const ContractBuilder = lazy(() => import('@/pages/ContractBuilder'));
const FreelancerPortal = lazy(() => import('@/pages/FreelancerPortal'));
const Auth = lazy(() => import('@/pages/Auth'));
const HelpCenter = lazy(() => import('@/pages/HelpCenter'));
const HelpCenterCategory = lazy(() => import('@/pages/HelpCenterCategory'));
const ProductionGuidelines = lazy(() => import('@/pages/ProductionGuidelines'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const News = lazy(() => import('@/pages/News'));
const ChatAssistant = lazy(() => import('@/pages/ChatAssistant'));
const AITools = lazy(() => import('@/pages/AITools'));
const VideoConverter = lazy(() => import('@/pages/tools/VideoConverter'));
const ImageConverter = lazy(() => import('@/pages/tools/ImageConverter'));
const AudioConverter = lazy(() => import('@/pages/tools/AudioConverter'));
const CodeConverter = lazy(() => import('@/pages/tools/CodeConverter'));
const ColorConverter = lazy(() => import('@/pages/tools/ColorConverter'));
const TextConverter = lazy(() => import('@/pages/tools/TextConverter'));
const DocumentConverter = lazy(() => import('@/pages/tools/DocumentConverter'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Showreel = lazy(() => import('@/pages/Showreel'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const Legal = lazy(() => import('@/pages/Legal'));
const Careers = lazy(() => import('@/pages/Careers'));

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/showreel" element={<MainLayout><Showreel /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/team" element={<MainLayout><Team /></MainLayout>} />
        <Route path="/vfx-research" element={<MainLayout><VFXResearch /></MainLayout>} />
        <Route path="/contract-builder" element={<MainLayout><ContractBuilder /></MainLayout>} />
        <Route path="/freelancer-portal" element={<MainLayout><FreelancerPortal /></MainLayout>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/help-center" element={<MainLayout><HelpCenter /></MainLayout>} />
        <Route path="/help-center/:category" element={<MainLayout><HelpCenterCategory /></MainLayout>} />
        <Route path="/production-guidelines" element={<MainLayout><ProductionGuidelines /></MainLayout>} />
        <Route path="/news" element={<MainLayout><News /></MainLayout>} />
        <Route path="/chat-assistant" element={<MainLayout><ChatAssistant /></MainLayout>} />
        <Route path="/ai-tools" element={<MainLayout><AITools /></MainLayout>} />
        <Route path="/tools/video-converter" element={<MainLayout><VideoConverter /></MainLayout>} />
        <Route path="/tools/image-converter" element={<MainLayout><ImageConverter /></MainLayout>} />
        <Route path="/tools/audio-converter" element={<MainLayout><AudioConverter /></MainLayout>} />
        <Route path="/tools/code-converter" element={<MainLayout><CodeConverter /></MainLayout>} />
        <Route path="/tools/color-converter" element={<MainLayout><ColorConverter /></MainLayout>} />
        <Route path="/tools/text-converter" element={<MainLayout><TextConverter /></MainLayout>} />
        <Route path="/tools/document-converter" element={<MainLayout><DocumentConverter /></MainLayout>} />
        <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
        <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
        <Route path="/legal" element={<MainLayout><Legal /></MainLayout>} />
        <Route path="/careers" element={<MainLayout><Careers /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
