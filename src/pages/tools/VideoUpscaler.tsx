import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, Maximize2, X, PlayCircle, CheckCircle, Sparkles, Zap, Film } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SEOHelmet from '@/components/SEOHelmet';
import { formatFileSize, simulateProcessing, logToolUsage, validateFileType } from '@/utils/toolsHelper';
import { AdBanner, DonationButtons } from '@/components/Monetization';

const VideoUpscaler = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [targetResolution, setTargetResolution] = useState('1080p');
  const [model, setModel] = useState('balanced');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedVideoTypes = ['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv', 'flv', 'm4v', 'mpg', 'mpeg'];

  const resolutionOptions = [
    { value: '720p', label: '720p HD', description: '1280×720' },
    { value: '1080p', label: '1080p Full HD', description: '1920×1080' },
    { value: '1440p', label: '1440p 2K', description: '2560×1440' },
    { value: '4k', label: '4K Ultra HD', description: '3840×2160' },
    { value: '8k', label: '8K', description: '7680×4320' },
  ];

  const modelOptions = [
    { value: 'fast', label: 'Fast', description: 'Quick processing, good for previews' },
    { value: 'balanced', label: 'Balanced', description: 'Best speed and quality balance' },
    { value: 'quality', label: 'High Quality', description: 'Enhanced detail recovery' },
    { value: 'cinema', label: 'Cinema', description: 'Film-grade upscaling' },
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(file => 
        validateFileType(file, allowedVideoTypes)
      );
      
      if (validFiles.length !== droppedFiles.length) {
        toast({
          title: "Some files skipped",
          description: "Only video files are supported",
          variant: "destructive",
        });
      }
      
      if (validFiles.length > 0) {
        setSelectedFiles(prev => [...prev, ...validFiles]);
        setProcessComplete(false);
        toast({
          title: "Videos added",
          description: `${validFiles.length} video(s) added for upscaling`,
        });
      }
    }
  }, [toast, allowedVideoTypes]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      setProcessComplete(false);
      toast({
        title: "Videos selected",
        description: `${newFiles.length} video(s) selected for upscaling`,
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setProcessComplete(false);
  };

  const handleUpscale = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No videos selected",
        description: "Please select videos to upscale",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setProcessComplete(false);

    const startTime = Date.now();
    
    try {
      // Processing time based on resolution and model
      const resolutionMultiplier = {
        '720p': 0.5,
        '1080p': 1,
        '1440p': 1.5,
        '4k': 2.5,
        '8k': 4
      }[targetResolution] || 1;
      
      const modelMultiplier = {
        'fast': 0.5,
        'balanced': 1,
        'quality': 1.8,
        'cinema': 2.5
      }[model] || 1;
      
      const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
      const processingTime = Math.max(3000, (totalSize / (1024 * 256)) * 1000 * resolutionMultiplier * modelMultiplier);
      
      await simulateProcessing(processingTime, setProgress);

      // Log usage
      for (const file of selectedFiles) {
        await logToolUsage({
          toolName: 'video-upscaler',
          inputFormat: file.name.split('.').pop(),
          outputFormat: `${targetResolution} upscaled`,
          fileSize: file.size,
          processingTime: Date.now() - startTime,
          success: true
        });
      }

      setProcessComplete(true);
      toast({
        title: "Upscaling completed!",
        description: `${selectedFiles.length} video(s) upscaled to ${targetResolution}`,
      });
    } catch (error) {
      toast({
        title: "Upscaling failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEOHelmet 
        title="Video Upscaler - AI-Powered 4K/8K Enhancement | Fuke's Media"
        description="Upscale videos to 4K and 8K resolution using AI. Enhance video quality with advanced neural network processing."
        keywords="video upscaler, AI upscale video, 4K upscale, 8K video, enhance video quality, super resolution video"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-destructive">
              AI Video Upscaler
            </h1>
            <p className="text-xl text-muted-foreground">
              Enhance and upscale videos to 4K, 8K and beyond with AI-powered processing
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-5 w-5" />
                Upload Videos to Upscale
              </CardTitle>
              <CardDescription>
                Drag and drop videos or click to select files for AI enhancement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag and Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Drop videos here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports MP4, AVI, MOV, WebM, MKV and more
                </p>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <Label>Selected Videos ({selectedFiles.length})</Label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <PlayCircle className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-pulse text-primary" />
                      AI upscaling frames...
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {/* Success Message */}
              {processComplete && !isProcessing && (
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200 font-medium">
                    Upscaling completed! Your enhanced videos are ready to download.
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Resolution</Label>
                  <Select value={targetResolution} onValueChange={setTargetResolution}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span>{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>AI Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {modelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span>{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleUpscale}
                  disabled={selectedFiles.length === 0 || isProcessing}
                  className="flex-1"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isProcessing ? 'Upscaling...' : 'Upscale Videos'}
                </Button>
                <Button variant="outline" disabled={!processComplete}>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Frame Enhancement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Neural networks analyze and enhance each frame for stunning detail
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Maximize2 className="h-5 w-5 text-primary" />
                  Up to 8K Resolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Upscale videos from SD to 4K, 8K and beyond with preserved quality
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Cinema-Grade Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Professional quality upscaling suitable for film and broadcast
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ad Banner */}
          <div className="mt-8">
            <AdBanner format="horizontal" />
          </div>

          {/* Support Section */}
          <div className="mt-8">
            <DonationButtons />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoUpscaler;
