import { motion } from 'framer-motion';
import SEOHelmet from '@/components/SEOHelmet';
import VisualGenerator from '@/components/AI/VisualGenerator';
import VideoGenerator from '@/components/AI/VideoGenerator';
import AudioGenerator from '@/components/AI/AudioGenerator';
import MusicGenerator from '@/components/AI/MusicGenerator';
import EmotionDetection from '@/components/AI/EmotionDetection';
import AssetLibrary from '@/components/Interactive/3DAssetLibrary';
import CaseStudies from '@/components/Content/CaseStudies';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Wand2, Box, FileText, Film, Music, Radio } from 'lucide-react';

const AITools = () => {
  return (
    <>
      <SEOHelmet
        title="AI Tools - Fuke's Media"
        description="Explore our cutting-edge AI-powered tools for VFX production including image, video, and audio generation, emotion detection, and more."
        keywords="AI tools, VFX, video generation, audio generation, image generation, emotion detection, 3D assets"
      />

      <div className="min-h-screen bg-background">
        <main className="pb-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 pt-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                AI-Powered Tools
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the future of VFX production with our revolutionary AI tools for images, videos, and audio
              </p>
            </motion.div>

            <Tabs defaultValue="visual-generator" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
                <TabsTrigger value="visual-generator" className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Images</span>
                </TabsTrigger>
                <TabsTrigger value="video-generator" className="flex items-center gap-2">
                  <Film className="h-4 w-4" />
                  <span className="hidden sm:inline">Videos</span>
                </TabsTrigger>
                <TabsTrigger value="audio-generator" className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  <span className="hidden sm:inline">SFX</span>
                </TabsTrigger>
                <TabsTrigger value="music-generator" className="flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  <span className="hidden sm:inline">Music</span>
                </TabsTrigger>
                <TabsTrigger value="emotion-detection" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span className="hidden sm:inline">Emotions</span>
                </TabsTrigger>
                <TabsTrigger value="asset-library" className="flex items-center gap-2">
                  <Box className="h-4 w-4" />
                  <span className="hidden sm:inline">3D</span>
                </TabsTrigger>
                <TabsTrigger value="case-studies" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Cases</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visual-generator">
                <VisualGenerator />
              </TabsContent>

              <TabsContent value="video-generator">
                <VideoGenerator />
              </TabsContent>

              <TabsContent value="audio-generator">
                <AudioGenerator />
              </TabsContent>

              <TabsContent value="music-generator">
                <MusicGenerator />
              </TabsContent>

              <TabsContent value="emotion-detection">
                <EmotionDetection />
              </TabsContent>

              <TabsContent value="asset-library">
                <AssetLibrary />
              </TabsContent>

              <TabsContent value="case-studies">
                <CaseStudies />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default AITools;
