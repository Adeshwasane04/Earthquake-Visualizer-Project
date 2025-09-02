import { useState, useEffect, useCallback } from 'react';

export const useEarthquakeData = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchEarthquakeData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setEarthquakes(data.features || []);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Failed to fetch earthquake data. Please check your internet connection and try again.');
      console.error('Error fetching earthquake data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakeData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchEarthquakeData, 300000);
    return () => clearInterval(interval);
  }, [fetchEarthquakeData]);

  return {
    earthquakes,
    loading,
    error,
    lastUpdate,
    refetch: fetchEarthquakeData
  };
};