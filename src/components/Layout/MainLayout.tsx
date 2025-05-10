
import { motion } from "framer-motion";
import GlowEffect from "@/components/GlowEffect";
import ParallaxLines from "@/components/ParallaxLines";
import FuturisticBackground from "@/components/FuturisticBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  pageKey: string;
}

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const MainLayout = ({ children, pageKey }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Effects */}
      <FuturisticBackground intensity="medium" />
      <GlowEffect />
      <ParallaxLines count={15} opacity={0.03} />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Page Content with Enhanced Transitions */}
      <motion.main
        key={pageKey}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="flex-grow"
      >
        {children}
      </motion.main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
