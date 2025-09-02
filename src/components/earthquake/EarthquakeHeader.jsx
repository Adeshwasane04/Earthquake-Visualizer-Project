import React from 'react';
import { Sun, Moon, RefreshCw, Filter, Zap } from 'lucide-react';

const EarthquakeHeader = ({ 
  stats, 
  darkMode, 
  toggleDarkMode, 
  fetchData, 
  loading, 
  showFilters, 
  setShowFilters,
  lastUpdate 
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/95 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient-seismic">
                Earthquake Visualizer
              </h1>
              <p className="text-sm text-muted-foreground">
                Real-time global seismic activity monitoring
                {lastUpdate && (
                  <span className="block text-xs mt-1">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-xl text-status-info">{stats.total}</div>
                <div className="text-xs text-muted-foreground">Total Today</div>
              </div>
              {stats.major > 0 && (
                <div className="text-center">
                  <div className="font-bold text-xl text-earthquake-major">{stats.major}</div>
                  <div className="text-xs text-muted-foreground">Major (7+)</div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden p-2 rounded-lg border border-border bg-background hover:bg-accent transition-bounce"
              >
                <Filter className="w-5 h-5" />
              </button>
              
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2 rounded-lg border border-border bg-background hover:bg-accent transition-bounce disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg border border-border bg-background hover:bg-accent transition-bounce"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Stats */}
        <div className="sm:hidden flex items-center justify-around mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="font-bold text-lg text-status-info">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-earthquake-strong">{stats.strong + stats.moderate}</div>
            <div className="text-xs text-muted-foreground">5.0+</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-earthquake-light">{stats.light}</div>
            <div className="text-xs text-muted-foreground">4.0-4.9</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EarthquakeHeader;