import { supabase } from '@/integrations/supabase/client';

export interface ToolUsageData {
  toolName: string;
  inputFormat?: string;
  outputFormat?: string;
  fileSize?: number;
  processingTime?: number;
  success: boolean;
  errorMessage?: string;
}

export const logToolUsage = async (usage: ToolUsageData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('tool_usage')
      .insert({
        user_id: user?.id || null,
        tool_name: usage.toolName,
        input_format: usage.inputFormat,
        output_format: usage.outputFormat,
        file_size: usage.fileSize,
        processing_time: usage.processingTime,
        success: usage.success,
        error_message: usage.errorMessage
      });

    if (error) {
      // Failed to log tool usage
    }
  } catch (error) {
    // Failed to log tool usage
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(fileExtension || '');
};

export const simulateProcessing = async (
  duration: number,
  onProgress?: (progress: number) => void
): Promise<void> => {
  const steps = 20;
  const stepDuration = duration / steps;
  
  for (let i = 0; i <= steps; i++) {
    const progress = (i / steps) * 100;
    if (onProgress) {
      onProgress(progress);
    }
    await new Promise(resolve => setTimeout(resolve, stepDuration));
  }
};

// Mock conversion functions - in production, these would call actual conversion services
export const mockVideoConversion = async (
  files: File[],
  outputFormat: string,
  quality: string,
  onProgress?: (progress: number) => void
): Promise<{ success: boolean; error?: string }> => {
  const startTime = Date.now();
  
  try {
    // Simulate processing time based on file size and quality
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const baseTime = Math.max(2000, totalSize / (1024 * 1024) * 1000); // 1 second per MB minimum
    const qualityMultiplier = {
      'low': 0.5,
      'medium': 1,
      'high': 1.5,
      'ultra': 2
    }[quality] || 1;
    
    const processingTime = baseTime * qualityMultiplier;
    
    await simulateProcessing(processingTime, onProgress);
    
    // Log usage
    for (const file of files) {
      await logToolUsage({
        toolName: 'video-converter',
        inputFormat: file.name.split('.').pop(),
        outputFormat,
        fileSize: file.size,
        processingTime: Date.now() - startTime,
        success: true
      });
    }
    
    return { success: true };
  } catch (error) {
    await logToolUsage({
      toolName: 'video-converter',
      outputFormat,
      processingTime: Date.now() - startTime,
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { success: false, error: 'Conversion failed' };
  }
};

export const mockImageConversion = async (
  file: File,
  outputFormat: string,
  quality: number,
  resize?: { width: number; height: number },
  onProgress?: (progress: number) => void
): Promise<{ success: boolean; error?: string }> => {
  const startTime = Date.now();
  
  try {
    const processingTime = Math.max(1000, file.size / (1024 * 500)); // 500KB per second
    
    await simulateProcessing(processingTime, onProgress);
    
    await logToolUsage({
      toolName: 'image-converter',
      inputFormat: file.name.split('.').pop(),
      outputFormat,
      fileSize: file.size,
      processingTime: Date.now() - startTime,
      success: true
    });
    
    return { success: true };
  } catch (error) {
    await logToolUsage({
      toolName: 'image-converter',
      outputFormat,
      processingTime: Date.now() - startTime,
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { success: false, error: 'Conversion failed' };
  }
};

export const mockAudioConversion = async (
  file: File,
  outputFormat: string,
  bitrate: string,
  onProgress?: (progress: number) => void
): Promise<{ success: boolean; error?: string }> => {
  const startTime = Date.now();
  
  try {
    const processingTime = Math.max(1500, file.size / (1024 * 200)); // 200KB per second
    
    await simulateProcessing(processingTime, onProgress);
    
    await logToolUsage({
      toolName: 'audio-converter',
      inputFormat: file.name.split('.').pop(),
      outputFormat,
      fileSize: file.size,
      processingTime: Date.now() - startTime,
      success: true
    });
    
    return { success: true };
  } catch (error) {
    await logToolUsage({
      toolName: 'audio-converter',
      outputFormat,
      processingTime: Date.now() - startTime,
      success: false,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { success: false, error: 'Conversion failed' };
  }
};