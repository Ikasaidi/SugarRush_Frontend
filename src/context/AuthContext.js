import React, { createContext, useEffect, useState } from "react";

import API from "../services/api";

import { TokenService } from "../services/tokenService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // RESTORE SESSION
  // =====================================================

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = await TokenService.getToken();

        if (!savedToken) {
          return;
        }

        // GET CURRENT USER
        const res = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        setToken(savedToken);

        setUser(res.data.user);

        setIsLoggedIn(true);
      } catch (error) {
        console.log(
          "RESTORE SESSION ERROR:",
          error?.response?.data || error.message,
        );

        await TokenService.clearToken();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // =====================================================
  // REGISTER
  // =====================================================

  const register = async (data) => {
    try {
      const res = await API.post("/auth/register", {
        username: data.username.trim(),

        email: data.email.trim().toLowerCase(),

        password: data.password.trim(),

        user_type: data.user_type || "student",

        fname: data.fname?.trim() || "",

        lname: data.lname?.trim() || "",

        phone: data.phone?.trim() || "",

        address: data.address?.trim() || "",
      });

      return res.data;
    } catch (error) {
      console.log("REGISTER ERROR:", error?.response?.data || error.message);

      throw error;
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (email, password) => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: email.trim().toLowerCase(),

        password: password.trim(),
      });

      const { token, user } = res.data;

      // SAVE TOKEN
      await TokenService.saveToken(token);

      setToken(token);

      setUser(user);

      setIsLoggedIn(true);

      return res.data;
    } catch (error) {
      console.log("LOGIN ERROR:", error?.response?.data || error.message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    try {
      await TokenService.clearToken();

      setToken(null);

      setUser(null);

      setIsLoggedIn(false);
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,

        token,
        user,
        setUser,

        loading,

        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
