import { motion } from 'framer-motion';

interface AnimatedHamburgerProps {
  isOpen: boolean;
  toggle: () => void;
}

const AnimatedHamburger = ({ isOpen, toggle }: AnimatedHamburgerProps) => {
  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: (custom: number) => ({
      rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
      y: custom === 1 ? 8 : custom === 3 ? -8 : 0,
      opacity: custom === 2 ? 0 : 1,
      scaleX: custom === 2 ? 0 : 1,
    }),
  };

  return (
    <button
      className="lg:hidden relative p-3 min-w-[44px] min-h-[44px] rounded-md text-foreground/70 hover:text-foreground hover:bg-muted/30 transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={toggle}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
        <motion.span
          className="w-6 h-0.5 bg-current rounded-full origin-center"
          variants={lineVariants}
          animate={isOpen ? 'open' : 'closed'}
          custom={1}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="w-6 h-0.5 bg-current rounded-full origin-center"
          variants={lineVariants}
          animate={isOpen ? 'open' : 'closed'}
          custom={2}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="w-6 h-0.5 bg-current rounded-full origin-center"
          variants={lineVariants}
          animate={isOpen ? 'open' : 'closed'}
          custom={3}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </button>
  );
};

export default AnimatedHamburger;
