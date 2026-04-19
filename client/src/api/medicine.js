import API from './axios';

export const searchMedicines = (query) =>
  API.get('/medicine/search', { params: { query } });

export const getNearbyStores = (lat, lng, radius = 5000) =>
  API.get('/stores/nearby', { params: { lat, lng, radius } });
