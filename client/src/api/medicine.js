import API from './axios';

export const searchMedicines = (query) =>
  API.get('/medicine/search', { params: { query } });
