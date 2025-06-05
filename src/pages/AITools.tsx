
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHelmet from '@/components/SEOHelmet';
import VisualGenerator from '@/components/AI/VisualGenerator';
import EmotionDetection from '@/components/AI/EmotionDetection';
import AssetLibrary from '@/components/Interactive/3DAssetLibrary';
import CaseStudies from '@/components/Content/CaseStudies';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Wand2, Cube, FileText } from 'lucide-react';

const AITools = () => {
  return (
    <>
      <SEOHelmet
        title="AI Tools - Fuke's Media"
        description="Explore our cutting-edge AI-powered tools for VFX production, emotion detection, 3D asset management, and more."
        keywords="AI tools, VFX, emotion detection, 3D assets, visual generation"
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                AI-Powered Tools
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the future of VFX production with our revolutionary AI tools
              </p>
            </motion.div>

            <Tabs defaultValue="visual-generator" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="visual-generator" className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  Visual Generator
                </TabsTrigger>
                <TabsTrigger value="emotion-detection" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Emotion Detection
                </TabsTrigger>
                <TabsTrigger value="asset-library" className="flex items-center gap-2">
                  <Cube className="h-4 w-4" />
                  3D Assets
                </TabsTrigger>
                <TabsTrigger value="case-studies" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Case Studies
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visual-generator">
                <VisualGenerator />
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

        <Footer />
      </div>
    </>
  );
};

export default AITools;
