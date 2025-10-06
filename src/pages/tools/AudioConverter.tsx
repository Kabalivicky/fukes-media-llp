
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, FileAudio, Settings } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SEOHelmet from '@/components/SEOHelmet';

const AudioConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('');
  const [bitrate, setBitrate] = useState('320');

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
    { value: '128', label: '128 kbps' },
    { value: '192', label: '192 kbps' },
    { value: '256', label: '256 kbps' },
    { value: '320', label: '320 kbps' },
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
    // Audio conversion logic here
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
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red">
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
                Upload Audio File
              </CardTitle>
              <CardDescription>
                Select an audio file to convert to your desired format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="audio-upload">Choose Audio File</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="flex-1"
                  />
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
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
                  disabled={!selectedFile || !outputFormat}
                  className="gradient-button flex-1"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Convert Audio
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

export default AudioConverter;
