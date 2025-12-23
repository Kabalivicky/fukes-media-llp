import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  badge?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Award-winning section heading with kinetic typography
 * Inspired by typographic WOTD winners like Hyakuyozu and Zeit Media
 */
const SectionHeading = ({
  title,
  subtitle,
  align = 'center',
  size = 'lg',
  animated = true,
  badge,
  className = '',
  children,
}: SectionHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const sizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
    xl: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`max-w-4xl mb-16 ${alignClasses[align]} ${className}`}
      variants={animated ? containerVariants : undefined}
      initial={animated ? 'hidden' : undefined}
      animate={animated && isInView ? 'visible' : undefined}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title with gradient underline */}
      <motion.h2
        variants={itemVariants}
        className={`font-display font-bold tracking-tight leading-[1.1] ${sizeClasses[size]}`}
      >
        <span className="relative inline-block">
          {title}
          <motion.span
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </span>
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          style={{ marginLeft: align === 'center' ? 'auto' : undefined, marginRight: align === 'center' ? 'auto' : undefined }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Optional children for extra content */}
      {children && (
        <motion.div variants={itemVariants} className="mt-6">
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SectionHeading;
