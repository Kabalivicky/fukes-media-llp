import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Download, Loader2, Trash2, Image, AlertTriangle, Info } from 'lucide-react';
import SharedDropzone from '../shared/SharedDropzone';
import FileCard from '../shared/FileCard';
import { MediaFile, generateId, getExtension, formatFileSize } from '../shared/types';
import { downloadFile, downloadAllAsZip, cleanupUrls } from '../shared/DownloadManager';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const BROWSER_READABLE = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg', 'ico', 'avif'];
const THREEJS_DECODABLE = ['exr', 'hdr'];
const WRITABLE_FORMATS = [
  { value: 'jpg', label: 'JPEG', mime: 'image/jpeg' },
  { value: 'png', label: 'PNG', mime: 'image/png' },
  { value: 'webp', label: 'WebP', mime: 'image/webp' },
];

const ACCEPT = '.jpg,.jpeg,.png,.webp,.gif,.bmp,.svg,.ico,.avif,.exr,.hdr';

const ImageConverterTab = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [outputFormat, setOutputFormat] = useState('png');
  const [quality, setQuality] = useState(90);
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => () => cleanupUrls(files), []);

  const handleFiles = useCallback((newFiles: File[]) => {
    const mediaFiles: MediaFile[] = newFiles.map((f) => {
      const ext = getExtension(f.name);
      const canPreview = BROWSER_READABLE.includes(ext);
      return {
        id: generateId(),
        file: f,
        name: f.name,
        size: f.size,
        type: f.type,
        extension: ext,
        previewUrl: canPreview ? URL.createObjectURL(f) : undefined,
        status: 'pending',
        progress: 0,
      };
    });
    setFiles((prev) => [...prev, ...mediaFiles]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.previewUrl) URL.revokeObjectURL(file.previewUrl);
      if (file?.outputUrl) URL.revokeObjectURL(file.outputUrl);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const decodeHDR = async (file: File): Promise<ImageData> => {
    const ext = getExtension(file.name);
    const arrayBuffer = await file.arrayBuffer();
    const url = URL.createObjectURL(file);

    return new Promise((resolve, reject) => {
      const loader = ext === 'exr' ? new EXRLoader() : new RGBELoader();
      loader.load(url, (texture: any) => {
        URL.revokeObjectURL(url);
        const data = texture.image?.data;
        const w = texture.image?.width;
        const h = texture.image?.height;
        if (!data || !w || !h) return reject(new Error('Failed to decode HDR'));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        const imgData = ctx.createImageData(w, h);

        for (let i = 0; i < w * h; i++) {
          const si = i * (data.length / (w * h));
          let r = data[si], g = data[si + 1], b = data[si + 2];
          // Reinhard tone mapping
          r = r / (1 + r); g = g / (1 + g); b = b / (1 + b);
          // Gamma correction
          const gamma = 1 / 2.2;
          r = Math.pow(r, gamma); g = Math.pow(g, gamma); b = Math.pow(b, gamma);
          imgData.data[i * 4] = Math.min(255, Math.round(r * 255));
          imgData.data[i * 4 + 1] = Math.min(255, Math.round(g * 255));
          imgData.data[i * 4 + 2] = Math.min(255, Math.round(b * 255));
          imgData.data[i * 4 + 3] = 255;
        }
        resolve(imgData);
      }, undefined, (err: any) => {
        URL.revokeObjectURL(url);
        reject(err);
      });
    });
  };

  const convertFile = async (mediaFile: MediaFile): Promise<MediaFile> => {
    const ext = mediaFile.extension;
    const fmt = WRITABLE_FORMATS.find((f) => f.value === outputFormat)!;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    try {
      if (THREEJS_DECODABLE.includes(ext)) {
        const imgData = await decodeHDR(mediaFile.file);
        canvas.width = imgData.width;
        canvas.height = imgData.height;
        ctx.putImageData(imgData, 0, 0);
      } else {
        const img = new window.Image();
        const url = URL.createObjectURL(mediaFile.file);
        await new Promise<void>((res, rej) => {
          img.onload = () => { URL.revokeObjectURL(url); res(); };
          img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('Failed to decode image')); };
          img.src = url;
        });
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
      }

      // Resize
      if (resizeEnabled && (width || height)) {
        const ow = canvas.width, oh = canvas.height;
        let tw = parseInt(width) || 0, th = parseInt(height) || 0;
        if (maintainAspect) {
          if (tw && !th) th = Math.round(oh * (tw / ow));
          else if (th && !tw) tw = Math.round(ow * (th / oh));
        }
        if (tw && th) {
          const tmp = document.createElement('canvas');
          tmp.width = tw; tmp.height = th;
          tmp.getContext('2d')!.drawImage(canvas, 0, 0, tw, th);
          canvas.width = tw; canvas.height = th;
          ctx.drawImage(tmp, 0, 0);
        }
      }

      const q = fmt.value === 'png' ? undefined : quality / 100;
      const blob = await new Promise<Blob>((res, rej) =>
        canvas.toBlob((b) => (b ? res(b) : rej(new Error('Canvas export failed'))), fmt.mime, q)
      );

      const outName = mediaFile.name.replace(/\.[^.]+$/, `.${outputFormat}`);
      const outUrl = URL.createObjectURL(blob);
      const previewUrl = URL.createObjectURL(blob);

      return {
        ...mediaFile,
        status: 'complete',
        progress: 100,
        outputUrl: outUrl,
        outputSize: blob.size,
        outputName: outName,
        previewUrl: mediaFile.previewUrl || previewUrl,
      };
    } catch (err) {
      return {
        ...mediaFile,
        status: 'error',
        error: err instanceof Error ? err.message : 'Conversion failed',
      };
    }
  };

  const convertAll = async () => {
    if (files.length === 0 || !outputFormat) return;
    setIsConverting(true);

    const updated = [...files];
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === 'complete') continue;
      updated[i] = { ...updated[i], status: 'processing', progress: 50 };
      setFiles([...updated]);
      updated[i] = await convertFile(updated[i]);
      setFiles([...updated]);
    }
    setIsConverting(false);
  };

  const completedCount = files.filter((f) => f.status === 'complete').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            Image Converter
          </CardTitle>
          <CardDescription>
            Convert between JPG, PNG, WebP, GIF, SVG, AVIF, EXR, and HDR. All processing happens in your browser — files never leave your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Info banner */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              Supports most common web and mobile image formats. EXR/HDR files are tone-mapped for browser preview. Output is limited to JPG, PNG, and WebP via Canvas API.
            </span>
          </div>

          <SharedDropzone
            accept={ACCEPT}
            onFiles={handleFiles}
            label="Drop images here"
            description="JPG, PNG, WebP, GIF, SVG, AVIF, EXR, HDR"
            disabled={isConverting}
          />

          {files.length > 0 && (
            <>
              {/* Settings */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {WRITABLE_FORMATS.map((f) => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {outputFormat !== 'png' && (
                  <div className="space-y-2">
                    <Label>Quality: {quality}%</Label>
                    <Slider value={[quality]} onValueChange={([v]) => setQuality(v)} min={10} max={100} step={5} />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch checked={resizeEnabled} onCheckedChange={setResizeEnabled} id="resize" />
                    <Label htmlFor="resize">Resize</Label>
                  </div>
                  {resizeEnabled && (
                    <div className="flex gap-2">
                      <Input placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} type="number" />
                      <Input placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} type="number" />
                    </div>
                  )}
                </div>

                {resizeEnabled && (
                  <div className="flex items-center gap-2">
                    <Switch checked={maintainAspect} onCheckedChange={setMaintainAspect} id="aspect" />
                    <Label htmlFor="aspect">Keep aspect ratio</Label>
                  </div>
                )}
              </div>

              {/* File list */}
              <div className="space-y-2">
                {files.map((f) => (
                  <FileCard
                    key={f.id}
                    file={f}
                    onRemove={() => removeFile(f.id)}
                    onDownload={() => f.outputUrl && downloadFile(f.outputUrl, f.outputName || f.name)}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button onClick={convertAll} disabled={isConverting || files.length === 0}>
                  {isConverting ? <><Loader2 className="h-4 w-4 animate-spin" /> Converting...</> : `Convert ${files.length} file(s)`}
                </Button>
                {completedCount > 1 && (
                  <Button variant="outline" onClick={() => downloadAllAsZip(files, 'images.zip')}>
                    <Download className="h-4 w-4 mr-2" /> Download All (.zip)
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

export default ImageConverterTab;
