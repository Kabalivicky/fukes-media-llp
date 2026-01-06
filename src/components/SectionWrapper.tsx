import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'dark' | 'gradient' | 'glass';
  withDivider?: boolean;
  fullHeight?: boolean;
}

const SectionWrapper = ({
  children,
  className = '',
  id,
  variant = 'default',
  withDivider = false,
  fullHeight = false,
}: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variants = {
    default: 'bg-background',
    dark: 'bg-card',
    gradient: 'bg-gradient-to-b from-background via-card/50 to-background',
    glass: 'bg-card/30 backdrop-blur-xl',
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(
        'relative py-24 md:py-32 overflow-hidden',
        variants[variant],
        fullHeight && 'min-h-screen flex items-center',
        className
      )}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {withDivider && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}

      <div className="container mx-auto px-4 relative z-10">
        {children}
      </div>

      {withDivider && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}
    </motion.section>
  );
};

export default SectionWrapper;
