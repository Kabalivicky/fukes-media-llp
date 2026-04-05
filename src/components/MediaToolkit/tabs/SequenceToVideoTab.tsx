import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Film, Loader2, Download, Trash2, AlertTriangle, Info, ArrowUpDown } from 'lucide-react';
import SharedDropzone from '../shared/SharedDropzone';
import FileCard from '../shared/FileCard';
import { MediaFile, generateId, getExtension, naturalSort, formatFileSize } from '../shared/types';
import { downloadFile, cleanupUrls } from '../shared/DownloadManager';
import { useFFmpeg } from '../shared/FFmpegProvider';
import { fetchFile } from '@ffmpeg/util';

const SequenceToVideoTab = () => {
  const { ffmpeg, loaded, loading: ffmpegLoading, load: loadFFmpeg, loadProgress } = useFFmpeg();
  const [frames, setFrames] = useState<MediaFile[]>([]);
  const [fps, setFps] = useState('24');
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [outputWidth, setOutputWidth] = useState('');
  const [outputHeight, setOutputHeight] = useState('');
  const [fitting, setFitting] = useState<'contain' | 'cover' | 'stretch'>('contain');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    const mediaFiles: MediaFile[] = newFiles
      .filter((f) => ['png', 'jpg', 'jpeg', 'webp'].includes(getExtension(f.name)))
      .map((f) => ({
        id: generateId(),
        file: f,
        name: f.name,
        size: f.size,
        type: f.type,
        extension: getExtension(f.name),
        previewUrl: URL.createObjectURL(f),
        status: 'pending' as const,
        progress: 0,
      }));
    setFrames((prev) => [...prev, ...mediaFiles].sort((a, b) => naturalSort(a.name, b.name)));
  }, []);

  const moveFrame = useCallback((index: number, dir: -1 | 1) => {
    setFrames((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const exportVideo = async () => {
    if (frames.length < 2) return;
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

      // Write frames
      for (let i = 0; i < frames.length; i++) {
        const ext = frames[i].extension || 'png';
        const paddedName = `frame${String(i).padStart(6, '0')}.${ext}`;
        const data = await fetchFile(frames[i].file);
        await ff.writeFile(paddedName, data);
        setProgress(Math.round(((i + 1) / frames.length) * 30));
      }

      const ext0 = frames[0].extension || 'png';
      const fpsNum = parseInt(fps) || 24;

      // Build command
      const cmd: string[] = [
        '-framerate', String(fpsNum),
        '-i', `frame%06d.${ext0}`,
      ];

      if (outputWidth && outputHeight) {
        const pad = fitting === 'contain'
          ? `scale=${outputWidth}:${outputHeight}:force_original_aspect_ratio=decrease,pad=${outputWidth}:${outputHeight}:(ow-iw)/2:(oh-ih)/2`
          : fitting === 'cover'
          ? `scale=${outputWidth}:${outputHeight}:force_original_aspect_ratio=increase,crop=${outputWidth}:${outputHeight}`
          : `scale=${outputWidth}:${outputHeight}`;
        cmd.push('-vf', pad);
      }

      const outFile = `output.${outputFormat}`;
      if (outputFormat === 'mp4') {
        cmd.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p');
      } else {
        cmd.push('-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p');
      }
      cmd.push('-y', outFile);

      setProgress(35);
      await ff.exec(cmd);

      const data = await ff.readFile(outFile);
      const blob = new Blob([new Uint8Array((data as Uint8Array).buffer)], { type: outputFormat === 'mp4' ? 'video/mp4' : 'video/webm' });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setProgress(100);

      // Cleanup ffmpeg fs
      for (let i = 0; i < frames.length; i++) {
        const ext = frames[i].extension || 'png';
        try { await ff.deleteFile(`frame${String(i).padStart(6, '0')}.${ext}`); } catch {}
      }
      try { await ff.deleteFile(outFile); } catch {}
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Video export failed');
    }
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            Image Sequence → Video
          </CardTitle>
          <CardDescription>
            Convert an ordered image sequence into MP4 or WebM video directly in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              Upload PNG, JPG, or WebP frames. Files are auto-sorted by name. Processing uses FFmpeg WebAssembly — large sequences may take time depending on your device.
            </span>
          </div>

          <SharedDropzone
            accept=".png,.jpg,.jpeg,.webp"
            onFiles={handleFiles}
            label="Drop image sequence frames"
            description="PNG, JPG, or WebP • Auto-sorted by filename"
            disabled={isProcessing}
          />

          {frames.length > 0 && (
            <>
              <div className="text-sm text-muted-foreground">
                {frames.length} frames loaded • Sorted by filename
              </div>

              {/* Frame list (compact) */}
              <div className="max-h-48 overflow-y-auto space-y-1 border rounded-lg p-2">
                {frames.map((f, i) => (
                  <div key={f.id} className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-8 text-right">{i + 1}.</span>
                    {f.previewUrl && <img src={f.previewUrl} alt="" className="w-6 h-6 rounded object-cover" />}
                    <span className="truncate flex-1">{f.name}</span>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => moveFrame(i, -1)} disabled={i === 0}>
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Settings */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>FPS</Label>
                  <Input value={fps} onChange={(e) => setFps(e.target.value)} type="number" min={1} max={120} />
                </div>
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4 (H.264)</SelectItem>
                      <SelectItem value="webm">WebM (VP9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Output Size (optional)</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Width" value={outputWidth} onChange={(e) => setOutputWidth(e.target.value)} type="number" />
                    <Input placeholder="Height" value={outputHeight} onChange={(e) => setOutputHeight(e.target.value)} type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Fitting</Label>
                  <Select value={fitting} onValueChange={(v: any) => setFitting(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contain">Contain (letterbox)</SelectItem>
                      <SelectItem value="cover">Cover (crop)</SelectItem>
                      <SelectItem value="stretch">Stretch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Progress */}
              {(isProcessing || ffmpegLoading) && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    {ffmpegLoading ? `Loading FFmpeg engine… ${loadProgress}%` : `Encoding video… ${progress}%`}
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
                  <video src={outputUrl} controls className="w-full max-h-96 rounded-lg border" />
                  <Button onClick={() => downloadFile(outputUrl, `sequence.${outputFormat}`)}>
                    <Download className="h-4 w-4 mr-2" /> Download Video
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button onClick={exportVideo} disabled={isProcessing || frames.length < 2}>
                  {isProcessing ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</> : 'Export Video'}
                </Button>
                <Button variant="ghost" onClick={() => { cleanupUrls(frames); setFrames([]); setOutputUrl(null); }}>
                  <Trash2 className="h-4 w-4 mr-2" /> Clear
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SequenceToVideoTab;
