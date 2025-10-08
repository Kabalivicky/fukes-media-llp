
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, FileVideo, Settings, X, PlayCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/Layout/MainLayout';
import SEOHelmet from '@/components/SEOHelmet';
import { mockVideoConversion, formatFileSize, validateFileType } from '@/utils/toolsHelper';
import { batchConvertAndDownload } from '@/utils/downloadHelper';

const VideoConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState('');
  const [quality, setQuality] = useState('high');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedVideoTypes = ['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv', 'flv', '3gp', 'asf', 'f4v', 'm4v', 'mpg', 'mpeg', 'ts', 'vob', 'ogv', 'divx', 'xvid', 'rm', 'rmvb', 'mts', 'm2ts', 'dv', 'mxf'];

  const videoFormats = [
    { value: 'mp4', label: 'MP4 (MPEG-4)' },
    { value: 'avi', label: 'AVI (Audio Video Interleave)' },
    { value: 'mov', label: 'MOV (QuickTime)' },
    { value: 'wmv', label: 'WMV (Windows Media Video)' },
    { value: 'webm', label: 'WebM' },
    { value: 'mkv', label: 'MKV (Matroska)' },
    { value: 'flv', label: 'FLV (Flash Video)' },
    { value: '3gp', label: '3GP (3GPP)' },
    { value: 'asf', label: 'ASF (Advanced Systems Format)' },
    { value: 'f4v', label: 'F4V (Flash MP4)' },
    { value: 'm4v', label: 'M4V (iTunes Video)' },
    { value: 'mpg', label: 'MPG (MPEG-1)' },
    { value: 'mpeg', label: 'MPEG (Motion Picture Experts Group)' },
    { value: 'ts', label: 'TS (Transport Stream)' },
    { value: 'vob', label: 'VOB (Video Object)' },
    { value: 'ogv', label: 'OGV (Ogg Video)' },
    { value: 'divx', label: 'DivX' },
    { value: 'xvid', label: 'Xvid' },
    { value: 'rm', label: 'RM (RealMedia)' },
    { value: 'rmvb', label: 'RMVB (RealMedia Variable Bitrate)' },
    { value: 'mts', label: 'MTS (AVCHD)' },
    { value: 'm2ts', label: 'M2TS (Blu-ray)' },
    { value: 'dv', label: 'DV (Digital Video)' },
    { value: 'mxf', label: 'MXF (Material Exchange Format)' },
    { value: 'prores', label: 'ProRes' },
    { value: 'dnxhd', label: 'DNxHD' },
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
        toast({
          title: "Videos added",
          description: `${validFiles.length} video(s) added for conversion`,
        });
      }
    }
  }, [toast, allowedVideoTypes]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Videos selected",
        description: `${newFiles.length} video(s) selected for conversion`,
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0 || !outputFormat) {
      toast({
        title: "Missing information",
        description: "Please select videos and output format",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setConversionComplete(false);

    try {
      const result = await mockVideoConversion(
        selectedFiles,
        outputFormat,
        quality,
        (progress) => setProgress(progress)
      );

      if (result.success) {
        setConversionComplete(true);
        toast({
          title: "Conversion completed successfully!",
          description: `${selectedFiles.length} video(s) converted to ${outputFormat.toUpperCase()}`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      setProgress(0);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadAll = async () => {
    if (!conversionComplete || selectedFiles.length === 0) return;
    try {
      await batchConvertAndDownload(selectedFiles, outputFormat, { quality });
      toast({
        title: "Download started",
        description: `Downloading ${selectedFiles.length} converted file(s)`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "An error occurred while downloading files",
        variant: "destructive",
      });
    }
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
        title="Video Converter - Fuke's Media"
        description="Convert video files between different formats with high quality preservation"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red">
              Video Converter
            </h1>
            <p className="text-xl text-muted-foreground">
              Convert your video files to any format with professional quality
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileVideo className="h-5 w-5" />
                Upload Video File
              </CardTitle>
              <CardDescription>
                Select a video file to convert to your desired format
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
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Drop videos here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports MP4, AVI, MOV, WebM, MKV, and 20+ more formats
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
                          onClick={() => removeFile(index)}
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
                    <span>Converting videos...</span>
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
                    Conversion completed successfully! Your videos are ready to download.
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
                      {videoFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quality</Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Fast)</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High (Recommended)</SelectItem>
                      <SelectItem value="ultra">Ultra (Slow)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleConvert}
                  disabled={selectedFiles.length === 0 || !outputFormat || isConverting}
                  className="bg-primary hover:bg-primary/90 flex-1 shadow-lg hover:shadow-xl transition-all"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {isConverting ? 'Converting...' : 'Convert Videos'}
                </Button>
                <Button 
                  variant="outline" 
                  disabled={!conversionComplete}
                  onClick={handleDownloadAll}
                  className="shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">25+ Video Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Support for MP4, AVI, MOV, WebM, MKV, ProRes, DNxHD and many professional formats
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">High Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Preserve video quality with advanced compression algorithms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Batch Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Convert multiple videos at once with drag-and-drop support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoConverter;
