import { motion } from 'framer-motion';

// Actual project images from Fuke's Media portfolio
import jailer from '@/assets/projects/jailer-new.jpg';
import kalki from '@/assets/projects/kalki-2898-ad-new.png';
import jawan from '@/assets/projects/jawan-new.png';
import leo from '@/assets/projects/leo-new.jpg';
import kgf from '@/assets/projects/kgf-chapter-2-new.jpg';
import adipurush from '@/assets/projects/adipurush-new.png';
import indian2 from '@/assets/projects/indian-2-new.png';
import salaar from '@/assets/projects/salaar.jpg';
import vikram from '@/assets/projects/vikram.jpg';
import cobra from '@/assets/projects/cobra-new.jpg';
import pushpa from '@/assets/projects/pushpa.jpg';
import bheema from '@/assets/projects/bheema-new.jpg';

const topRow = [
  { src: jailer, title: 'Jailer' },
  { src: kalki, title: 'Kalki 2898 AD' },
  { src: jawan, title: 'Jawan' },
  { src: leo, title: 'Leo' },
  { src: kgf, title: 'KGF Chapter 2' },
  { src: adipurush, title: 'Adipurush' },
];

const bottomRow = [
  { src: indian2, title: 'Indian 2' },
  { src: salaar, title: 'Salaar' },
  { src: vikram, title: 'Vikram' },
  { src: cobra, title: 'Cobra' },
  { src: pushpa, title: 'Pushpa' },
  { src: bheema, title: 'Bheema' },
];

const FilmRow = ({
  items,
  direction,
  speed,
}: {
  items: typeof topRow;
  direction: 'left' | 'right';
  speed: number;
}) => (
  <div
    className="overflow-hidden whitespace-nowrap"
    style={{
      maskImage:
        'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
    }}
  >
    <motion.div
      className="inline-flex gap-3"
      animate={{
        x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {[...items, ...items].map((item, i) => (
        <div
          key={`${item.title}-${i}`}
          className="relative flex-shrink-0 w-[200px] h-[120px] md:w-[280px] md:h-[160px] rounded-lg overflow-hidden group"
        >
          <img
            src={item.src}
            alt={`VFX work on ${item.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute bottom-2 left-3 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
            {item.title}
          </span>
        </div>
      ))}
    </motion.div>
  </div>
);

const ProjectShowcaseStrip = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 space-y-3">
      <FilmRow items={topRow} direction="left" speed={35} />
      <FilmRow items={bottomRow} direction="right" speed={40} />
    </div>
  );
};

export default ProjectShowcaseStrip;
