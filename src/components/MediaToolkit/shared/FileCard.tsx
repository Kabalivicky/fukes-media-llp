import { X, CheckCircle, AlertTriangle, Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MediaFile, formatFileSize } from './types';
import { cn } from '@/lib/utils';

interface FileCardProps {
  file: MediaFile;
  onRemove?: () => void;
  onDownload?: () => void;
  showPreview?: boolean;
}

const FileCard = ({ file, onRemove, onDownload, showPreview = true }: FileCardProps) => {
  const statusIcon = {
    pending: null,
    processing: <Loader2 className="h-4 w-4 animate-spin text-primary" />,
    complete: <CheckCircle className="h-4 w-4 text-green-500" />,
    error: <AlertTriangle className="h-4 w-4 text-destructive" />,
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg border bg-card transition-colors',
        file.status === 'error' && 'border-destructive/30 bg-destructive/5',
        file.status === 'complete' && 'border-green-500/30 bg-green-500/5'
      )}
    >
      {/* Thumbnail */}
      {showPreview && file.previewUrl && (
        <img
          src={file.previewUrl}
          alt={file.name}
          className="w-10 h-10 rounded object-cover flex-shrink-0"
        />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{file.extension.toUpperCase()}</span>
          <span>·</span>
          <span>{formatFileSize(file.size)}</span>
          {file.outputSize != null && file.status === 'complete' && (
            <>
              <span>→</span>
              <span className="text-green-600">{formatFileSize(file.outputSize)}</span>
            </>
          )}
        </div>
        {file.status === 'processing' && (
          <Progress value={file.progress} className="h-1 mt-1.5" />
        )}
        {file.error && (
          <p className="text-xs text-destructive mt-1">{file.error}</p>
        )}
      </div>

      {/* Status + Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {statusIcon[file.status]}
        {file.status === 'complete' && file.outputUrl && onDownload && (
          <Button size="icon" variant="ghost" onClick={onDownload} className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
        )}
        {onRemove && file.status !== 'processing' && (
          <Button size="icon" variant="ghost" onClick={onRemove} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileCard;
