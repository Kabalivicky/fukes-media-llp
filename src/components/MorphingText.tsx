import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MorphingTextProps {
  words: string[];
  className?: string;
  duration?: number;
  stagger?: number;
}

const MorphingText = ({ 
  words, 
  className = '', 
  duration = 3000,
  stagger = 100
}: MorphingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = words[currentIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Typing animation
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, duration);
      }
    } else {
      // Deleting animation
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        // Finished deleting, move to next word
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isTyping, words, duration]);

  return (
    <div className={cn('relative inline-block', className)}>
      <motion.span
        key={displayText}
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {displayText.split('').map((char, index) => (
          <motion.span
            key={`${currentIndex}-${index}`}
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.03,
              ease: 'easeOut'
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
      
      {/* Cursor */}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-primary ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
    </div>
  );
};

export default MorphingText;