import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Video, Loader2, AlertCircle, Download, Play, Sparkles, Film } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type VideoStyle = 'cinematic' | 'animation' | 'documentary' | 'commercial';
type AspectRatio = '16:9' | '9:16' | '1:1' | '4:3';

interface GeneratedVideo {
  id: string;
  prompt: string;
  style: VideoStyle;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
}

const VIDEO_STYLES: Record<VideoStyle, { label: string; description: string }> = {
  cinematic: { label: 'Cinematic', description: 'Film-quality, dramatic lighting' },
  animation: { label: 'Animation', description: '3D/2D animated style' },
  documentary: { label: 'Documentary', description: 'Natural, realistic footage' },
  commercial: { label: 'Commercial', description: 'Polished, advertising style' },
};

const ASPECT_RATIOS: Record<AspectRatio, string> = {
  '16:9': 'Landscape (16:9)',
  '9:16': 'Portrait (9:16)',
  '1:1': 'Square (1:1)',
  '4:3': 'Standard (4:3)',
};

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<VideoStyle>('cinematic');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [duration, setDuration] = useState<5 | 10>(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateVideo = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a video description');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Call the video generation edge function
      const { data, error: fnError } = await supabase.functions.invoke('generate-video', {
        body: { prompt, style, aspectRatio, duration },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to generate video');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.videoUrl) {
        const newVideo: GeneratedVideo = {
          id: Date.now().toString(),
          prompt,
          style,
          videoUrl: data.videoUrl,
          thumbnailUrl: data.thumbnailUrl,
          duration,
        };

        setGeneratedVideos(prev => [newVideo, ...prev]);
        setPrompt('');
        toast.success('Video generated successfully!');
      } else {
        throw new Error('No video was generated');
      }
    } catch (err: any) {
      console.error('Video generation error:', err);
      const errorMessage = err.message || 'Failed to generate video';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadVideo = (video: GeneratedVideo) => {
    const link = document.createElement('a');
    link.href = video.videoUrl;
    link.download = `video-${video.id}.mp4`;
    link.click();
    toast.success('Video download started!');
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            AI Video Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Generate stunning videos from text descriptions using advanced AI models.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="video-prompt">Video Description</Label>
              <Textarea
                id="video-prompt"
                placeholder="Describe your video scene... e.g., 'A majestic eagle soaring over snow-capped mountains at golden hour, cinematic drone shot'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Style</Label>
                <Select value={style} onValueChange={(v) => setStyle(v as VideoStyle)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(VIDEO_STYLES).map(([key, info]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex flex-col">
                          <span>{info.label}</span>
                          <span className="text-xs text-muted-foreground">{info.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={(v) => setAspectRatio(v as AspectRatio)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ASPECT_RATIOS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Duration</Label>
                <Select value={duration.toString()} onValueChange={(v) => setDuration(parseInt(v) as 5 | 10)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 seconds</SelectItem>
                    <SelectItem value="10">10 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button
              onClick={generateVideo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full gradient-button"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Video... (this may take a minute)
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Video
                </>
              )}
            </Button>
          </div>

          {/* Quick prompts */}
          <div>
            <Label className="text-muted-foreground">Quick prompts:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                'Ocean waves crashing on a beach at sunset',
                'Time-lapse of stars in the night sky',
                'Abstract particles flowing in 3D space',
                'Aerial view of a futuristic city',
              ].map((quickPrompt) => (
                <Button
                  key={quickPrompt}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(quickPrompt)}
                  className="text-xs"
                >
                  {quickPrompt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedVideos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Generated Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {generatedVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="aspect-video bg-muted relative">
                    <video
                      src={video.videoUrl}
                      poster={video.thumbnailUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      {VIDEO_STYLES[video.style].label}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm line-clamp-2">{video.prompt}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{video.duration}s</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadVideo(video)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoGenerator;
