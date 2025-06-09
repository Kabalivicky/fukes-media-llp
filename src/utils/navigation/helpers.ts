
import React from 'react';

// Common utilities for navigation - memoized for better performance
export const isLinkActive = (currentPath: string, linkPath: string): boolean => {
  if (linkPath === '/') {
    return currentPath === '/' && !currentPath.includes('#');
  }
  
  if (linkPath.startsWith('/#')) {
    return currentPath === '/' && currentPath.includes(linkPath.substring(1));
  }
  
  return currentPath === linkPath;
};

export const handleAnchorClick = (
  e: React.MouseEvent<HTMLAnchorElement>, 
  path: string, 
  currentPath: string
) => {
  if (path.startsWith('/#') && currentPath !== '/') {
    // Let it navigate to home page with anchor
    return;
  } else if (path.startsWith('/#')) {
    e.preventDefault();
    const targetId = path.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Smooth scroll with improved behavior
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
      
      // Update URL without full page reload
      window.history.pushState(null, '', path);
    }
  }
};
