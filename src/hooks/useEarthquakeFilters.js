import { useState, useMemo } from 'react';

export const useEarthquakeFilters = (earthquakes) => {
  const [filterMagnitude, setFilterMagnitude] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeFilter, setTimeFilter] = useState('24h');

  const filteredEarthquakes = useMemo(() => {
    let filtered = earthquakes.filter(eq => eq.properties.mag >= filterMagnitude);
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(eq => {
        const place = eq.properties.place?.toLowerCase() || '';
        return place.includes(selectedRegion.toLowerCase());
      });
    }

    if (timeFilter !== '24h') {
      const now = new Date();
      const timeLimit = {
        '1h': 1 * 60 * 60 * 1000,
        '6h': 6 * 60 * 60 * 1000,
        '12h': 12 * 60 * 60 * 1000,
      }[timeFilter];
      
      if (timeLimit) {
        filtered = filtered.filter(eq => 
          now.getTime() - eq.properties.time <= timeLimit
        );
      }
    }

    return filtered;
  }, [earthquakes, filterMagnitude, selectedRegion, timeFilter]);

  const stats = useMemo(() => ({
    total: filteredEarthquakes.length,
    major: filteredEarthquakes.filter(eq => eq.properties.mag >= 7).length,
    strong: filteredEarthquakes.filter(eq => eq.properties.mag >= 6 && eq.properties.mag < 7).length,
    moderate: filteredEarthquakes.filter(eq => eq.properties.mag >= 5 && eq.properties.mag < 6).length,
    light: filteredEarthquakes.filter(eq => eq.properties.mag >= 4 && eq.properties.mag < 5).length,
    minor: filteredEarthquakes.filter(eq => eq.properties.mag >= 3 && eq.properties.mag < 4).length,
    micro: filteredEarthquakes.filter(eq => eq.properties.mag < 3).length,
  }), [filteredEarthquakes]);

  return {
    filteredEarthquakes,
    stats,
    filterMagnitude,
    setFilterMagnitude,
    selectedRegion,
    setSelectedRegion,
    timeFilter,
    setTimeFilter
  };
};