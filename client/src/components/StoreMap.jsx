import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useGeolocation from '../hooks/useGeolocation';
import { getNearbyStores } from '../api/medicine';

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

export default function StoreMap() {
  const { location, loading: locLoading, error: locError } = useGeolocation();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (!location) return;
    const [lat, lng] = location;
    getNearbyStores(lat, lng, 5000)
      .then(({ data }) => setStores(data))
      .catch(() => {});
  }, [location]);

  if (locLoading) return (
    <div className="flex flex-col items-center justify-center h-64 bg-green-50 rounded-2xl border border-green-100">
      <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full mb-3" />
      <p className="text-green-700 font-medium text-sm">Getting your location...</p>
    </div>
  );

  if (locError) return (
    <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600">
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span className="text-sm">{locError}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-gray-800">Nearby Generic Medicine Stores</h3>
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
          {stores.length} stores within 5 km
        </span>
      </div>

      <MapContainer center={location} zoom={14}
        style={{ height: '380px', width: '100%' }} className="rounded-2xl shadow-card">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Circle center={location} radius={5000}
          pathOptions={{ color: '#16a34a', fillColor: '#16a34a', fillOpacity: 0.05, weight: 1.5 }}
        />
        <Marker position={location}>
          <Popup><div className="text-center font-medium text-green-700">📍 Your Location</div></Popup>
        </Marker>
        {stores.map(store => (
          <Marker key={store._id}
            position={[store.location.coordinates[1], store.location.coordinates[0]]}
            icon={greenIcon}>
            <Popup>
              <p className="font-bold text-green-800">{store.name}</p>
              <p className="text-sm text-gray-500 mt-1">{store.address}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {stores.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-2">
          No stores in database yet — seed stores via the backend to see them here.
        </p>
      )}
    </div>
  );
}
