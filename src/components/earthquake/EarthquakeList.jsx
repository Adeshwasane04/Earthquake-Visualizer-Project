import React from 'react';
import { Activity } from 'lucide-react';

const EarthquakeList = ({ 
  earthquakes, 
  selectedEarthquake, 
  setSelectedEarthquake, 
  getMagnitudeColor, 
  getMagnitudeLabel, 
  formatTime 
}) => {
  return (
    <div className="bg-card border border-border rounded-xl shadow-card">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Activity className="w-6 h-6 text-status-info" />
          Recent Earthquakes
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Last 24 hours • Showing {Math.min(20, earthquakes.length)} of {earthquakes.length} earthquakes
        </p>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {earthquakes.slice(0, 20).map((earthquake, index) => {
          const isSelected = selectedEarthquake === earthquake;
          return (
            <div 
              key={earthquake.id || index}
              className={`p-4 border-b border-border last:border-b-0 cursor-pointer transition-smooth ${
                isSelected 
                  ? 'bg-accent border-l-4 border-l-primary' 
                  : 'hover:bg-accent/50'
              }`}
              onClick={() => setSelectedEarthquake(earthquake)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-5 h-5 rounded-full flex-shrink-0 shadow-sm border-2 border-background"
                    style={{ backgroundColor: getMagnitudeColor(earthquake.properties.mag) }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-lg">
                        M {earthquake.properties.mag?.toFixed(1) || 'N/A'}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        earthquake.properties.mag >= 6 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : earthquake.properties.mag >= 5
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {getMagnitudeLabel(earthquake.properties.mag)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {earthquake.properties.place || 'Unknown Location'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Depth: {earthquake.geometry.coordinates[2]?.toFixed(1) || 'N/A'} km
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-foreground">
                    {formatTime(earthquake.properties.time)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {earthquakes.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No earthquakes found matching current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarthquakeList;