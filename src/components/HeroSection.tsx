import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

const HeroSection = () => {

  return (
    <section className="relative min-h-screen-mobile w-full flex items-center justify-center overflow-hidden pt-16 pb-8 sm:pb-12">
      <div className="absolute inset-0 w-full bg-background" />

      <div className="container relative z-10 px-4 mx-auto w-full">
        <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 max-w-5xl mx-auto w-full">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-tight px-4">
              FUKE'S MEDIA
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 text-center font-body">
              Professional VFX studio combining cutting-edge AI technology with creative excellence. We deliver cinematic visual effects that push the boundaries of what's possible.
            </p>
          </div>

          <div className="mt-4 max-w-4xl mx-auto px-4">
            <div className="relative w-full rounded-2xl overflow-hidden bg-card/20 backdrop-blur-sm border border-border" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 flex items-center justify-center mb-4 mx-auto hover:bg-primary transition-colors cursor-pointer">
                    <PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <p className="text-primary-foreground font-medium text-sm sm:text-base">6-Second Showreel Teaser</p>
                  <p className="text-primary-foreground/70 text-xs sm:text-sm">Pure Visual Excellence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 max-w-2xl mx-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full">
                Work With Us
              </Button>
            </Link>

            <Link to="/showreel" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full">
                View Showreel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
