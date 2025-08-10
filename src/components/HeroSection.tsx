import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import VisualGenerator from './AI/VisualGenerator';

const HeroSection = () => {
  const [showAIDemo, setShowAIDemo] = useState(false);

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
              Award-caliber VFX studio combining cutting-edge AI technology with creative excellence. We deliver cinematic visual effects that push the boundaries of what's possible.
            </p>
          </div>

          <div className="mt-4 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-card/20 backdrop-blur-sm border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mb-4 mx-auto">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                  </div>
                  <p className="text-primary-foreground font-medium">6-Second Showreel Teaser</p>
                  <p className="text-primary-foreground/70 text-sm">Pure Visual Excellence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full px-4">
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border text-center w-full">
              <h3 className="font-semibold text-sm mb-2">AI Visual Generation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Create stunning visuals with AI</p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border text-center w-full">
              <h3 className="font-semibold text-sm mb-2">Emotion Detection</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Real-time facial analysis</p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border text-center w-full">
              <h3 className="font-semibold text-sm mb-2">Neural Rendering</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">AI-optimized rendering</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Work With Us
              </Button>
            </Link>

            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 w-full sm:w-auto"
              onClick={() => setShowAIDemo(!showAIDemo)}
            >
              Try AI Demo
            </Button>

            <Link to="/advanced-pricing">
              <Button size="lg" variant="ghost" className="text-lg px-8 py-4 w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>

          {showAIDemo && (
            <div className="mt-12 w-full max-w-6xl mx-auto">
              <VisualGenerator />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
