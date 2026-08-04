import { useState, useEffect } from 'react';
import API from '../api/axios';

const INDIAN_CITIES = ['All Cities', 'Mumbai', 'Thane', 'Delhi', 'Ahmedabad', 'Surat', 'Bengaluru', 'Pune'];

export default function KendraLocator() {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');

  const [kendras, setKendras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleDetectLocation();
  }, []);

  useEffect(() => {
    fetchKendras();
  }, [userLocation, selectedCity]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLocationStatus('success');
        setSelectedCity('All Cities');
      },
      (err) => {
        console.warn('Geolocation disabled:', err.message);
        setLocationStatus('error');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const fetchKendras = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (userLocation) {
        params.append('lat', userLocation.lat);
        params.append('lng', userLocation.lng);
      }
      if (selectedCity && selectedCity !== 'All Cities') {
        params.append('city', selectedCity);
      }

      const res = await API.get(`/pharmacy/nearby?${params.toString()}`);
      setKendras(res.data.stores || []);
    } catch (err) {
      console.error('Failed to fetch Kendras:', err);
      setError('Could not load nearby stores. Please check backend server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
      {/* Demonstration Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl text-xs font-medium leading-relaxed shadow-sm">
        <strong className="font-bold">Demonstration Notice:</strong> The store locations, distances, and contact details shown below are simulated sample data for demonstration purposes only.
      </div>

      {/* Top Banner */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="badge-green !text-[10px]">PMBJP Kendra Locator</span>
          <h1 className="font-heading text-2xl text-gray-900 font-bold">
            Nearby Jan Aushadhi Stores
          </h1>
          <p className="text-gray-500 text-xs">
            Find government generic medicine stores closest to your location.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              if (e.target.value !== 'All Cities') setUserLocation(null);
            }}
            className="px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {INDIAN_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <button
            onClick={handleDetectLocation}
            disabled={locationStatus === 'locating'}
            className="btn-primary !px-3 !py-2 !text-xs whitespace-nowrap"
          >
            {locationStatus === 'locating' ? 'Locating...' : 'Detect GPS Location'}
          </button>
        </div>
      </div>

      {/* Results Listing */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 p-8 shadow-card">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-xs mt-3 font-medium">Finding nearby stores...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-center text-xs font-medium">
          {error}
        </div>
      ) : kendras.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 p-8 space-y-1 shadow-card">
          <h3 className="text-sm font-bold text-gray-800">No stores found</h3>
          <p className="text-xs text-gray-500">Try selecting a different city from the dropdown above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
            <span>Showing {kendras.length} Stores</span>
            {userLocation && <span className="text-brand-600 font-semibold">Sorted by distance from your GPS</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kendras.map((kendra) => (
              <div
                key={kendra._id || kendra.kendraCode}
                className="bg-white border border-gray-100 rounded-xl shadow-card p-5 flex flex-col justify-between space-y-4 hover:border-brand-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge-gray !text-[10px]">
                      Kendra #{kendra.kendraCode}
                    </span>
                    {kendra.distanceKm !== null && (
                      <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded">
                        {kendra.distanceKm} km away
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-semibold text-base text-gray-900">
                    {kendra.name}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {kendra.address}, {kendra.city}, {kendra.state} - {kendra.pincode}
                  </p>

                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-100 space-y-1">
                    <p>Hours: <strong className="text-gray-700">{kendra.openingHours}</strong></p>
                    <p>Phone: <a href={`tel:${kendra.phone}`} className="text-brand-600 font-medium hover:underline">{kendra.phone}</a></p>
                  </div>
                </div>

                <a
                  href={kendra.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs rounded-lg text-center transition-colors block"
                >
                  Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
