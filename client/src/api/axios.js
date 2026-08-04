import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api'),
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('aushadhsetu_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
