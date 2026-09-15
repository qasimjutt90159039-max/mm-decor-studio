import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin as apiLogin, verifyAdminSession } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('mm_admin_token');
    if (token) {
      verifyAdminSession()
        .then((res) => {
          if (res.data.success) {
            setAdmin(res.data.admin);
          } else {
            localStorage.removeItem('mm_admin_token');
            setAdmin(null);
          }
        })
        .catch(() => {
          localStorage.removeItem('mm_admin_token');
          setAdmin(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await apiLogin({ username, password });
      if (res.data.success) {
        localStorage.setItem('mm_admin_token', res.data.token);
        setAdmin(res.data.admin);
        return { success: true };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Authentication error',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('mm_admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
