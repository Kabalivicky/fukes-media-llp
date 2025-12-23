import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface KineticTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

interface AnimatedLetterProps {
  children: string;
  className?: string;
  delay?: number;
}

/**
 * Kinetic text animation - letters animate in with stagger effect
 * Inspired by award-winning typography from CSSDA winners
 */
export const AnimatedLetters = ({ children, className = '', delay = 0 }: AnimatedLetterProps) => {
  const letters = children.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: '1000px' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ 
            transformStyle: 'preserve-3d',
            display: letter === ' ' ? 'inline' : 'inline-block',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * Word-by-word animation with blur reveal
 */
export const AnimatedWords = ({ children, className = '', delay = 0 }: AnimatedLetterProps) => {
  const words = children.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * Gradient text with animated shine effect
 */
export const GradientText = ({ children, className = '' }: KineticTextProps) => {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
};

/**
 * Text reveal with clip-path animation
 */
export const RevealText = ({ children, className = '', delay = 0 }: KineticTextProps & { delay?: number }) => {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedLetters;
