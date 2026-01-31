import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, Maximize2, X, Image, CheckCircle, Sparkles, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SEOHelmet from '@/components/SEOHelmet';
import { formatFileSize, simulateProcessing, logToolUsage } from '@/utils/toolsHelper';
import { AdBanner, DonationButtons } from '@/components/Monetization';

const ImageUpscaler = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [scaleFactor, setScaleFactor] = useState('2x');
  const [model, setModel] = useState('balanced');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scaleOptions = [
    { value: '2x', label: '2x (Double Size)', description: 'Fast processing' },
    { value: '4x', label: '4x (Quadruple Size)', description: 'Recommended' },
    { value: '8x', label: '8x (8 Times Larger)', description: 'High quality' },
    { value: '16x', label: '16x (16 Times Larger)', description: 'Maximum quality' },
  ];

  const modelOptions = [
    { value: 'fast', label: 'Fast', description: 'Quick processing, good quality' },
    { value: 'balanced', label: 'Balanced', description: 'Optimal speed and quality' },
    { value: 'quality', label: 'High Quality', description: 'Best results, slower' },
    { value: 'ultra', label: 'Ultra HD', description: 'Maximum detail preservation' },
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
      const droppedFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type.startsWith('image/')
      );
      
      if (droppedFiles.length > 0) {
        setSelectedFiles(prev => [...prev, ...droppedFiles]);
        setProcessComplete(false);
        
        if (droppedFiles[0]) {
          const reader = new FileReader();
          reader.onload = (e) => setPreviewUrl(e.target?.result as string);
          reader.readAsDataURL(droppedFiles[0]);
        }
        
        toast({
          title: "Images added",
          description: `${droppedFiles.length} image(s) added for upscaling`,
        });
      }
    }
  }, [toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      setProcessComplete(false);
      
      if (newFiles[0]) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target?.result as string);
        reader.readAsDataURL(newFiles[0]);
      }
      
      toast({
        title: "Images selected",
        description: `${newFiles.length} image(s) selected for upscaling`,
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (newFiles.length === 0) {
        setPreviewUrl(null);
      }
      return newFiles;
    });
    setProcessComplete(false);
  };

  const handleUpscale = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select images to upscale",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setProcessComplete(false);

    const startTime = Date.now();
    
    try {
      // Processing time based on scale factor and model
      const scaleMultiplier = parseInt(scaleFactor) || 2;
      const modelMultiplier = {
        'fast': 0.5,
        'balanced': 1,
        'quality': 1.5,
        'ultra': 2
      }[model] || 1;
      
      const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
      const processingTime = Math.max(2000, (totalSize / (1024 * 512)) * 1000 * scaleMultiplier * modelMultiplier);
      
      await simulateProcessing(processingTime, setProgress);

      // Log usage
      for (const file of selectedFiles) {
        await logToolUsage({
          toolName: 'image-upscaler',
          inputFormat: file.name.split('.').pop(),
          outputFormat: `${scaleFactor} upscaled`,
          fileSize: file.size,
          processingTime: Date.now() - startTime,
          success: true
        });
      }

      setProcessComplete(true);
      toast({
        title: "Upscaling completed!",
        description: `${selectedFiles.length} image(s) upscaled to ${scaleFactor}`,
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
        title="Image Upscaler - AI-Powered Enhancement | Fuke's Media"
        description="Upscale and enhance your images using AI. Increase resolution up to 16x while preserving quality and details."
        keywords="image upscaler, AI upscale, enhance images, increase resolution, super resolution"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-destructive">
              AI Image Upscaler
            </h1>
            <p className="text-xl text-muted-foreground">
              Enhance and upscale your images with AI-powered super resolution
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Maximize2 className="h-5 w-5" />
                Upload Images to Upscale
              </CardTitle>
              <CardDescription>
                Drag and drop images or click to select files for AI enhancement
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
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-40 mx-auto rounded-lg object-contain"
                    />
                    <p className="text-sm text-muted-foreground">
                      Click or drop more images to add
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Drop images here or click to browse</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supports JPEG, PNG, WebP, and more
                    </p>
                  </>
                )}
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <Label>Selected Images ({selectedFiles.length})</Label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Image className="h-5 w-5 text-muted-foreground" />
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
                      AI upscaling in progress...
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
                    Upscaling completed! Your enhanced images are ready to download.
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Scale Factor</Label>
                  <Select value={scaleFactor} onValueChange={setScaleFactor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scale" />
                    </SelectTrigger>
                    <SelectContent>
                      {scaleOptions.map((option) => (
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
                  {isProcessing ? 'Upscaling...' : 'Upscale Images'}
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
                  AI-Powered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced neural networks enhance details and textures while upscaling
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Maximize2 className="h-5 w-5 text-primary" />
                  Up to 16x Scale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Increase image resolution up to 16 times while preserving quality
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Fast Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Optimized algorithms deliver results in seconds, not minutes
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

export default ImageUpscaler;
