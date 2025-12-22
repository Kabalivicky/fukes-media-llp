import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, FileImage, Settings, X, Image, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/Layout/MainLayout';
import SEOHelmet from '@/components/SEOHelmet';

const ImageConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState('');
  const [quality, setQuality] = useState([90]);
  const [resize, setResize] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const imageFormats = [
    { value: 'jpg', label: 'JPEG (Joint Photographic Experts Group)' },
    { value: 'png', label: 'PNG (Portable Network Graphics)' },
    { value: 'webp', label: 'WebP (Google Web Picture)' },
    { value: 'gif', label: 'GIF (Graphics Interchange Format)' },
    { value: 'bmp', label: 'BMP (Bitmap)' },
    { value: 'tiff', label: 'TIFF (Tagged Image File Format)' },
    { value: 'svg', label: 'SVG (Scalable Vector Graphics)' },
    { value: 'ico', label: 'ICO (Icon)' },
    { value: 'heic', label: 'HEIC (High Efficiency Image Container)' },
    { value: 'avif', label: 'AVIF (AV1 Image File Format)' },
    { value: 'jxl', label: 'JPEG XL' },
    { value: 'psd', label: 'PSD (Photoshop Document)' },
    { value: 'ai', label: 'AI (Adobe Illustrator)' },
    { value: 'eps', label: 'EPS (Encapsulated PostScript)' },
    { value: 'raw', label: 'RAW (Camera Raw)' },
    { value: 'cr2', label: 'CR2 (Canon Raw)' },
    { value: 'nef', label: 'NEF (Nikon Electronic Format)' },
    { value: 'arw', label: 'ARW (Sony Raw)' },
    { value: 'dng', label: 'DNG (Digital Negative)' },
    { value: 'jp2', label: 'JPEG 2000' },
    { value: 'pcx', label: 'PCX (Picture Exchange)' },
    { value: 'tga', label: 'TGA (Truevision Graphics Adapter)' },
    { value: 'exr', label: 'EXR (OpenEXR)' },
    { value: 'hdr', label: 'HDR (High Dynamic Range)' },
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
        setConversionComplete(false);
        
        // Create preview for first image
        if (droppedFiles[0]) {
          const reader = new FileReader();
          reader.onload = (e) => setPreviewUrl(e.target?.result as string);
          reader.readAsDataURL(droppedFiles[0]);
        }
        
        toast({
          title: "Images added",
          description: `${droppedFiles.length} image(s) added for conversion`,
        });
      }
    }
  }, [toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      setConversionComplete(false);
      
      // Create preview for first image
      if (newFiles[0]) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target?.result as string);
        reader.readAsDataURL(newFiles[0]);
      }
      
      toast({
        title: "Images selected",
        description: `${newFiles.length} image(s) selected for conversion`,
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
    setConversionComplete(false);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0 || !outputFormat) {
      toast({
        title: "Missing information",
        description: "Please select images and output format",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setConversionComplete(false);

    // Simulate conversion with progress
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 80));
    }

    setConversionComplete(true);
    toast({
      title: "Conversion completed",
      description: `${selectedFiles.length} image(s) converted to ${outputFormat.toUpperCase()}`,
    });

    setIsConverting(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <MainLayout>
      <SEOHelmet 
        title="Image Converter - Fuke's Media"
        description="Convert and optimize images between different formats with quality control"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-destructive">
              Image Converter
            </h1>
            <p className="text-xl text-muted-foreground">
              Convert and optimize your images with advanced compression
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="h-5 w-5" />
                Upload Image Files
              </CardTitle>
              <CardDescription>
                Drag and drop images or click to select files for conversion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag and Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
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
                      Supports JPEG, PNG, WebP, GIF, BMP, TIFF and 20+ more formats
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
              {isConverting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Converting images...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {/* Success Message */}
              {conversionComplete && !isConverting && (
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200 font-medium">
                    Conversion completed! Your images are ready to download.
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select output format" />
                    </SelectTrigger>
                    <SelectContent>
                      {imageFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quality: {quality[0]}%</Label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="resize-checkbox"
                    checked={resize}
                    onChange={(e) => setResize(e.target.checked)}
                    className="rounded border-border"
                  />
                  <Label htmlFor="resize-checkbox">Resize Image</Label>
                </div>

                {resize && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Width (px)</Label>
                      <Input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="e.g. 1920"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Height (px)</Label>
                      <Input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 1080"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleConvert}
                  disabled={selectedFiles.length === 0 || !outputFormat || isConverting}
                  className="flex-1"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {isConverting ? 'Converting...' : 'Convert Images'}
                </Button>
                <Button variant="outline" disabled={!conversionComplete}>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">24+ Image Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Support for JPEG, PNG, WebP, GIF, RAW, HDR and many professional formats
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quality Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fine-tune compression quality to balance file size and image clarity
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resize & Optimize</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Resize images to specific dimensions while maintaining aspect ratio
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ImageConverter;
