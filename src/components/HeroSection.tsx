import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

const HeroSection = () => {

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 w-full bg-background" />

      <div className="container relative z-10 px-4 mx-auto w-full">
        <div className="text-center space-y-10 max-w-5xl mx-auto w-full">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
              FUKE'S MEDIA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 text-center font-body">
              Professional VFX studio combining cutting-edge AI technology with creative excellence. We deliver cinematic visual effects that push the boundaries of what's possible.
            </p>
          </div>

          <div className="mt-4 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-card/20 backdrop-blur-sm border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mb-4 mx-auto hover:bg-primary transition-colors cursor-pointer">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-primary-foreground font-medium">6-Second Showreel Teaser</p>
                  <p className="text-primary-foreground/70 text-sm">Pure Visual Excellence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Work With Us
              </Button>
            </Link>

            <Link to="/showreel">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto">
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
