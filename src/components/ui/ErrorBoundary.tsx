import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Log error to an error reporting service if needed
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#101323]">
          <h1 className="text-white text-2xl font-bold mb-4">Something went wrong.</h1>
          <pre className="text-red-400 text-sm">{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
} 