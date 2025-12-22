import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, FileAudio, Settings, X, Music, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/Layout/MainLayout';
import SEOHelmet from '@/components/SEOHelmet';

const AudioConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState('');
  const [bitrate, setBitrate] = useState('320');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const audioFormats = [
    { value: 'mp3', label: 'MP3 (MPEG Audio Layer III)' },
    { value: 'wav', label: 'WAV (Waveform Audio File Format)' },
    { value: 'flac', label: 'FLAC (Free Lossless Audio Codec)' },
    { value: 'aac', label: 'AAC (Advanced Audio Coding)' },
    { value: 'ogg', label: 'OGG (Ogg Vorbis)' },
    { value: 'm4a', label: 'M4A (MPEG-4 Audio)' },
    { value: 'wma', label: 'WMA (Windows Media Audio)' },
    { value: 'aiff', label: 'AIFF (Audio Interchange File Format)' },
    { value: 'au', label: 'AU (Audio File Format)' },
    { value: 'ra', label: 'RA (RealAudio)' },
    { value: 'ac3', label: 'AC3 (Audio Codec 3)' },
    { value: 'dts', label: 'DTS (Digital Theater Systems)' },
    { value: 'ape', label: 'APE (Monkey\'s Audio)' },
    { value: 'alac', label: 'ALAC (Apple Lossless)' },
    { value: 'opus', label: 'Opus (Internet Audio Codec)' },
    { value: 'amr', label: 'AMR (Adaptive Multi-Rate)' },
    { value: 'gsm', label: 'GSM (Global System for Mobile)' },
    { value: 'adpcm', label: 'ADPCM (Adaptive PCM)' },
    { value: 'pcm', label: 'PCM (Pulse Code Modulation)' },
    { value: 'mp2', label: 'MP2 (MPEG Audio Layer II)' },
    { value: 'mp1', label: 'MP1 (MPEG Audio Layer I)' },
    { value: '3gp', label: '3GP Audio' },
    { value: 'mka', label: 'MKA (Matroska Audio)' },
    { value: 'caf', label: 'CAF (Core Audio Format)' },
  ];

  const bitrateOptions = [
    { value: '64', label: '64 kbps (Low)' },
    { value: '128', label: '128 kbps (Standard)' },
    { value: '192', label: '192 kbps (Good)' },
    { value: '256', label: '256 kbps (High)' },
    { value: '320', label: '320 kbps (Best)' },
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
        file => file.type.startsWith('audio/')
      );
      
      if (droppedFiles.length > 0) {
        setSelectedFiles(prev => [...prev, ...droppedFiles]);
        setConversionComplete(false);
        toast({
          title: "Audio files added",
          description: `${droppedFiles.length} audio file(s) added for conversion`,
        });
      } else {
        toast({
          title: "Invalid files",
          description: "Please drop audio files only",
          variant: "destructive",
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
      toast({
        title: "Audio files selected",
        description: `${newFiles.length} audio file(s) selected for conversion`,
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setConversionComplete(false);
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0 || !outputFormat) {
      toast({
        title: "Missing information",
        description: "Please select audio files and output format",
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
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setConversionComplete(true);
    toast({
      title: "Conversion completed",
      description: `${selectedFiles.length} audio file(s) converted to ${outputFormat.toUpperCase()}`,
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

  const formatDuration = (file: File) => {
    // This would need actual audio analysis in a real implementation
    return 'Unknown duration';
  };

  return (
    <MainLayout>
      <SEOHelmet 
        title="Audio Converter - Fuke's Media"
        description="Convert audio files between different formats with customizable bitrates"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-destructive">
              Audio Converter
            </h1>
            <p className="text-xl text-muted-foreground">
              Convert your audio files with high-quality preservation
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileAudio className="h-5 w-5" />
                Upload Audio Files
              </CardTitle>
              <CardDescription>
                Drag and drop audio files or click to select for conversion
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
                  accept="audio/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Drop audio files here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports MP3, WAV, FLAC, AAC, OGG, M4A and 20+ more formats
                </p>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <Label>Selected Audio Files ({selectedFiles.length})</Label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Music className="h-5 w-5 text-muted-foreground" />
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
                    <span>Converting audio...</span>
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
                    Conversion completed! Your audio files are ready to download.
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
                      {audioFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bitrate</Label>
                  <Select value={bitrate} onValueChange={setBitrate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bitrateOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleConvert}
                  disabled={selectedFiles.length === 0 || !outputFormat || isConverting}
                  className="flex-1"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {isConverting ? 'Converting...' : 'Convert Audio'}
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
                <CardTitle className="text-lg">24+ Audio Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Support for MP3, WAV, FLAC, AAC, OGG, ALAC and many professional audio formats
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bitrate Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred bitrate from 64 kbps to 320 kbps for optimal quality
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Batch Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Convert multiple audio files at once with drag-and-drop support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AudioConverter;
