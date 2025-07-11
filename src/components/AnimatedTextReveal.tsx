import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextRevealProps {
  text: string;
  className?: string;
  type?: 'words' | 'lines' | 'letters';
  stagger?: number;
  delay?: number;
}

const AnimatedTextReveal = ({ 
  text, 
  className = '', 
  type = 'words', 
  stagger = 0.1, 
  delay = 0 
}: AnimatedTextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  };

  const renderContent = () => {
    if (type === 'letters') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{ 
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d' 
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    }

    if (type === 'words') {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block mr-2"
          style={{ 
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d' 
          }}
        >
          {word}
        </motion.span>
      ));
    }

    if (type === 'lines') {
      return text.split('\n').map((line, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="block overflow-hidden"
          style={{ 
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d' 
          }}
        >
          {line}
        </motion.div>
      ));
    }

    return text;
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: '1000px' }}
    >
      {renderContent()}
    </motion.div>
  );
};

export default AnimatedTextReveal;