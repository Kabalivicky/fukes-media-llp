import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Package, Loader2, Download, Trash2, Info, CheckCircle, RefreshCw } from 'lucide-react';
import SharedDropzone from '../shared/SharedDropzone';
import FileCard from '../shared/FileCard';
import { MediaFile, generateId, getExtension, formatFileSize } from '../shared/types';
import { downloadFile, downloadAllAsZip, cleanupUrls } from '../shared/DownloadManager';

const BROWSER_READABLE = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg', 'ico', 'avif'];
const ACCEPT = '.jpg,.jpeg,.png,.webp,.gif,.bmp,.svg,.ico,.avif';

const BatchExportTab = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [outputFormat, setOutputFormat] = useState('webp');
  const [quality, setQuality] = useState(85);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = useCallback((newFiles: File[]) => {
    const mediaFiles: MediaFile[] = newFiles
      .filter((f) => BROWSER_READABLE.includes(getExtension(f.name)))
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
    setFiles((prev) => [...prev, ...mediaFiles]);
  }, []);

  const processAll = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    const mimeMap: Record<string, string> = {
      jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
    };

    const updated = [...files];
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === 'complete') continue;
      updated[i] = { ...updated[i], status: 'processing', progress: 50 };
      setFiles([...updated]);

      try {
        const img = new Image();
        const url = URL.createObjectURL(updated[i].file);
        await new Promise<void>((res, rej) => {
          img.onload = () => { URL.revokeObjectURL(url); res(); };
          img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('Decode failed')); };
          img.src = url;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d')!.drawImage(img, 0, 0);

        const q = outputFormat === 'png' ? undefined : quality / 100;
        const blob = await new Promise<Blob>((res, rej) =>
          canvas.toBlob((b) => (b ? res(b) : rej(new Error('Export failed'))), mimeMap[outputFormat], q)
        );

        const outName = updated[i].name.replace(/\.[^.]+$/, `.${outputFormat}`);
        updated[i] = {
          ...updated[i],
          status: 'complete',
          progress: 100,
          outputUrl: URL.createObjectURL(blob),
          outputSize: blob.size,
          outputName: outName,
        };
      } catch (err) {
        updated[i] = {
          ...updated[i],
          status: 'error',
          error: err instanceof Error ? err.message : 'Failed',
        };
      }
      setFiles([...updated]);
    }
    setIsProcessing(false);
  };

  const retryFailed = async () => {
    setFiles((prev) => prev.map((f) => f.status === 'error' ? { ...f, status: 'pending' as const, error: undefined } : f));
    setTimeout(processAll, 100);
  };

  const completedCount = files.filter((f) => f.status === 'complete').length;
  const errorCount = files.filter((f) => f.status === 'error').length;
  const totalSaved = files.reduce((sum, f) => {
    if (f.status === 'complete' && f.outputSize != null) return sum + (f.size - f.outputSize);
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Batch Export
          </CardTitle>
          <CardDescription>
            Convert multiple images at once and download them all as a ZIP archive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              Upload multiple images, choose output format and quality, then batch convert and download as ZIP. All processing happens locally.
            </span>
          </div>

          <SharedDropzone
            accept={ACCEPT}
            onFiles={handleFiles}
            label="Drop images for batch conversion"
            description="JPG, PNG, WebP, GIF, SVG, AVIF"
            disabled={isProcessing}
          />

          {files.length > 0 && (
            <>
              {/* Settings */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="jpg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {outputFormat !== 'png' && (
                  <div className="space-y-2">
                    <Label>Quality: {quality}%</Label>
                    <Slider value={[quality]} onValueChange={([v]) => setQuality(v)} min={10} max={100} step={5} />
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <span>{files.length} files queued</span>
                {completedCount > 0 && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-3.5 w-3.5" /> {completedCount} done
                  </span>
                )}
                {errorCount > 0 && (
                  <span className="text-destructive">{errorCount} failed</span>
                )}
                {totalSaved !== 0 && (
                  <span className="text-muted-foreground">
                    {totalSaved > 0 ? `Saved ${formatFileSize(totalSaved)}` : `+${formatFileSize(Math.abs(totalSaved))}`}
                  </span>
                )}
              </div>

              {/* File list */}
              <div className="max-h-72 overflow-y-auto space-y-2">
                {files.map((f) => (
                  <FileCard
                    key={f.id}
                    file={f}
                    showPreview={false}
                    onRemove={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                    onDownload={() => f.outputUrl && downloadFile(f.outputUrl, f.outputName || f.name)}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button onClick={processAll} disabled={isProcessing || files.length === 0}>
                  {isProcessing ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</> : `Convert All (${files.length})`}
                </Button>
                {completedCount > 0 && (
                  <Button variant="outline" onClick={() => downloadAllAsZip(files, `batch-${outputFormat}.zip`)}>
                    <Download className="h-4 w-4 mr-2" /> Download ZIP
                  </Button>
                )}
                {errorCount > 0 && (
                  <Button variant="outline" onClick={retryFailed}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Retry Failed
                  </Button>
                )}
                <Button variant="ghost" onClick={() => { cleanupUrls(files); setFiles([]); }}>
                  <Trash2 className="h-4 w-4 mr-2" /> Clear All
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchExportTab;
