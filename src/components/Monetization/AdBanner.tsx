import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const AdBanner = ({ slot = 'YOUR-AD-SLOT-ID', format = 'auto', className = '' }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Only load ads in production and if not already loaded
    if (isAdLoaded.current) return;
    
    try {
      // Check if AdSense script is loaded
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.log('AdSense not available');
    }
  }, []);

  // Placeholder for development - replace with actual AdSense code in production
  return (
    <div className={`ad-container ${className}`}>
      <div 
        ref={adRef}
        className="bg-muted/30 border border-border/50 rounded-lg flex items-center justify-center min-h-[90px] text-muted-foreground text-sm"
      >
        {/* Development placeholder - Replace with actual AdSense code */}
        <div className="text-center p-4">
          <p className="font-medium">Advertisement Space</p>
          <p className="text-xs mt-1 opacity-70">Configure your Google AdSense ID</p>
        </div>
        
        {/* Actual AdSense code - uncomment when you have your publisher ID
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        */}
      </div>
    </div>
  );
};

export default AdBanner;
