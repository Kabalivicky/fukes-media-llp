
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Camera, CameraOff, Users, Brain, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmotionData {
  emotion: string;
  confidence: number;
  color: string;
}

const EmotionDetection = () => {
  const [isActive, setIsActive] = useState(false);
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const [dominantEmotion, setDominantEmotion] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const emotionColors = {
    happy: '#22c55e',
    sad: '#3b82f6',
    angry: '#ef4444',
    surprised: '#f59e0b',
    fear: '#8b5cf6',
    disgust: '#10b981',
    neutral: '#6b7280'
  };

  const mockEmotions: EmotionData[] = [
    { emotion: 'Happy', confidence: 85, color: emotionColors.happy },
    { emotion: 'Neutral', confidence: 10, color: emotionColors.neutral },
    { emotion: 'Surprised', confidence: 3, color: emotionColors.surprised },
    { emotion: 'Sad', confidence: 2, color: emotionColors.sad }
  ];

  const startDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setIsActive(true);
      
      // Simulate real-time emotion detection
      const interval = setInterval(() => {
        const randomizedEmotions = mockEmotions.map(emotion => ({
          ...emotion,
          confidence: Math.max(0, emotion.confidence + (Math.random() - 0.5) * 20)
        })).sort((a, b) => b.confidence - a.confidence);
        
        setEmotions(randomizedEmotions);
        setDominantEmotion(randomizedEmotions[0].emotion);
      }, 1000);

      // Store interval in a way we can clear it later
      (videoRef.current as any).detectionInterval = interval;
      
      toast({
        title: "Emotion Detection Started",
        description: "Real-time emotion analysis is now active",
      });
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to use emotion detection",
        variant: "destructive"
      });
    }
  };

  const stopDetection = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    
    if ((videoRef.current as any)?.detectionInterval) {
      clearInterval((videoRef.current as any).detectionInterval);
    }
    
    setIsActive(false);
    setEmotions([]);
    setDominantEmotion('');
    
    toast({
      title: "Detection Stopped",
      description: "Emotion analysis has been stopped",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 gradient-text">Emotion Detection</h2>
        <p className="text-muted-foreground mb-8">
          Real-time facial emotion analysis for enhanced VFX production
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Live Camera Feed
            </CardTitle>
            <CardDescription>
              Position your face in the camera frame for analysis
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                  <div className="text-center">
                    <CameraOff className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Camera not active</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isActive ? (
                <Button onClick={startDetection} className="flex-1 gradient-button">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Detection
                </Button>
              ) : (
                <Button onClick={stopDetection} variant="destructive" className="flex-1">
                  <CameraOff className="h-4 w-4 mr-2" />
                  Stop Detection
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Emotion Analysis */}
        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Emotion Analysis
            </CardTitle>
            <CardDescription>
              Real-time emotion recognition results
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {dominantEmotion && (
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <h3 className="text-lg font-semibold mb-2">Dominant Emotion</h3>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {dominantEmotion}
                </Badge>
              </div>
            )}
            
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Emotion Breakdown
              </h4>
              
              {emotions.length > 0 ? (
                <div className="space-y-3">
                  {emotions.map((emotion, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{emotion.emotion}</span>
                        <span>{emotion.confidence.toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={emotion.confidence} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <p>Start detection to see emotion analysis</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmotionDetection;
