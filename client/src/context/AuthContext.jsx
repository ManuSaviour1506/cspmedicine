// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // In a real app, you would verify the token against your backend
      // Here we just assume it's valid for simplicity.
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    const response = await authService.login(userData);
    setUser(response); // response includes token and user info
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};