import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorScreen = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-smooth">
      <div className="text-center p-8 max-w-md">
        <AlertTriangle className="w-20 h-20 mx-auto mb-6 text-status-error" />
        <h2 className="text-3xl font-bold mb-4">Connection Error</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <button 
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-bounce"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;