
import { motion } from "framer-motion";
import GlowEffect from "@/components/GlowEffect";
import ParallaxLines from "@/components/ParallaxLines";
import FuturisticBackground from "@/components/FuturisticBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";

interface MainLayoutProps {
  children: React.ReactNode;
  pageKey: string;
}

// Enhanced page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const MainLayout = ({ children, pageKey }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Enhanced Background Effects */}
      <FuturisticBackground intensity="medium" />
      <GlowEffect />
      <ParallaxLines count={15} opacity={0.03} />
      
      {/* Decorative elements */}
      <div className="fixed top-[15%] right-[5%] w-64 h-64 rounded-full bg-fukes-blue/5 blur-[80px] animate-pulse-custom" aria-hidden="true"></div>
      <div className="fixed bottom-[20%] left-[8%] w-96 h-96 rounded-full bg-fukes-red/5 blur-[100px] animate-pulse-custom" style={{ animationDelay: '2s' }} aria-hidden="true"></div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-grid-pattern bg-32 opacity-[0.03] pointer-events-none" aria-hidden="true"></div>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Page Content with Enhanced Transitions */}
      <motion.main
        key={pageKey}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="flex-grow relative"
      >
        {children}
      </motion.main>
      
      {/* Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
