import { useState, useEffect } from 'react';

export default function useGeolocation() {
  const [location, setLocation] = useState(null);   // [lat, lng]
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      () => {
        setError('Location access denied. Please enable location to find nearby stores.');
        setLoading(false);
      }
    );
  }, []);

  return { location, loading, error };
}
