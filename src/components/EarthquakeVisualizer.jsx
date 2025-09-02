import React, { useState } from 'react';
import EarthquakeHeader from './earthquake/EarthquakeHeader';
import EarthquakeMap from './earthquake/EarthquakeMap';
import EarthquakeFilters from './earthquake/EarthquakeFilters';
import EarthquakeLegend from './earthquake/EarthquakeLegend';
import EarthquakeDetails from './earthquake/EarthquakeDetails';
import EarthquakeList from './earthquake/EarthquakeList';
import LoadingScreen from './earthquake/LoadingScreen';
import ErrorScreen from './earthquake/ErrorScreen';
import { useEarthquakeData } from '../hooks/useEarthquakeData';
import { useEarthquakeFilters } from '../hooks/useEarthquakeFilters';
import { useTheme } from '../hooks/useTheme';
import { getMagnitudeColor, getMagnitudeSize, getMagnitudeLabel, formatTime } from '../utils/earthquakeUtils';

const EarthquakeVisualizer = () => {
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const { earthquakes, loading, error, lastUpdate, refetch } = useEarthquakeData();
  const { isDark, toggleTheme } = useTheme();
  const {
    filteredEarthquakes,
    stats,
    filterMagnitude,
    setFilterMagnitude,
    selectedRegion,
    setSelectedRegion,
    timeFilter,
    setTimeFilter
  } = useEarthquakeFilters(earthquakes);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-full bg-background text-foreground transition-smooth">
      <EarthquakeHeader
        stats={stats}
        darkMode={isDark}
        toggleDarkMode={toggleTheme}
        fetchData={refetch}
        loading={loading}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        lastUpdate={lastUpdate}
      />

      <div className="max-w-7xl mx-auto p-4">
        <div className={`grid grid-cols-1 ${showFilters || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 'lg:grid-cols-4' : ''} gap-6`}>
          {/* Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1 space-y-6`}>
            <EarthquakeFilters
              filterMagnitude={filterMagnitude}
              setFilterMagnitude={setFilterMagnitude}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
            />
            
            <EarthquakeLegend
              stats={stats}
              filteredEarthquakes={filteredEarthquakes}
            />
          </div>

          {/* Main Content */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'col-span-1'} space-y-6`}>
            <EarthquakeMap
              earthquakes={filteredEarthquakes}
              selectedEarthquake={selectedEarthquake}
              setSelectedEarthquake={setSelectedEarthquake}
              getMagnitudeColor={getMagnitudeColor}
              getMagnitudeSize={getMagnitudeSize}
            />

            {selectedEarthquake && (
              <EarthquakeDetails
                earthquake={selectedEarthquake}
                onClose={() => setSelectedEarthquake(null)}
                getMagnitudeColor={getMagnitudeColor}
                getMagnitudeLabel={getMagnitudeLabel}
                formatTime={formatTime}
              />
            )}

            <EarthquakeList
              earthquakes={filteredEarthquakes}
              selectedEarthquake={selectedEarthquake}
              setSelectedEarthquake={setSelectedEarthquake}
              getMagnitudeColor={getMagnitudeColor}
              getMagnitudeLabel={getMagnitudeLabel}
              formatTime={formatTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthquakeVisualizer;