import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MarqueeTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

/**
 * Infinite scrolling marquee text - inspired by Zeit Media's horizontal scrolling elements
 */
const MarqueeText = ({
  children,
  className = '',
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
}: MarqueeTextProps) => {
  const baseVelocity = direction === 'left' ? -speed : speed;

  return (
    <div 
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div
        className={`inline-flex gap-8 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: 50 / (speed / 30),
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* First set */}
        <span className="flex gap-8 items-center">
          {children}
        </span>
        {/* Duplicate for seamless loop */}
        <span className="flex gap-8 items-center" aria-hidden="true">
          {children}
        </span>
      </motion.div>
    </div>
  );
};

/**
 * Vertical marquee for client logos or testimonials
 */
export const VerticalMarquee = ({
  children,
  className = '',
  speed = 30,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}) => {
  return (
    <div 
      className={`overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div
        className="flex flex-col gap-4"
        animate={{
          y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: 50 / (speed / 30),
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* First set */}
        <div className="flex flex-col gap-4">
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex flex-col gap-4" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default MarqueeText;
