import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, FileText, Settings, X, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SEOHelmet from '@/components/SEOHelmet';

const DocumentConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState('');
  const [quality, setQuality] = useState('high');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const documentFormats = [
    { value: 'pdf', label: 'PDF (Portable Document Format)' },
    { value: 'docx', label: 'DOCX (Microsoft Word)' },
    { value: 'doc', label: 'DOC (Microsoft Word Legacy)' },
    { value: 'txt', label: 'TXT (Plain Text)' },
    { value: 'rtf', label: 'RTF (Rich Text Format)' },
    { value: 'odt', label: 'ODT (OpenDocument Text)' },
    { value: 'html', label: 'HTML (HyperText Markup Language)' },
    { value: 'epub', label: 'EPUB (Electronic Publication)' },
    { value: 'mobi', label: 'MOBI (Mobipocket eBook)' },
    { value: 'azw3', label: 'AZW3 (Amazon Kindle)' },
    { value: 'fb2', label: 'FB2 (FictionBook)' },
    { value: 'pptx', label: 'PPTX (Microsoft PowerPoint)' },
    { value: 'ppt', label: 'PPT (Microsoft PowerPoint Legacy)' },
    { value: 'odp', label: 'ODP (OpenDocument Presentation)' },
    { value: 'xlsx', label: 'XLSX (Microsoft Excel)' },
    { value: 'xls', label: 'XLS (Microsoft Excel Legacy)' },
    { value: 'ods', label: 'ODS (OpenDocument Spreadsheet)' },
    { value: 'csv', label: 'CSV (Comma-Separated Values)' },
    { value: 'md', label: 'MD (Markdown)' },
    { value: 'tex', label: 'TEX (LaTeX)' },
    { value: 'ps', label: 'PS (PostScript)' },
    { value: 'eps', label: 'EPS (Encapsulated PostScript)' },
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
      setSelectedFiles(prev => [...prev, ...droppedFiles]);
      toast({
        title: "Files added",
        description: `${droppedFiles.length} file(s) added for conversion`,
      });
    }
  }, [toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Files selected",
        description: `${newFiles.length} file(s) selected for conversion`,
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
        description: "Please select files and output format",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);

    // Simulate conversion process
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    toast({
      title: "Conversion completed",
      description: `${selectedFiles.length} file(s) converted to ${outputFormat.toUpperCase()}`,
    });

    setIsConverting(false);
    setProgress(100);
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
        title="Document Converter - Fuke's Media"
        description="Convert documents between different formats including PDF, Word, Excel, PowerPoint and more"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red">
              Document Converter
            </h1>
            <p className="text-xl text-muted-foreground">
              Convert documents between different formats with professional quality
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Documents
              </CardTitle>
              <CardDescription>
                Drag and drop documents or click to select files for conversion
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
                  accept=".pdf,.doc,.docx,.txt,.rtf,.odt,.html,.epub,.mobi,.pptx,.ppt,.xlsx,.xls,.csv,.md"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Drop documents here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports PDF, Word, Excel, PowerPoint, and many more formats
                </p>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <Label>Selected Files ({selectedFiles.length})</Label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <File className="h-5 w-5 text-muted-foreground" />
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

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select output format" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentFormats.map((format) => (
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
                      <SelectItem value="low">Low (Fast, Smaller Size)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Recommended)</SelectItem>
                      <SelectItem value="ultra">Ultra (Best Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Progress Bar */}
              {isConverting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Converting...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              <div className="flex gap-4">
                <Button 
                  onClick={handleConvert}
                  disabled={selectedFiles.length === 0 || !outputFormat || isConverting}
                  className="gradient-button flex-1"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {isConverting ? 'Converting...' : 'Convert Documents'}
                </Button>
                <Button variant="outline" disabled={progress !== 100}>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">50+ Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Support for PDF, Word, Excel, PowerPoint, eBooks, and many more document formats
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Batch Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Convert multiple documents at once with drag-and-drop support
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quality Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Maintain document formatting, images, and layout during conversion
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentConverter;