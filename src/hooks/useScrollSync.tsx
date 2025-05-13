
import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface UseScrollSyncOptions {
  smooth?: boolean;
  delay?: number;
  offset?: number;
  onScrollComplete?: () => void;
}

/**
 * A hook to sync URL hash with scroll position
 */
export function useScrollSync(options: UseScrollSyncOptions = {}) {
  const { smooth = true, delay = 300, offset = 0, onScrollComplete } = options;
  const location = useLocation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return false;
    
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    
    if (smooth) {
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
      
      // Call onScrollComplete after animation is likely to have finished
      if (onScrollComplete) {
        setTimeout(onScrollComplete, 500);
      }
    } else {
      window.scrollTo(0, top);
      if (onScrollComplete) {
        onScrollComplete();
      }
    }
    
    return true;
  }, [smooth, offset, onScrollComplete]);
  
  // Handle scroll synchronization when the URL hash changes
  useEffect(() => {
    if (!location.hash) {
      return;
    }
    
    const id = location.hash.substring(1);
    
    // Clear previous timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Delay the scroll to ensure the DOM has fully rendered
    timerRef.current = setTimeout(() => {
      scrollToElement(id);
      timerRef.current = null;
    }, delay);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [location.hash, scrollToElement, delay]);
  
  return { scrollToElement };
}

export default useScrollSync;
