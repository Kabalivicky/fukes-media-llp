
import { motion } from "framer-motion";
import GlowEffect from "@/components/GlowEffect";
import ParallaxLines from "@/components/ParallaxLines";
import FuturisticBackground from "@/components/FuturisticBackground";

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
    <>
      {/* Background Effects */}
      <FuturisticBackground intensity="medium" />
      <GlowEffect />
      <ParallaxLines count={15} opacity={0.03} />
      
      {/* Page Routes with Enhanced Transitions */}
      <motion.div
        key={pageKey}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="page-container"
      >
        {children}
      </motion.div>
    </>
  );
};

export default MainLayout;
