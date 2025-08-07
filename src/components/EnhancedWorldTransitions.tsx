import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface WorldTransitionProps {
  children: ReactNode;
}


const EnhancedWorldTransitions = ({ children }: WorldTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {

    // Enhanced GSAP transition with 3D camera movement
    if (containerRef.current) {
      gsap.timeline()
        .set(containerRef.current, { 
          rotationY: -15, 
          scale: 0.9, 
          filter: 'blur(5px) brightness(0.7)' 
        })
        .to(containerRef.current, {
          rotationY: 0,
          scale: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 1.5,
          ease: "power3.out"
        });
    }
  }, [location.pathname]);

  // Advanced parallax effects
  const contentScale = useTransform(scrollY, [0, 200], [1, 0.95]);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotateY: -20,
      filter: 'blur(20px)',
      transformOrigin: 'center'
    },
    in: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 20,
        duration: 1.2
      }
    },
    out: {
      opacity: 0,
      scale: 1.1,
      rotateY: 20,
      filter: 'blur(20px)',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.6
      }
    }
  };

  const worldTransitionVariants = {
    initial: { scaleX: 0, opacity: 0 },
    in: { 
      scaleX: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    },
    out: { 
      scaleX: 0, 
      opacity: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Enhanced Environment Layer - Now handled in Enhanced3DSceneManager */}

      {/* World Transition Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${location.pathname}-overlay`}
          variants={worldTransitionVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/30 to-accent/20"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
              transformOrigin: 'left center'
            }}
          />
          
          {/* Neural scan lines effect */}
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            style={{
              background: 'linear-gradient(45deg, transparent 48%, rgba(0, 87, 183, 0.1) 49%, rgba(0, 87, 183, 0.1) 51%, transparent 52%)',
              backgroundSize: '20px 20px'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content with Enhanced Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          ref={containerRef}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          style={{ 
            scale: contentScale,
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
          className="relative z-10 min-h-screen"
        >
          {/* Content wrapper with depth */}
          <motion.div
            initial={{ z: -100 }}
            animate={{ z: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Advanced Progress Indicator */}
      <motion.div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-md rounded-full px-6 py-3">
          <div className="text-xs text-white/80 font-mono">
            ROUTE: {location.pathname === '/' ? 'HOME' : location.pathname.slice(1).toUpperCase()}
          </div>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="text-xs text-white/60">
            TRANSITION_ACTIVE
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedWorldTransitions;