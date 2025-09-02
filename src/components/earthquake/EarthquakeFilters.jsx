import React from 'react';
import { Filter } from 'lucide-react';
import { regions } from '../../utils/earthquakeUtils';

const EarthquakeFilters = ({ 
  filterMagnitude, 
  setFilterMagnitude, 
  selectedRegion, 
  setSelectedRegion, 
  timeFilter, 
  setTimeFilter 
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5 text-status-info" />
        Filters
      </h3>
      
      <div className="space-y-6">
        {/* Magnitude Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Minimum Magnitude: <span className="text-primary font-bold">{filterMagnitude.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="8"
            step="0.1"
            value={filterMagnitude}
            onChange={(e) => setFilterMagnitude(parseFloat(e.target.value))}
            className="w-full slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>4</span>
            <span>8+</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => setFilterMagnitude(0)}
              className="px-3 py-2 text-sm bg-earthquake-micro hover:bg-earthquake-micro/80 text-white rounded-lg transition-smooth"
            >
              All
            </button>
            <button
              onClick={() => setFilterMagnitude(4)}
              className="px-3 py-2 text-sm bg-earthquake-light hover:bg-earthquake-light/80 text-white rounded-lg transition-smooth"
            >
              4.0+
            </button>
            <button
              onClick={() => setFilterMagnitude(5)}
              className="px-3 py-2 text-sm bg-earthquake-moderate hover:bg-earthquake-moderate/80 text-white rounded-lg transition-smooth"
            >
              5.0+
            </button>
            <button
              onClick={() => setFilterMagnitude(6)}
              className="px-3 py-2 text-sm bg-earthquake-major hover:bg-earthquake-major/80 text-white rounded-lg transition-smooth"
            >
              6.0+
            </button>
          </div>
        </div>

        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Region
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full p-2 bg-background border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
          >
            {regions.map(region => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Time Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: '1h', label: '1 hour' },
              { value: '6h', label: '6 hours' },
              { value: '12h', label: '12 hours' },
              { value: '24h', label: '24 hours' }
            ].map(time => (
              <button
                key={time.value}
                onClick={() => setTimeFilter(time.value)}
                className={`px-3 py-2 text-sm rounded-lg transition-smooth ${
                  timeFilter === time.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                }`}
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthquakeFilters;