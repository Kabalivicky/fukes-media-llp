import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Hand, 
  Volume2, 
  VolumeX,
  MessageCircle,
  Navigation,
  Zap
} from 'lucide-react';

interface VoiceCommand {
  phrase: string;
  action: () => void;
  description: string;
  confidence?: number;
}

interface GestureData {
  type: 'swipe' | 'point' | 'wave' | 'pinch';
  direction?: 'left' | 'right' | 'up' | 'down';
  confidence: number;
}

const VoiceGestureNavigation = () => {
  const [isListening, setIsListening] = useState(false);
  const [isGestureActive, setIsGestureActive] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [lastGesture, setLastGesture] = useState<GestureData | null>(null);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [gestureSupported, setGestureSupported] = useState(false);

  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Voice commands configuration
  const voiceCommands: VoiceCommand[] = [
    {
      phrase: 'show budget calculator',
      action: () => scrollToSection('#pricing'),
      description: 'Navigate to pricing calculator'
    },
    {
      phrase: 'open ar room',
      action: () => window.open('/ar-vr-showroom', '_blank'),
      description: 'Open AR/VR showroom'
    },
    {
      phrase: 'show portfolio',
      action: () => scrollToSection('#portfolio'),
      description: 'View project portfolio'
    },
    {
      phrase: 'contact team',
      action: () => scrollToSection('#contact'),
      description: 'Go to contact section'
    },
    {
      phrase: 'start chat',
      action: () => window.open('/chat-assistant', '_blank'),
      description: 'Open AI assistant'
    },
    {
      phrase: 'show services',
      action: () => scrollToSection('#services'),
      description: 'View our services'
    }
  ];

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize voice recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
      
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');

        // Check for matching commands
        const matchedCommand = voiceCommands.find(cmd => 
          transcript.toLowerCase().includes(cmd.phrase.toLowerCase())
        );

        if (matchedCommand && event.results[event.results.length - 1].isFinal) {
          setLastCommand(matchedCommand.phrase);
          matchedCommand.action();
          
          // Provide audio feedback
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(`Executing: ${matchedCommand.description}`);
            utterance.rate = 1.2;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    }

    // Check for gesture support (simplified - would need actual hand tracking library)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setGestureSupported(true);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleVoiceRecognition = () => {
    if (!voiceSupported) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const toggleGestureRecognition = async () => {
    if (!gestureSupported) return;

    if (isGestureActive) {
      setIsGestureActive(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsGestureActive(true);
        
        // Simulate gesture detection (in real implementation, use MediaPipe or similar)
        simulateGestureDetection();
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  };

  const simulateGestureDetection = () => {
    const gestureInterval = setInterval(() => {
      if (!isGestureActive) {
        clearInterval(gestureInterval);
        return;
      }

      // Simulate random gesture detection
      const gestures: GestureData[] = [
        { type: 'swipe', direction: 'left', confidence: 0.8 },
        { type: 'swipe', direction: 'right', confidence: 0.9 },
        { type: 'point', confidence: 0.7 },
        { type: 'wave', confidence: 0.6 },
      ];

      if (Math.random() > 0.95) { // 5% chance of detecting gesture
        const gesture = gestures[Math.floor(Math.random() * gestures.length)];
        setLastGesture(gesture);
        
        // Execute gesture actions
        switch (gesture.type) {
          case 'swipe':
            if (gesture.direction === 'left') {
              window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            } else if (gesture.direction === 'right') {
              window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
            }
            break;
          case 'point':
            scrollToSection('#contact');
            break;
          case 'wave':
            scrollToSection('#services');
            break;
        }
        
        // Clear gesture after 3 seconds
        setTimeout(() => setLastGesture(null), 3000);
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background/90 backdrop-blur-sm border rounded-xl p-4 shadow-xl"
      >
        <div className="flex items-center gap-4">
          {/* Voice Control */}
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={toggleVoiceRecognition}
              variant={isListening ? "default" : "outline"}
              size="sm"
              disabled={!voiceSupported}
              className="relative"
            >
              {isListening ? (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  />
                </>
              ) : (
                <MicOff className="w-4 h-4 mr-2" />
              )}
              Voice
            </Button>
            {!voiceSupported && (
              <Badge variant="secondary" className="text-xs">
                Not supported
              </Badge>
            )}
          </div>

          {/* Gesture Control */}
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={toggleGestureRecognition}
              variant={isGestureActive ? "default" : "outline"}
              size="sm"
              disabled={!gestureSupported}
              className="relative"
            >
              <Hand className="w-4 h-4 mr-2" />
              {isGestureActive && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                />
              )}
              Gesture
            </Button>
            {!gestureSupported && (
              <Badge variant="secondary" className="text-xs">
                Not supported
              </Badge>
            )}
          </div>

          {/* Status Indicator */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ 
                scale: (isListening || isGestureActive) ? [1, 1.1, 1] : 1,
                opacity: (isListening || isGestureActive) ? 1 : 0.6 
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-primary" />
            </motion.div>
            <Badge variant="outline" className="text-xs">
              {isListening || isGestureActive ? 'Active' : 'Ready'}
            </Badge>
          </div>
        </div>

        {/* Command History */}
        <AnimatePresence>
          {(lastCommand || lastGesture) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t"
            >
              {lastCommand && (
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium">Voice: "{lastCommand}"</span>
                </div>
              )}
              {lastGesture && (
                <div className="flex items-center gap-2">
                  <Hand className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-medium">
                    Gesture: {lastGesture.type} 
                    {lastGesture.direction && ` ${lastGesture.direction}`}
                    <Badge variant="outline" className="ml-2 text-xs">
                      {Math.round(lastGesture.confidence * 100)}%
                    </Badge>
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Commands Help */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 pt-3 border-t"
          >
            <div className="text-xs text-muted-foreground mb-2">Say:</div>
            <div className="grid gap-1">
              {voiceCommands.slice(0, 3).map((cmd, index) => (
                <div key={index} className="text-xs font-mono bg-muted/50 px-2 py-1 rounded">
                  "{cmd.phrase}"
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gesture Guide */}
        {isGestureActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 pt-3 border-t"
          >
            <div className="text-xs text-muted-foreground mb-2">Gestures:</div>
            <div className="grid gap-1 text-xs">
              <div>👈 Swipe left: Scroll down</div>
              <div>👉 Swipe right: Scroll up</div>
              <div>👆 Point: Go to contact</div>
              <div>👋 Wave: Show services</div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Hidden video for gesture detection */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="hidden"
        width="320"
        height="240"
      />
    </div>
  );
};

export default VoiceGestureNavigation;