import React from 'react';
import { Info } from 'lucide-react';

const EarthquakeDetails = ({ 
  earthquake, 
  onClose, 
  getMagnitudeColor, 
  getMagnitudeLabel, 
  formatTime 
}) => {
  if (!earthquake) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-earthquake">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full shadow-lg"
            style={{ backgroundColor: getMagnitudeColor(earthquake.properties.mag) }}
          />
          Earthquake Details
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-smooth text-2xl leading-none"
        >
          ×
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Location</p>
          <p className="font-semibold text-lg">{earthquake.properties.place || 'Unknown Location'}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Magnitude</p>
          <p className="font-bold text-2xl">
            <span style={{ color: getMagnitudeColor(earthquake.properties.mag) }}>
              {earthquake.properties.mag?.toFixed(1) || 'N/A'}
            </span>
            <span className="text-sm font-normal ml-2 text-muted-foreground">
              ({getMagnitudeLabel(earthquake.properties.mag)})
            </span>
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Time</p>
          <p className="font-semibold">{formatTime(earthquake.properties.time)}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(earthquake.properties.time).toLocaleString()}
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Depth</p>
          <p className="font-semibold text-lg">
            {earthquake.geometry.coordinates[2]?.toFixed(1) || 'N/A'} km
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Coordinates</p>
          <p className="font-mono text-sm">
            {earthquake.geometry.coordinates[1]?.toFixed(3)}°, {earthquake.geometry.coordinates[0]?.toFixed(3)}°
          </p>
        </div>
        
        {earthquake.properties.url && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">More Info</p>
            <a 
              href={earthquake.properties.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth font-medium"
            >
              <Info className="w-4 h-4" />
              USGS Report
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarthquakeDetails;