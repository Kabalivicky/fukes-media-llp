import { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Download, Eye, AlertTriangle, Info, Loader2 } from 'lucide-react';
import SharedDropzone from '../shared/SharedDropzone';
import { downloadFile } from '../shared/DownloadManager';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

interface EXRData {
  data: Float32Array | Uint16Array;
  width: number;
  height: number;
  channels: number;
}

const EXRViewerTab = () => {
  const [file, setFile] = useState<File | null>(null);
  const [exrData, setExrData] = useState<EXRData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exposure, setExposure] = useState(1.0);
  const [gamma, setGamma] = useState(2.2);
  const [toneMapping, setToneMapping] = useState<'reinhard' | 'aces' | 'linear'>('reinhard');
  const [outputFormat, setOutputFormat] = useState('png');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadEXR = useCallback(async (f: File) => {
    setLoading(true);
    setError(null);
    const url = URL.createObjectURL(f);

    try {
      const loader = new EXRLoader();
      const texture = await new Promise<any>((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
      URL.revokeObjectURL(url);

      const { data, width, height } = texture.image;
      const channels = data.length / (width * height);
      setExrData({ data, width, height, channels });
      setFile(f);
    } catch (err) {
      URL.revokeObjectURL(url);
      setError(err instanceof Error ? err.message : 'Failed to decode EXR file');
    }
    setLoading(false);
  }, []);

  const applyToneMap = useCallback((value: number, exp: number): number => {
    const v = value * exp;
    switch (toneMapping) {
      case 'reinhard': return v / (1 + v);
      case 'aces': {
        const a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
        return Math.max(0, Math.min(1, (v * (a * v + b)) / (v * (c * v + d) + e)));
      }
      case 'linear': return Math.min(1, v);
    }
  }, [toneMapping]);

  // Render to canvas whenever settings change
  useEffect(() => {
    if (!exrData || !canvasRef.current) return;
    const { data, width, height, channels } = exrData;
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    const imgData = ctx.createImageData(width, height);
    const gammaInv = 1 / gamma;

    for (let i = 0; i < width * height; i++) {
      const si = i * channels;
      let r = applyToneMap(data[si] || 0, exposure);
      let g = applyToneMap(data[si + 1] || 0, exposure);
      let b = applyToneMap(data[si + 2] || 0, exposure);
      r = Math.pow(r, gammaInv);
      g = Math.pow(g, gammaInv);
      b = Math.pow(b, gammaInv);
      imgData.data[i * 4] = Math.min(255, Math.round(r * 255));
      imgData.data[i * 4 + 1] = Math.min(255, Math.round(g * 255));
      imgData.data[i * 4 + 2] = Math.min(255, Math.round(b * 255));
      imgData.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }, [exrData, exposure, gamma, toneMapping, applyToneMap]);

  const exportImage = useCallback(() => {
    if (!canvasRef.current) return;
    const mimeMap: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const name = (file?.name || 'output').replace(/\.exr$/i, `.${outputFormat}`);
      downloadFile(url, name);
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    }, mimeMap[outputFormat], 0.95);
  }, [outputFormat, file]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            EXR Viewer & Converter
          </CardTitle>
          <CardDescription>
            Preview OpenEXR files with adjustable exposure, gamma, and tone mapping. Export to PNG, JPG, or WebP.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Warnings */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 text-yellow-500" />
            <div className="space-y-1">
              <p><strong>Browser limitations:</strong> EXR is a professional HDR/VFX format. This viewer supports standard single-layer EXR files.</p>
              <p>Multilayer EXR, deep data, some compression modes, and production metadata may not be preserved. For full pipeline work, use DaVinci Resolve, Nuke, or Photoshop.</p>
            </div>
          </div>

          {!exrData && (
            <SharedDropzone
              accept=".exr"
              multiple={false}
              onFiles={(fs) => fs[0] && loadEXR(fs[0])}
              label="Drop an EXR file here"
              description="Single-layer OpenEXR files"
              disabled={loading}
            />
          )}

          {loading && (
            <div className="flex items-center justify-center gap-2 py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-muted-foreground">Decoding EXR…</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive">
              {error}
            </div>
          )}

          {exrData && (
            <>
              {/* Controls */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Exposure: {exposure.toFixed(2)}</Label>
                  <Slider value={[exposure]} onValueChange={([v]) => setExposure(v)} min={0.1} max={5} step={0.05} />
                </div>
                <div className="space-y-2">
                  <Label>Gamma: {gamma.toFixed(2)}</Label>
                  <Slider value={[gamma]} onValueChange={([v]) => setGamma(v)} min={0.5} max={4} step={0.05} />
                </div>
                <div className="space-y-2">
                  <Label>Tone Mapping</Label>
                  <Select value={toneMapping} onValueChange={(v: any) => setToneMapping(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reinhard">Reinhard</SelectItem>
                      <SelectItem value="aces">ACES Filmic</SelectItem>
                      <SelectItem value="linear">Linear (Clamp)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Export As</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPEG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{exrData.width} × {exrData.height}</span>
                <span>{exrData.channels} channels</span>
                {file && <span>{(file.size / (1024 * 1024)).toFixed(1)} MB</span>}
              </div>

              {/* Canvas preview */}
              <div className="rounded-lg overflow-auto border bg-[hsl(var(--muted)/0.3)] max-h-[600px]">
                <canvas ref={canvasRef} className="max-w-full h-auto" />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button onClick={exportImage}>
                  <Download className="h-4 w-4 mr-2" /> Export {outputFormat.toUpperCase()}
                </Button>
                <Button variant="outline" onClick={() => { setExrData(null); setFile(null); setError(null); }}>
                  Load Another
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EXRViewerTab;
