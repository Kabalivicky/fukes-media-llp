import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Film, Loader2, Download, Trash2, AlertTriangle, Info } from 'lucide-react';
import SharedDropzone from '../shared/SharedDropzone';
import { downloadFile } from '../shared/DownloadManager';
import { useFFmpeg } from '../shared/FFmpegProvider';
import { fetchFile } from '@ffmpeg/util';
import { formatFileSize } from '../shared/types';

const ACCEPT = '.mp4,.mov,.webm,.avi,.mkv,.m4v,.ogv';

const VideoConverterTab = () => {
  const { ffmpeg, loaded, loading: ffmpegLoading, load: loadFFmpeg, loadProgress } = useFFmpeg();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [preset, setPreset] = useState<'high' | 'balanced' | 'small'>('balanced');
  const [muteAudio, setMuteAudio] = useState(false);
  const [outputWidth, setOutputWidth] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((files: File[]) => {
    if (files[0]) {
      setFile(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
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

      const inputName = `input.${file.name.split('.').pop()}`;
      const outputName = `output.${outputFormat}`;

      await ff.writeFile(inputName, await fetchFile(file));

      const cmd: string[] = ['-i', inputName];

      // Preset-based quality
      const crf = preset === 'high' ? '18' : preset === 'balanced' ? '23' : '28';

      if (outputFormat === 'mp4') {
        cmd.push('-c:v', 'libx264', '-crf', crf, '-preset', preset === 'small' ? 'fast' : 'medium', '-pix_fmt', 'yuv420p');
      } else if (outputFormat === 'webm') {
        cmd.push('-c:v', 'libvpx-vp9', '-crf', crf, '-b:v', '0');
      } else if (outputFormat === 'gif') {
        cmd.push('-vf', 'fps=15,scale=480:-1:flags=lanczos');
      }

      if (muteAudio && outputFormat !== 'gif') {
        cmd.push('-an');
      } else if (outputFormat !== 'gif') {
        cmd.push('-c:a', 'aac', '-b:a', '128k');
      }

      if (outputWidth) {
        const scale = `-vf`;
        const existing = cmd.indexOf('-vf');
        if (existing >= 0) {
          cmd[existing + 1] = `scale=${outputWidth}:-2,` + cmd[existing + 1];
        } else {
          cmd.push('-vf', `scale=${outputWidth}:-2`);
        }
      }

      cmd.push('-y', outputName);
      await ff.exec(cmd);

      const data = await ff.readFile(outputName);
      const mimeMap: Record<string, string> = { mp4: 'video/mp4', webm: 'video/webm', gif: 'image/gif' };
      const blob = new Blob([data], { type: mimeMap[outputFormat] || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setOutputSize(blob.size);
      setProgress(100);

      try { await ff.deleteFile(inputName); } catch {}
      try { await ff.deleteFile(outputName); } catch {}
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            Video Converter
          </CardTitle>
          <CardDescription>
            Convert videos between MP4, WebM, and GIF in your browser using FFmpeg WebAssembly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 text-yellow-500" />
            <span>
              Video processing in the browser is CPU and memory intensive. Large files may be slow, especially on mobile devices. Recommended max: ~200MB.
            </span>
          </div>

          {!file && (
            <SharedDropzone
              accept={ACCEPT}
              multiple={false}
              maxSize={500 * 1024 * 1024}
              onFiles={handleFile}
              label="Drop a video file"
              description="MP4, MOV, WebM, AVI, MKV"
              disabled={isProcessing}
            />
          )}

          {file && (
            <>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <Film className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => { setFile(null); setPreviewUrl(null); setOutputUrl(null); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {previewUrl && (
                <video src={previewUrl} controls className="w-full max-h-64 rounded-lg border" />
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4 (H.264)</SelectItem>
                      <SelectItem value="webm">WebM (VP9)</SelectItem>
                      <SelectItem value="gif">GIF (short clips)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quality Preset</Label>
                  <Select value={preset} onValueChange={(v: any) => setPreset(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Quality</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="small">Small Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Resize Width (optional)</Label>
                  <Input placeholder="e.g. 1280" value={outputWidth} onChange={(e) => setOutputWidth(e.target.value)} type="number" />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch checked={muteAudio} onCheckedChange={setMuteAudio} id="mute" />
                  <Label htmlFor="mute">Mute audio</Label>
                </div>
              </div>

              {(isProcessing || ffmpegLoading) && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    {ffmpegLoading ? `Loading FFmpeg… ${loadProgress}%` : `Converting… ${progress}%`}
                  </div>
                  <Progress value={ffmpegLoading ? loadProgress : progress} />
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive">
                  {error}
                </div>
              )}

              {outputUrl && (
                <div className="space-y-3">
                  {outputFormat === 'gif' ? (
                    <img src={outputUrl} alt="Converted GIF" className="max-w-full rounded-lg border" />
                  ) : (
                    <video src={outputUrl} controls className="w-full max-h-64 rounded-lg border" />
                  )}
                  <div className="flex items-center gap-3">
                    <Button onClick={() => downloadFile(outputUrl, `converted.${outputFormat}`)}>
                      <Download className="h-4 w-4 mr-2" /> Download ({formatFileSize(outputSize)})
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)} → {formatFileSize(outputSize)}
                    </span>
                  </div>
                </div>
              )}

              <Button onClick={convert} disabled={isProcessing}>
                {isProcessing ? <><Loader2 className="h-4 w-4 animate-spin" /> Converting…</> : 'Convert Video'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoConverterTab;
