import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';

// Enhanced loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
    
    <div className="relative z-10 flex flex-col items-center gap-6">
      {/* Animated spinner */}
      <div className="relative">
        <motion.div 
          className="w-16 h-16 rounded-full border-4 border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-2 w-12 h-12 rounded-full border-2 border-transparent border-b-primary/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Loading text */}
      <motion.div 
        className="flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, i) => (
          <motion.span
            key={i}
            className="text-muted-foreground text-sm font-medium"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          className="text-muted-foreground text-sm"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ...
        </motion.span>
      </motion.div>
    </div>
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
const Shop = lazy(() => import('@/pages/Shop'));
const Community = lazy(() => import('@/pages/Community'));
const ProfileEditor = lazy(() => import('@/pages/ProfileEditor'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Messages = lazy(() => import('@/pages/Messages'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const PortfolioManagerPage = lazy(() => import('@/pages/PortfolioManager'));
const ProjectBriefs = lazy(() => import('@/pages/ProjectBriefs'));
const Onboarding = lazy(() => import('@/pages/Onboarding'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Jobs = lazy(() => import('@/pages/Jobs'));
const Workspace = lazy(() => import('@/pages/Workspace'));
const ArtistSearch = lazy(() => import('@/pages/ArtistSearch'));
const CompanyProfile = lazy(() => import('@/pages/CompanyProfile'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/portfolio" element={<MainLayout><Portfolio /></MainLayout>} />
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
        <Route path="/shop" element={<MainLayout><Shop /></MainLayout>} />
        <Route path="/community" element={<MainLayout><Community /></MainLayout>} />
        <Route path="/profile/edit" element={<MainLayout><ProfileEditor /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/messages" element={<MainLayout><Messages /></MainLayout>} />
        <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
        <Route path="/portfolio-manager" element={<MainLayout><PortfolioManagerPage /></MainLayout>} />
        <Route path="/projects" element={<MainLayout><ProjectBriefs /></MainLayout>} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
        <Route path="/jobs" element={<MainLayout><Jobs /></MainLayout>} />
        <Route path="/workspace/:id" element={<MainLayout><Workspace /></MainLayout>} />
        <Route path="/artists" element={<MainLayout><ArtistSearch /></MainLayout>} />
        <Route path="/company/:slug" element={<MainLayout><CompanyProfile /></MainLayout>} />
        <Route path="/admin" element={<MainLayout><AdminDashboard /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
