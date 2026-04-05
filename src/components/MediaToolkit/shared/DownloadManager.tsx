import JSZip from 'jszip';
import { MediaFile } from './types';

export const downloadFile = (url: string, filename: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const downloadAllAsZip = async (
  files: MediaFile[],
  zipName = 'converted-files.zip'
) => {
  const completed = files.filter((f) => f.status === 'complete' && f.outputUrl);
  if (completed.length === 0) return;

  const zip = new JSZip();

  await Promise.all(
    completed.map(async (file) => {
      try {
        const resp = await fetch(file.outputUrl!);
        const blob = await resp.blob();
        zip.file(file.outputName || file.name, blob);
      } catch {
        // Skip failed downloads
      }
    })
  );

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  downloadFile(url, zipName);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

export const cleanupUrls = (files: MediaFile[]) => {
  files.forEach((f) => {
    if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    if (f.outputUrl) URL.revokeObjectURL(f.outputUrl);
  });
};
