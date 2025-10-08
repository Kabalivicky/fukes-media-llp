/**
 * Download Helper Utilities
 * Provides functions to download converted files
 */

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadMultipleFiles = async (files: { blob: Blob; filename: string }[]) => {
  // Download files sequentially with a small delay to avoid browser blocking
  for (const file of files) {
    downloadFile(file.blob, file.filename);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

export const createDemoFile = (originalFile: File, format: string): Blob => {
  // For demo purposes, create a text file with conversion info
  const content = `
===========================================
FILE CONVERSION DEMO
===========================================

Original File: ${originalFile.name}
Original Size: ${(originalFile.size / 1024).toFixed(2)} KB
Original Type: ${originalFile.type}

Converted To: ${format.toUpperCase()}
Conversion Status: SUCCESS
Timestamp: ${new Date().toISOString()}

===========================================
NOTE: This is a demo conversion.
In production, actual file conversion would occur here.
===========================================
  `.trim();

  return new Blob([content], { type: 'text/plain' });
};

export const convertAndDownloadFile = async (
  file: File,
  outputFormat: string,
  options?: Record<string, any>
): Promise<void> => {
  try {
    // In a real implementation, this would call a conversion API
    // For now, we'll create a demo file
    const convertedBlob = createDemoFile(file, outputFormat);
    
    // Generate filename with new extension
    const originalName = file.name.split('.').slice(0, -1).join('.');
    const newFilename = `${originalName}_converted.${outputFormat}`;
    
    // Download the file
    downloadFile(convertedBlob, newFilename);
  } catch (error) {
    console.error('Error converting file:', error);
    throw error;
  }
};

export const batchConvertAndDownload = async (
  files: File[],
  outputFormat: string,
  options?: Record<string, any>
): Promise<void> => {
  try {
    const convertedFiles = files.map(file => {
      const convertedBlob = createDemoFile(file, outputFormat);
      const originalName = file.name.split('.').slice(0, -1).join('.');
      const newFilename = `${originalName}_converted.${outputFormat}`;
      
      return { blob: convertedBlob, filename: newFilename };
    });
    
    await downloadMultipleFiles(convertedFiles);
  } catch (error) {
    console.error('Error batch converting files:', error);
    throw error;
  }
};
