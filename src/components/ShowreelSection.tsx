import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import showreelThumbnail from '@/assets/projects/kalki-2898-ad.png';

const SHOWREEL_EMBED_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/preview";
const SHOWREEL_VIEW_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/view";

const ShowreelSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="showreel" className="py-20 px-4 bg-muted/10">
      <div className="container mx-auto">
        <SectionTitle
          title="Our Showreel"
          subtitle="60 seconds of award-winning VFX excellence"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mt-12"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary/20 bg-black shadow-2xl">
            {isPlaying ? (
              <>
                <iframe
                  src={SHOWREEL_EMBED_URL}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Fuke's Media Official Showreel 2024"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <a 
                    href={SHOWREEL_VIEW_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white text-sm underline bg-black/50 px-3 py-1 rounded"
                  >
                    Video not loading? Click here to watch on Google Drive
                  </a>
                </div>
              </>
            ) : (
              <div 
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={showreelThumbnail} 
                  alt="Fuke's Media Showreel - Award-winning VFX work featuring Kalki 2898 AD" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-8 shadow-xl"
                    >
                      <Play className="h-12 w-12 ml-1" />
                    </Button>
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                    Official Showreel 2024
                  </h3>
                  <p className="text-white/80 text-sm md:text-base">
                    Award-caliber VFX excellence
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
