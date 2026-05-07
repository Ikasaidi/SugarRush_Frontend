import React, { createContext, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================================================
  // REGISTER
  // =========================================================
  const register = async (data) => {
    try {
      const res = await API.post('/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
        user_type: data.user_type || 'student',
      });

      console.log('REGISTER SUCCESS:', res.data);
      return res.data;
    } catch (err) {
      console.log('REGISTER ERROR:', err.response?.data || err.message);
      throw err;
    }
  };

  // =========================================================
  // LOGIN
  // =========================================================
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await API.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // Save token in state
      setToken(token);
      setUser(user);
      setIsLoggedIn(true);

      // Set auth header for future requests
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      console.log('LOGIN SUCCESS:', res.data);
      return res.data;
    } catch (err) {
      console.log('LOGIN ERROR:', err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================
  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
      delete API.defaults.headers.common['Authorization'];
      console.log('LOGOUT SUCCESS');
    } catch (err) {
      console.error('LOGOUT ERROR:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        user,
        setUser,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;