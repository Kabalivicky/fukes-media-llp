import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Download, Palette, Camera, Sparkles, Zap, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const VisualGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const styles = [
    { id: 'cinematic', name: 'Cinematic', icon: Camera },
    { id: 'artistic', name: 'Artistic', icon: Palette },
    { id: 'photorealistic', name: 'Photorealistic', icon: Sparkles },
    { id: 'vfx', name: 'VFX Style', icon: Zap }
  ];

  const presetPrompts = [
    "Epic space battle with massive starships",
    "Mystical forest with magical creatures",
    "Futuristic cityscape at sunset",
    "Underwater alien civilization",
    "Dragon flying over medieval castle"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what you want to create",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-visual', {
        body: { 
          prompt: prompt.trim(),
          style: selectedStyle,
          count: 3
        }
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to generate images');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.images && data.images.length > 0) {
        setGeneratedImages(data.images);
        toast({
          title: "Images Generated!",
          description: `${data.images.length} AI-generated visual${data.images.length > 1 ? 's are' : ' is'} ready`,
        });
      } else {
        throw new Error('No images were generated');
      }
    } catch (err: any) {
      console.error('Image generation error:', err);
      const errorMessage = err?.message || 'Failed to generate images. Please try again.';
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generated-${selectedStyle}-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Your image is being downloaded.",
      });
    } catch (err) {
      // Fallback for base64 or cross-origin images
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `ai-generated-${selectedStyle}-${index + 1}.png`;
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 gradient-text">AI Visual Generator</h2>
        <p className="text-muted-foreground mb-8">
          Create stunning visuals using advanced AI algorithms
        </p>
      </motion.div>

      <Card className="border border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Generate Your Vision
          </CardTitle>
          <CardDescription>
            Describe your idea and let our AI bring it to life
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Describe what you want to create... (e.g., 'A futuristic city with flying cars at sunset')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="flex flex-wrap gap-2">
              {presetPrompts.map((preset, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => setPrompt(preset)}
                >
                  {preset}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs value={selectedStyle} onValueChange={setSelectedStyle}>
            <TabsList className="grid w-full grid-cols-4">
              {styles.map((style) => (
                <TabsTrigger key={style.id} value={style.id} className="flex items-center gap-2">
                  <style.icon className="h-4 w-4" />
                  {style.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full gradient-button"
            size="lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating with AI...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                Generate Images
              </div>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Powered by Lovable AI • Gemini Image Generation
          </p>
        </CardContent>
      </Card>

      <AnimatePresence>
        {generatedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {generatedImages.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative group">
                  <img
                    src={image}
                    alt={`AI-generated visual for ${prompt || 'creative project'} - variation ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => handleDownload(image, index)}
                      variant="secondary"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisualGenerator;
