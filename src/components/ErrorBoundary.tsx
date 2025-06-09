
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnRouteChange?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

// Helper component to add navigation capabilities to error boundary
const ErrorFallback = ({ 
  error, 
  errorInfo, 
  resetErrorBoundary 
}: { 
  error: Error | null; 
  errorInfo: ErrorInfo | null;
  resetErrorBoundary: () => void;
}) => {
  
  const handleGoHome = () => {
    // Use window.location instead of useNavigate to avoid Router context issues
    window.location.href = '/';
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-background/90 backdrop-blur-lg rounded-lg border border-border text-center">
      <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
      <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
      <p className="text-muted-foreground mb-4 max-w-md">
        We apologize for the inconvenience. An error occurred in this component.
      </p>
      {error && (
        <div className="text-sm bg-muted p-4 rounded mb-6 max-w-lg overflow-auto text-left">
          <code>{error.toString()}</code>
          {errorInfo && (
            <details className="mt-2">
              <summary className="cursor-pointer text-primary">View component stack</summary>
              <pre className="mt-2 text-xs overflow-auto max-h-[200px]">
                {errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={handleGoHome}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Home
        </Button>
        <Button 
          onClick={resetErrorBoundary}
          className="flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    </div>
  );
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    errorCount: 0
  };
  
  private pathname: string = '';

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidMount() {
    this.pathname = window.location.pathname;
  }

  public componentDidUpdate() {
    // Reset error state if the route changes and resetOnRouteChange is true
    if (
      this.props.resetOnRouteChange &&
      this.state.hasError &&
      this.pathname !== window.location.pathname
    ) {
      this.resetErrorBoundary();
      this.pathname = window.location.pathname;
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // Store component stack
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));
    
    // Log to analytics or error tracking service could be added here
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private resetErrorBoundary = () => {
    const { errorCount } = this.state;
    
    // Show different toast messages based on error count
    if (errorCount > 2) {
      toast({
        title: "Recurring Issue Detected",
        description: "We're having trouble with this component. You may want to try a different section of the site.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Attempting to recover",
        description: "The component is being reloaded.",
        variant: "default"
      });
    }
    
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <ErrorFallback 
          error={this.state.error} 
          errorInfo={this.state.errorInfo}
          resetErrorBoundary={this.resetErrorBoundary} 
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
