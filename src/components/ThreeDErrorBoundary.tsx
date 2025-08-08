import React from 'react';

interface ThreeDErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ThreeDErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ThreeDErrorBoundary extends React.Component<ThreeDErrorBoundaryProps, ThreeDErrorBoundaryState> {
  constructor(props: ThreeDErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ThreeDErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-32 text-muted-foreground">
          <p>3D visualization temporarily unavailable</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ThreeDErrorBoundary;