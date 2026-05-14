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
  // FETCH USER WALLET
  // =====================================================

  const fetchUserWallet = async (userData) => {
    try {
      // Ensure we send the saved token when calling the wallet endpoint
      const savedToken = await TokenService.getToken();
      const walletRes = await API.get("/wallet/me", {
        headers: savedToken ? { Authorization: `Bearer ${savedToken}` } : {},
      });

      console.log("AuthContext: fetchUserWallet response:", walletRes?.data?.wallet ? 'ok' : 'no-wallet');

      if (walletRes?.data?.wallet) {
        return {
          ...userData,
          wallet: walletRes.data.wallet,
          purchases: walletRes.data.purchases || userData.purchases || [],
          stats: walletRes.data.stats || userData.stats || {},
        };
      }
    } catch (error) {
      // If wallet endpoint is missing or returns error, fall back to wallet inside userData
      console.log("FETCH WALLET ERROR:", error?.response?.data || error.message);
    }

    // Fallback: if backend already included wallet inside the user object, use it
    if (userData?.wallet) {
      return {
        ...userData,
        wallet: userData.wallet,
      };
    }

    // If purchases exist on the user object, derive paid ticket count and total spent
    const purchases = userData?.purchases || [];

    if (purchases.length > 0) {
      const paidCount = purchases.reduce((sum, p) => sum + (p.quantity || 0), 0);
      const totalSpent = purchases.reduce((sum, p) => sum + (Number(p.total_amount) || 0), 0);

      return {
        ...userData,
        wallet: {
          free_ticket_balance: 0,
          paid_ticket_balance: paidCount,
        },
        stats: {
          ...(userData.stats || {}),
          total_spent: totalSpent,
        },
      };
    }

    // Default empty wallet
    return {
      ...userData,
      wallet: {
        free_ticket_balance: 0,
        paid_ticket_balance: 0,
      },
    };
  };

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

        // FETCH WALLET DATA
        const userWithWallet = await fetchUserWallet(res.data.user);
        setUser(userWithWallet);

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
      // Don't set global loading - let component manage it
      const res = await API.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      const { token, user } = res.data;

      await TokenService.saveToken(token);

      setToken(token);
      
      // FETCH WALLET DATA
      const userWithWallet = await fetchUserWallet(user);
      setUser(userWithWallet);
      
      setIsLoggedIn(true);

      return { token, user: userWithWallet };
    } catch (error) {
      console.log("LOGIN ERROR:", error?.response?.data || error.message);
      throw error;
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

  // =====================================================
  // REFRESH USER (to update wallet data)
  // =====================================================

  const refreshUser = async () => {
    try {
      console.log("AuthContext: refreshUser called");

      const res = await API.get("/users/me");

      const serverUser = res?.data?.user || null;

      if (!serverUser) {
        console.log("AuthContext: /users/me returned no user");
        return null;
      }

      // Merge wallet from /wallet/me when available, otherwise rely on serverUser.wallet
      const userWithWallet = await fetchUserWallet(serverUser);

      // Ensure purchases and stats are present
      const merged = {
        ...userWithWallet,
        purchases: serverUser.purchases || userWithWallet.purchases || [],
        stats: serverUser.stats || userWithWallet.stats || {},
      };

      setUser(merged);

      console.log("AuthContext: refreshUser success");

      return merged;
    } catch (error) {
      console.log("REFRESH USER ERROR:", error?.response?.data || error.message);
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
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
