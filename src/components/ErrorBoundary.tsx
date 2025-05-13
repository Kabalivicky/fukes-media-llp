
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleReset = () => {
    toast.info("Attempting to recover from error");
    this.setState({ hasError: false, error: null });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-background/90 backdrop-blur-lg rounded-lg border border-border text-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
          <p className="text-muted-foreground mb-4 max-w-md">
            We apologize for the inconvenience. An error occurred in this component.
          </p>
          <div className="text-sm bg-muted p-4 rounded mb-6 max-w-lg overflow-auto text-left">
            <code>{this.state.error?.toString()}</code>
          </div>
          <Button onClick={this.handleReset}>
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
