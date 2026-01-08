import { useState, useRef, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'shimmer' | 'empty';
  onLoad?: () => void;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  hoverScale?: number;
}

/**
 * Optimized Image component with lazy loading, blur/shimmer placeholder, and accessibility
 * Supports multiple placeholder types and hover animations
 */
const OptimizedImage = memo(({
  src,
  alt,
  className,
  containerClassName,
  width,
  height,
  priority = false,
  placeholder = 'blur',
  onLoad,
  aspectRatio,
  objectFit = 'cover',
  hoverScale,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  // Dynamic aspect ratio style
  const aspectRatioStyle = aspectRatio ? { aspectRatio } : undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-muted',
        containerClassName
      )}
      style={{ width, height, ...aspectRatioStyle }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Shimmer placeholder */}
      {placeholder === 'shimmer' && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-muted overflow-hidden"
          aria-hidden="true"
        >
          <div 
            className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Failed to load</span>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-opacity duration-500',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          whileHover={hoverScale ? { scale: hoverScale } : undefined}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
