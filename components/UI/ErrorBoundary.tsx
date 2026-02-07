import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
          <div className="max-w-xl w-full bg-white shadow-xl rounded-sm border-l-4 border-red-500 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-50 p-3 rounded-full text-red-500">
                 <AlertTriangle size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-serif text-primary font-bold">Something went wrong</h1>
                <p className="text-stone-500">The application encountered an unexpected error.</p>
              </div>
            </div>

            <div className="bg-stone-100 p-4 rounded text-sm font-mono text-red-600 mb-6 overflow-auto max-h-48 border border-stone-200">
              {this.state.error?.toString()}
              <br />
              {this.state.errorInfo?.componentStack && (
                 <span className="text-stone-500 mt-2 block whitespace-pre-wrap text-xs">
                    {this.state.errorInfo.componentStack}
                 </span>
              )}
            </div>

            <button 
              onClick={this.handleReload}
              className="bg-primary text-white px-6 py-3 rounded-sm font-medium tracking-wide hover:bg-opacity-90 transition-all flex items-center gap-2"
            >
              <RefreshCw size={18} /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;