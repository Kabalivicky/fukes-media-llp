import { ReactNode } from 'react';

interface LiveRegionProps {
  children: ReactNode;
  mode?: 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

/**
 * Live region for announcing dynamic content changes to screen readers
 */
const LiveRegion = ({
  children,
  mode = 'polite',
  atomic = true,
  relevant = 'additions',
}: LiveRegionProps) => {
  return (
    <div
      role="status"
      aria-live={mode}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className="sr-only"
    >
      {children}
    </div>
  );
};

export default LiveRegion;
