import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// Type declaration for Google Analytics gtag
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
  }
}

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 error for analytics (if Google Analytics is configured)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_not_found', {
        page_path: location.pathname
      });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-semibold text-foreground mb-2">Oops! Page not found</p>
        <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <Button size="lg" className="gradient-button">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
