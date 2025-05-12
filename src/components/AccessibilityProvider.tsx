
import React, { useEffect } from 'react';

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

/**
 * Component to enhance accessibility across the application
 */
const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  // Apply accessibility enhancements when the component mounts
  useEffect(() => {
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:p-4 focus:bg-primary focus:text-primary-foreground focus:z-[100]';
    skipLink.innerText = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhance focus visibility
    document.documentElement.classList.add('focus-visible:outline-primary');
    
    // Return cleanup function
    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
      document.documentElement.classList.remove('focus-visible:outline-primary');
    };
  }, []);

  return <>{children}</>;
};

export default AccessibilityProvider;
