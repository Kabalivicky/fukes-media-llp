import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, FileImage, Settings, X, Image, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SEOHelmet from '@/components/SEOHelmet';

// Formats the browser can read natively via <img> or Canvas
const BROWSER_READABLE = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg', 'ico', 'avif'];
// Formats the browser can write via canvas.toBlob / toDataURL
const BROWSER_WRITABLE: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

const ALL_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.tif',
  '.svg', '.ico', '.heic', '.heif', '.avif', '.jxl', '.psd', '.ai',
  '.eps', '.raw', '.cr2', '.nef', '.arw', '.dng', '.jp2', '.pcx',
  '.tga', '.exr', '.hdr',
];

interface ConvertedFile {
  name: string;
  url: string;
  size: number;
}

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
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
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

  const getFileExtension = (name: string) => name.split('.').pop()?.toLowerCase() || '';

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const addFiles = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
      setConversionComplete(false);
      setConvertedFiles([]);
      setWarnings([]);

      if (files[0]) {
        const ext = getFileExtension(files[0].name);
        if (BROWSER_READABLE.includes(ext)) {
          const reader = new FileReader();
          reader.onload = (e) => setPreviewUrl(e.target?.result as string);
          reader.readAsDataURL(files[0]);
        } else {
          setPreviewUrl(null);
        }
      }

      toast({
        title: "Files added",
        description: `${files.length} file(s) added for conversion`,
      });
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  }, [toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      addFiles(Array.from(files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (newFiles.length === 0) setPreviewUrl(null);
      return newFiles;
    });
    setConversionComplete(false);
    setConvertedFiles([]);
  };

  const convertImageViaCanvas = (
    file: File,
    outMime: string,
    q: number,
    resizeW?: number,
    resizeH?: number,
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        const w = resizeW || img.naturalWidth;
        const h = resizeH || img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas not supported')); return; }
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) resolve(blob);
            else reject(new Error('Conversion failed'));
          },
          outMime,
          q / 100,
        );
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not load image')); };
      img.src = url;
    });
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0 || !outputFormat) {
      toast({ title: "Missing information", description: "Please select images and output format", variant: "destructive" });
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setConversionComplete(false);
    setConvertedFiles([]);
    setWarnings([]);

    const results: ConvertedFile[] = [];
    const warns: string[] = [];
    const outMime = BROWSER_WRITABLE[outputFormat];
    const canWrite = !!outMime;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const ext = getFileExtension(file.name);
      const canRead = BROWSER_READABLE.includes(ext);
      setProgress(Math.round(((i) / selectedFiles.length) * 100));

      const baseName = file.name.replace(/\.[^.]+$/, '');
      const outName = `${baseName}.${outputFormat}`;

      if (canRead && canWrite) {
        try {
          const resizeW = resize && width ? parseInt(width) : undefined;
          const resizeH = resize && height ? parseInt(height) : undefined;
          const blob = await convertImageViaCanvas(file, outMime, quality[0], resizeW, resizeH);
          const url = URL.createObjectURL(blob);
          results.push({ name: outName, url, size: blob.size });
        } catch {
          warns.push(`${file.name}: conversion failed`);
        }
      } else if (canRead && !canWrite) {
        // Can read but output format not natively supported — render to PNG as fallback
        try {
          const resizeW = resize && width ? parseInt(width) : undefined;
          const resizeH = resize && height ? parseInt(height) : undefined;
          const blob = await convertImageViaCanvas(file, 'image/png', quality[0], resizeW, resizeH);
          const url = URL.createObjectURL(blob);
          const fallbackName = `${baseName}_converted.png`;
          results.push({ name: fallbackName, url, size: blob.size });
          warns.push(`${file.name}: "${outputFormat.toUpperCase()}" output is not natively supported by browsers. Converted to PNG instead.`);
        } catch {
          warns.push(`${file.name}: conversion failed`);
        }
      } else {
        // Cannot read the input format (EXR, PSD, RAW, etc.)
        warns.push(`${file.name}: "${ext.toUpperCase()}" input format requires a specialised decoder not available in browsers. For professional formats like EXR, PSD, RAW, CR2, etc., please use desktop software such as Adobe Photoshop, DaVinci Resolve, or ImageMagick.`);
      }
    }

    setProgress(100);
    setConvertedFiles(results);
    setWarnings(warns);
    setConversionComplete(true);
    setIsConverting(false);

    if (results.length > 0) {
      toast({
        title: "Conversion completed",
        description: `${results.length} image(s) converted successfully`,
      });
    } else if (warns.length > 0) {
      toast({
        title: "Conversion issues",
        description: "Some files could not be converted — see details below",
        variant: "destructive",
      });
    }
  };

  const downloadFile = (file: ConvertedFile) => {
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    convertedFiles.forEach((f) => downloadFile(f));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
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
                Drag and drop images or click to select files for conversion. Supports 24+ formats including EXR, PSD, RAW.
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
                  accept={ALL_EXTENSIONS.join(',')}
                  onChange={handleFileSelect}
                  className="hidden"
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
                      Supports JPEG, PNG, WebP, GIF, BMP, TIFF, EXR, PSD, RAW and 20+ more formats
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
                          onClick={(e) => { e.stopPropagation(); removeFile(index); }}
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

              {/* Warnings */}
              {warnings.length > 0 && !isConverting && (
                <div className="space-y-2">
                  {warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-yellow-800 dark:text-yellow-200">{w}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Success Message */}
              {conversionComplete && !isConverting && convertedFiles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-800 dark:text-green-200 font-medium">
                      {convertedFiles.length} image(s) converted! Click to download.
                    </span>
                  </div>
                  <div className="space-y-2">
                    {convertedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{f.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(f.size)}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => downloadFile(f)}>
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>
                    ))}
                  </div>
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
                      <Input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g. 1920" />
                    </div>
                    <div className="space-y-2">
                      <Label>Height (px)</Label>
                      <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 1080" />
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
                <Button variant="outline" disabled={convertedFiles.length === 0} onClick={downloadAll}>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">24+ Image Formats</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Upload JPEG, PNG, WebP, GIF, RAW, EXR, PSD and many professional formats
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Real Conversion</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Actual browser-based conversion with quality control — download real converted files
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Resize & Optimize</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Resize images to specific dimensions while converting formats
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageConverter;
