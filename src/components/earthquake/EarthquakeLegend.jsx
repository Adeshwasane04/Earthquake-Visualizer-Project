import React from 'react';
import { Info } from 'lucide-react';

const EarthquakeLegend = ({ stats, filteredEarthquakes }) => {
  const legendItems = [
    { min: 7, label: 'Major', colorClass: 'bg-earthquake-major', count: stats.major },
    { min: 6, label: 'Strong', colorClass: 'bg-earthquake-strong', count: stats.strong },
    { min: 5, label: 'Moderate', colorClass: 'bg-earthquake-moderate', count: stats.moderate },
    { min: 4, label: 'Light', colorClass: 'bg-earthquake-light', count: stats.light },
    { min: 3, label: 'Minor', colorClass: 'bg-earthquake-minor', count: stats.minor },
    { min: 0, label: 'Micro', colorClass: 'bg-earthquake-micro', count: stats.micro },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-status-info" />
        Magnitude Scale
      </h3>
      <div className="space-y-3">
        {legendItems.map(({ min, label, colorClass, count }) => (
          <div key={min} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full shadow-sm border-2 border-background ${colorClass}`} />
              <span className="text-sm font-medium">{min}+ {label}</span>
            </div>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarthquakeLegend;