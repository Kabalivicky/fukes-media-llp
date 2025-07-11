import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotateY: -15,
  },
  in: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  out: {
    opacity: 0,
    scale: 1.2,
    rotateY: 15,
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8
};

const slideVariants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  in: {
    x: 0,
    opacity: 1,
  },
  out: {
    x: '-100%',
    opacity: 0,
  }
};

const wipeVariants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
  },
  in: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
  },
  out: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
  }
};

const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`min-h-screen ${className}`}
        style={{ transformOrigin: 'center', perspective: '1000px' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;