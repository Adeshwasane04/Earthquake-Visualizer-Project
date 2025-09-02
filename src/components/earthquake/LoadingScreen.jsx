import React from 'react';
import { Activity } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-smooth">
      <div className="text-center">
        <Activity className="w-16 h-16 animate-spin mx-auto mb-6 text-status-info" />
        <h2 className="text-2xl font-bold mb-2">Loading Earthquake Data</h2>
        <p className="text-muted-foreground">Fetching real-time seismic activity...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;