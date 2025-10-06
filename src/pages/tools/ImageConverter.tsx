
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, FileImage, Settings } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SEOHelmet from '@/components/SEOHelmet';

const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('');
  const [quality, setQuality] = useState([90]);
  const [resize, setResize] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConvert = () => {
    if (!selectedFile || !outputFormat) {
      alert('Please select a file and output format');
      return;
    }
    // Image conversion logic here
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
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red">
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
                Upload Image File
              </CardTitle>
              <CardDescription>
                Select an image file to convert and optimize
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Choose Image File</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="flex-1"
                  />
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>

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
                  disabled={!selectedFile || !outputFormat}
                  className="gradient-button flex-1"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Convert Image
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ImageConverter;
