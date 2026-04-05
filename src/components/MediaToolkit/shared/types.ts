export interface MediaFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  extension: string;
  previewUrl?: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  progress: number;
  error?: string;
  outputUrl?: string;
  outputSize?: number;
  outputName?: string;
}

export interface ConversionJob {
  id: string;
  files: MediaFile[];
  toolType: ToolType;
  outputFormat: string;
  settings: Record<string, unknown>;
  status: 'queued' | 'processing' | 'complete' | 'error' | 'cancelled';
  progress: number;
  createdAt: number;
  completedAt?: number;
  error?: string;
}

export type ToolType = 
  | 'image-converter'
  | 'exr-viewer'
  | 'sequence-to-video'
  | 'video-converter'
  | 'audio-tools'
  | 'batch-export';

export interface ConversionSettings {
  quality?: number;
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  fps?: number;
  bitrate?: string;
  preset?: 'high' | 'balanced' | 'small';
  exposure?: number;
  gamma?: number;
  toneMapping?: 'reinhard' | 'aces' | 'linear';
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const generateId = () => Math.random().toString(36).substring(2, 12);

export const getExtension = (filename: string) =>
  filename.split('.').pop()?.toLowerCase() || '';

export const naturalSort = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
