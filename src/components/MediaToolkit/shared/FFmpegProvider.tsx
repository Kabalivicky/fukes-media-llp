import { createContext, useContext, useCallback, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

interface FFmpegContextValue {
  ffmpeg: FFmpeg | null;
  loaded: boolean;
  loading: boolean;
  loadProgress: number;
  error: string | null;
  load: () => Promise<FFmpeg | null>;
}

const FFmpegContext = createContext<FFmpegContextValue>({
  ffmpeg: null,
  loaded: false,
  loading: false,
  loadProgress: 0,
  error: null,
  load: async () => null,
});

export const useFFmpeg = () => useContext(FFmpegContext);

const BASE_URL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
const MT_BASE_URL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm';

export const FFmpegProvider = ({ children }: { children: React.ReactNode }) => {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<FFmpeg | null> => {
    if (ffmpegRef.current && loaded) return ffmpegRef.current;
    if (loading) return null;

    setLoading(true);
    setError(null);
    setLoadProgress(0);

    try {
      const ffmpeg = new FFmpeg();
      ffmpeg.on('progress', ({ progress }) => {
        setLoadProgress(Math.round(progress * 100));
      });

      // Try multi-threaded first, fall back to single-threaded
      let success = false;
      
      if (typeof SharedArrayBuffer !== 'undefined') {
        try {
          const coreURL = await toBlobURL(`${MT_BASE_URL}/ffmpeg-core.js`, 'text/javascript');
          const wasmURL = await toBlobURL(`${MT_BASE_URL}/ffmpeg-core.wasm`, 'application/wasm');
          const workerURL = await toBlobURL(`${MT_BASE_URL}/ffmpeg-core.worker.js`, 'text/javascript');
          await ffmpeg.load({ coreURL, wasmURL, workerURL });
          success = true;
          console.log('FFmpeg loaded (multi-threaded)');
        } catch {
          console.warn('Multi-threaded FFmpeg failed, falling back to single-threaded');
        }
      }

      if (!success) {
        const coreURL = await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, 'text/javascript');
        const wasmURL = await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, 'application/wasm');
        await ffmpeg.load({ coreURL, wasmURL });
        console.log('FFmpeg loaded (single-threaded)');
      }

      ffmpegRef.current = ffmpeg;
      setLoaded(true);
      setLoading(false);
      return ffmpeg;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load FFmpeg';
      setError(msg);
      setLoading(false);
      return null;
    }
  }, [loaded, loading]);

  return (
    <FFmpegContext.Provider value={{ ffmpeg: ffmpegRef.current, loaded, loading, loadProgress, error, load }}>
      {children}
    </FFmpegContext.Provider>
  );
};
