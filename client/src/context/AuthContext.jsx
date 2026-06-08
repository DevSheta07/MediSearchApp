import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('aushadhsetu_user');
    const token  = localStorage.getItem('aushadhsetu_token');
    if (stored && token) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await loginUser(email, password);
    localStorage.setItem('aushadhsetu_token', data.token);
    localStorage.setItem('aushadhsetu_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    await registerUser(name, email, password);
  };

  const logout = () => {
    localStorage.removeItem('aushadhsetu_token');
    localStorage.removeItem('aushadhsetu_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
