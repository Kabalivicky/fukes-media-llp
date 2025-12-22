import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import showreelThumbnail from '@/assets/projects/kalki-2898-ad.png';

const SHOWREEL_EMBED_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/preview";
const SHOWREEL_VIEW_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/view";

const ShowreelSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

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
              <div className="relative w-full h-full">
                {/* Loading indicator */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                )}
                
                <iframe
                  src={SHOWREEL_EMBED_URL}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title="Fuke's Media Official Showreel 2024"
                  onLoad={() => setIframeLoaded(true)}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
                
                {/* Fallback link - always visible when playing */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <a 
                    href={SHOWREEL_VIEW_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm bg-black/70 hover:bg-black/80 px-4 py-2 rounded-full transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in Google Drive
                  </a>
                </div>
              </div>
            ) : (
              <div 
                className="absolute inset-0 cursor-pointer group"
                onClick={handlePlay}
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
