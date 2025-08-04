import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';

interface EmotionState {
  primary: 'happy' | 'focused' | 'excited' | 'calm' | 'neutral';
  intensity: number; // 0-1
  confidence: number; // 0-1
}

interface UIAdaptation {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  animations: {
    speed: number;
    intensity: number;
  };
  layout: {
    spacing: number;
    borderRadius: number;
  };
}

const EmotionDrivenUI = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [emotionState, setEmotionState] = useState<EmotionState>({
    primary: 'neutral',
    intensity: 0.5,
    confidence: 0.3
  });
  const [adaptation, setAdaptation] = useState<UIAdaptation>({
    colors: {
      primary: 'hsl(210, 100%, 50%)',
      secondary: 'hsl(340, 100%, 50%)',
      accent: 'hsl(120, 100%, 40%)'
    },
    animations: {
      speed: 1,
      intensity: 1
    },
    layout: {
      spacing: 1,
      borderRadius: 8
    }
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate emotion detection (in real implementation, this would use actual AI)
  useEffect(() => {
    const simulateEmotionDetection = () => {
      // Simulate different emotions based on user interaction patterns
      const emotions: EmotionState['primary'][] = ['happy', 'focused', 'excited', 'calm', 'neutral'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      
      setEmotionState({
        primary: randomEmotion,
        intensity: Math.random() * 0.8 + 0.2,
        confidence: Math.random() * 0.6 + 0.4
      });
    };

    // Simulate emotion changes every 10 seconds
    const interval = setInterval(simulateEmotionDetection, 10000);
    return () => clearInterval(interval);
  }, []);

  // Adapt UI based on emotion
  useEffect(() => {
    const adaptUI = () => {
      let newAdaptation: UIAdaptation;

      switch (emotionState.primary) {
        case 'happy':
          newAdaptation = {
            colors: {
              primary: 'hsl(45, 100%, 60%)', // Warm yellow
              secondary: 'hsl(30, 100%, 55%)', // Orange
              accent: 'hsl(350, 100%, 60%)' // Pink
            },
            animations: {
              speed: 1.2 + emotionState.intensity * 0.5,
              intensity: 1.3 + emotionState.intensity * 0.7
            },
            layout: {
              spacing: 1.1 + emotionState.intensity * 0.3,
              borderRadius: 12 + emotionState.intensity * 8
            }
          };
          break;

        case 'focused':
          newAdaptation = {
            colors: {
              primary: 'hsl(210, 80%, 45%)', // Deep blue
              secondary: 'hsl(220, 60%, 35%)', // Darker blue
              accent: 'hsl(200, 70%, 50%)' // Light blue
            },
            animations: {
              speed: 0.8 - emotionState.intensity * 0.2,
              intensity: 0.7 - emotionState.intensity * 0.3
            },
            layout: {
              spacing: 0.9 - emotionState.intensity * 0.1,
              borderRadius: 4 + emotionState.intensity * 2
            }
          };
          break;

        case 'excited':
          newAdaptation = {
            colors: {
              primary: 'hsl(340, 100%, 50%)', // Vibrant red
              secondary: 'hsl(290, 100%, 60%)', // Purple
              accent: 'hsl(0, 100%, 55%)' // Bright red
            },
            animations: {
              speed: 1.5 + emotionState.intensity * 1,
              intensity: 1.8 + emotionState.intensity * 1.2
            },
            layout: {
              spacing: 1.2 + emotionState.intensity * 0.5,
              borderRadius: 16 + emotionState.intensity * 12
            }
          };
          break;

        case 'calm':
          newAdaptation = {
            colors: {
              primary: 'hsl(180, 40%, 50%)', // Soft teal
              secondary: 'hsl(160, 30%, 45%)', // Muted green
              accent: 'hsl(200, 35%, 55%)' // Soft blue
            },
            animations: {
              speed: 0.6 - emotionState.intensity * 0.2,
              intensity: 0.5 - emotionState.intensity * 0.2
            },
            layout: {
              spacing: 0.8 - emotionState.intensity * 0.1,
              borderRadius: 20 + emotionState.intensity * 10
            }
          };
          break;

        default: // neutral
          newAdaptation = {
            colors: {
              primary: 'hsl(210, 100%, 50%)',
              secondary: 'hsl(340, 100%, 50%)',
              accent: 'hsl(120, 100%, 40%)'
            },
            animations: {
              speed: 1,
              intensity: 1
            },
            layout: {
              spacing: 1,
              borderRadius: 8
            }
          };
      }

      setAdaptation(newAdaptation);
    };

    adaptUI();
  }, [emotionState]);

  // Apply dynamic CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--emotion-primary', adaptation.colors.primary);
    root.style.setProperty('--emotion-secondary', adaptation.colors.secondary);
    root.style.setProperty('--emotion-accent', adaptation.colors.accent);
    root.style.setProperty('--emotion-speed', adaptation.animations.speed.toString());
    root.style.setProperty('--emotion-intensity', adaptation.animations.intensity.toString());
    root.style.setProperty('--emotion-spacing', adaptation.layout.spacing.toString());
    root.style.setProperty('--emotion-radius', `${adaptation.layout.borderRadius}px`);
  }, [adaptation]);

  const getEmotionDescription = () => {
    return `${emotionState.primary} (${Math.round(emotionState.intensity * 100)}% intensity)`;
  };

  const getEmotionIcon = () => {
    switch (emotionState.primary) {
      case 'happy': return '😊';
      case 'focused': return '🎯';
      case 'excited': return '🚀';
      case 'calm': return '🧘';
      default: return '😐';
    }
  };

  return (
    <div className="relative w-full">
      {/* Emotion Detection Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl"
          >
            {getEmotionIcon()}
          </motion.div>
          <div className="text-sm">
            <div className="font-medium text-foreground">
              Emotion: {emotionState.primary}
            </div>
            <div className="text-xs text-muted-foreground">
              Intensity: {Math.round(emotionState.intensity * 100)}%
            </div>
          </div>
        </div>
        
        {/* Confidence Indicator */}
        <div className="mt-2 w-full bg-muted rounded-full h-1">
          <motion.div
            className="h-1 rounded-full bg-primary"
            animate={{ width: `${emotionState.confidence * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Dynamic Background Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${adaptation.colors.primary}10 0%, transparent 70%)`
        }}
        transition={{ duration: 2 }}
      />

      {/* Hidden webcam for emotion detection (would be implemented with actual AI) */}
      <video
        ref={videoRef}
        className="hidden"
        autoPlay
        muted
        playsInline
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Adaptive Children Container */}
      <motion.div
        style={{
          '--adaptive-spacing': `${adaptation.layout.spacing}rem`,
          '--adaptive-radius': `${adaptation.layout.borderRadius}px`,
          '--adaptive-speed': `${adaptation.animations.speed}s`,
        } as any}
        animate={{
          filter: `hue-rotate(${emotionState.intensity * 30}deg) brightness(${1 + emotionState.intensity * 0.2})`
        }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        {children}
      </motion.div>

      {/* CSS for emotion-based animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .emotion-adaptive {
            transition: all calc(var(--emotion-speed, 1) * 0.3s) ease-out;
            border-radius: var(--emotion-radius, 8px);
          }
          
          .emotion-adaptive:hover {
            transform: scale(calc(1 + var(--emotion-intensity, 1) * 0.05));
          }
          
          .emotion-pulse {
            animation: emotionPulse calc(var(--emotion-speed, 1) * 2s) infinite;
          }
          
          @keyframes emotionPulse {
            0%, 100% { 
              opacity: 1; 
              transform: scale(1);
            }
            50% { 
              opacity: calc(0.7 + var(--emotion-intensity, 1) * 0.3);
              transform: scale(calc(1 + var(--emotion-intensity, 1) * 0.1));
            }
          }
        `
      }} />
    </div>
  );
};

export default EmotionDrivenUI;