import { useCallback, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SharedDropzoneProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  onFiles: (files: File[]) => void;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

const SharedDropzone = ({
  accept,
  multiple = true,
  maxSize = 500 * 1024 * 1024, // 500MB default
  onFiles,
  label = 'Drop files here or click to browse',
  description,
  className,
  disabled = false,
}: SharedDropzoneProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const arr = Array.from(fileList).filter((f) => f.size <= maxSize);
      if (arr.length > 0) onFiles(arr);
    },
    [maxSize, onFiles]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer',
        dragActive
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : 'border-border hover:border-primary/50 hover:bg-muted/30',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
      />
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground max-w-md">{description}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Max file size: {(maxSize / (1024 * 1024)).toFixed(0)}MB
        </p>
      </div>
    </div>
  );
};

export default SharedDropzone;
