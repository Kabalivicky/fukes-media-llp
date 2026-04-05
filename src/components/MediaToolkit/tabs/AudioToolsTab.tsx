import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Music, Loader2, Download, Trash2, Info, AlertTriangle } from 'lucide-react';
import SharedDropzone from '../shared/SharedDropzone';
import { downloadFile } from '../shared/DownloadManager';
import { useFFmpeg } from '../shared/FFmpegProvider';
import { fetchFile } from '@ffmpeg/util';
import { formatFileSize } from '../shared/types';

const AUDIO_ACCEPT = '.mp3,.wav,.ogg,.aac,.m4a,.flac,.mp4,.mov,.webm,.avi,.mkv';

const AudioToolsTab = () => {
  const { ffmpeg, loading: ffmpegLoading, load: loadFFmpeg, loadProgress } = useFFmpeg();
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [bitrate, setBitrate] = useState('192');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setOutputUrl(null);
      setError(null);
    }
  }, []);

  const convert = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      let ff = ffmpeg;
      if (!ff) {
        ff = await loadFFmpeg();
        if (!ff) throw new Error('Failed to load FFmpeg');
      }

      ff.on('progress', ({ progress: p }) => setProgress(Math.round(p * 100)));

      const inputExt = file.name.split('.').pop() || 'mp4';
      const inputName = `input.${inputExt}`;
      const outputName = `output.${outputFormat}`;

      await ff.writeFile(inputName, await fetchFile(file));

      const cmd: string[] = ['-i', inputName, '-vn'];

      if (outputFormat === 'mp3') {
        cmd.push('-c:a', 'libmp3lame', '-b:a', `${bitrate}k`);
      } else if (outputFormat === 'wav') {
        cmd.push('-c:a', 'pcm_s16le');
      } else if (outputFormat === 'aac') {
        cmd.push('-c:a', 'aac', '-b:a', `${bitrate}k`);
      } else if (outputFormat === 'ogg') {
        cmd.push('-c:a', 'libvorbis', '-b:a', `${bitrate}k`);
      }

      cmd.push('-y', outputName);
      await ff.exec(cmd);

      const data = await ff.readFile(outputName);
      const mimeMap: Record<string, string> = {
        mp3: 'audio/mpeg', wav: 'audio/wav', aac: 'audio/aac', ogg: 'audio/ogg',
      };
      const blob = new Blob([data], { type: mimeMap[outputFormat] || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setOutputSize(blob.size);
      setProgress(100);

      try { await ff.deleteFile(inputName); } catch {}
      try { await ff.deleteFile(outputName); } catch {}
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Audio conversion failed');
    }
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Audio Tools
          </CardTitle>
          <CardDescription>
            Extract audio from video files or convert between MP3, WAV, AAC, and OGG — all in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              Upload an audio file to convert, or a video file to extract its audio track. Processing uses FFmpeg WebAssembly.
            </span>
          </div>

          {!file && (
            <SharedDropzone
              accept={AUDIO_ACCEPT}
              multiple={false}
              onFiles={handleFile}
              label="Drop an audio or video file"
              description="MP3, WAV, OGG, AAC, FLAC, M4A, or video files"
              disabled={isProcessing}
            />
          )}

          {file && (
            <>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <Music className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => { setFile(null); setOutputUrl(null); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp3">MP3</SelectItem>
                      <SelectItem value="wav">WAV</SelectItem>
                      <SelectItem value="aac">AAC</SelectItem>
                      <SelectItem value="ogg">OGG Vorbis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {outputFormat !== 'wav' && (
                  <div className="space-y-2">
                    <Label>Bitrate</Label>
                    <Select value={bitrate} onValueChange={setBitrate}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="96">96 kbps</SelectItem>
                        <SelectItem value="128">128 kbps</SelectItem>
                        <SelectItem value="192">192 kbps</SelectItem>
                        <SelectItem value="256">256 kbps</SelectItem>
                        <SelectItem value="320">320 kbps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {(isProcessing || ffmpegLoading) && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    {ffmpegLoading ? `Loading FFmpeg… ${loadProgress}%` : `Processing… ${progress}%`}
                  </div>
                  <Progress value={ffmpegLoading ? loadProgress : progress} />
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              {outputUrl && (
                <div className="space-y-3">
                  <audio src={outputUrl} controls className="w-full" />
                  <div className="flex items-center gap-3">
                    <Button onClick={() => downloadFile(outputUrl, `audio.${outputFormat}`)}>
                      <Download className="h-4 w-4 mr-2" /> Download ({formatFileSize(outputSize)})
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)} → {formatFileSize(outputSize)}
                    </span>
                  </div>
                </div>
              )}

              <Button onClick={convert} disabled={isProcessing}>
                {isProcessing ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</> : 'Convert Audio'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioToolsTab;
