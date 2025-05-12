
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface UseScrollSyncOptions {
  smooth?: boolean;
  delay?: number;
  offset?: number;
}

/**
 * A hook to sync URL hash with scroll position
 */
export function useScrollSync(options: UseScrollSyncOptions = {}) {
  const { smooth = true, delay = 300, offset = 0 } = options;
  const location = useLocation();
  
  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    
    if (smooth) {
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, top);
    }
  }, [smooth, offset]);
  
  // Handle scroll synchronization when the URL hash changes
  useEffect(() => {
    if (!location.hash) {
      return;
    }
    
    const id = location.hash.substring(1);
    
    // Delay the scroll to ensure the DOM has fully rendered
    const timer = setTimeout(() => {
      scrollToElement(id);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [location.hash, scrollToElement, delay]);
  
  return { scrollToElement };
}

export default useScrollSync;
