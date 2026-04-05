import { lazy, Suspense, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Eye, Film, Video, Music, Package, Loader2 } from 'lucide-react';
import SEOHelmet from '@/components/SEOHelmet';
import { FFmpegProvider } from './shared/FFmpegProvider';
import { motion } from 'framer-motion';

const ImageConverterTab = lazy(() => import('./tabs/ImageConverterTab'));
const EXRViewerTab = lazy(() => import('./tabs/EXRViewerTab'));
const SequenceToVideoTab = lazy(() => import('./tabs/SequenceToVideoTab'));
const VideoConverterTab = lazy(() => import('./tabs/VideoConverterTab'));
const AudioToolsTab = lazy(() => import('./tabs/AudioToolsTab'));
const BatchExportTab = lazy(() => import('./tabs/BatchExportTab'));

const TabLoader = () => (
  <div className="flex items-center justify-center py-16">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const tabs = [
  { value: 'images', label: 'Images', icon: Image },
  { value: 'exr', label: 'EXR', icon: Eye },
  { value: 'sequence', label: 'Sequence', icon: Film },
  { value: 'video', label: 'Video', icon: Video },
  { value: 'audio', label: 'Audio', icon: Music },
  { value: 'batch', label: 'Batch', icon: Package },
];

const MediaToolkitPage = () => {
  return (
    <>
      <SEOHelmet
        title="Media Toolkit — Browser-First Converter Suite"
        description="Convert images, EXR files, image sequences, video, and audio directly in your browser. Privacy-first, no uploads to servers."
        keywords="image converter, EXR viewer, video converter, audio converter, browser tools, privacy, WebAssembly"
      />

      <FFmpegProvider>
        <div className="min-h-screen bg-background pb-16">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center mb-8 pt-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
                Media Toolkit
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Convert images, preview EXR files, create videos from sequences, and process audio — all in your browser. Your files never leave your device.
              </p>
            </motion.div>

            <Tabs defaultValue="images" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto">
                {tabs.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex items-center gap-1.5 text-xs sm:text-sm py-2.5"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="images">
                <Suspense fallback={<TabLoader />}>
                  <ImageConverterTab />
                </Suspense>
              </TabsContent>

              <TabsContent value="exr">
                <Suspense fallback={<TabLoader />}>
                  <EXRViewerTab />
                </Suspense>
              </TabsContent>

              <TabsContent value="sequence">
                <Suspense fallback={<TabLoader />}>
                  <SequenceToVideoTab />
                </Suspense>
              </TabsContent>

              <TabsContent value="video">
                <Suspense fallback={<TabLoader />}>
                  <VideoConverterTab />
                </Suspense>
              </TabsContent>

              <TabsContent value="audio">
                <Suspense fallback={<TabLoader />}>
                  <AudioToolsTab />
                </Suspense>
              </TabsContent>

              <TabsContent value="batch">
                <Suspense fallback={<TabLoader />}>
                  <BatchExportTab />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </FFmpegProvider>
    </>
  );
};

export default MediaToolkitPage;
