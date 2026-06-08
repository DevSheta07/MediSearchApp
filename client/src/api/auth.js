import API from './axios';

export const loginUser     = (email, password)         => API.post('/auth/login',    { email, password });
export const registerUser  = (name, email, password)   => API.post('/auth/register', { name, email, password });
export const forgotPassword = (email)                  => API.post('/auth/forgot-password', { email });
export const resetPassword  = (token, password)        => API.post(`/auth/reset-password/${token}`, { password });
