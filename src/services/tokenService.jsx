import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";

export const TokenService = {
  // =====================================================
  // SAVE TOKEN
  // =====================================================

  saveToken: async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("SAVE TOKEN ERROR:", error);
    }
  },

  // =====================================================
  // GET TOKEN
  // =====================================================

  getToken: async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("GET TOKEN ERROR:", error);

      return null;
    }
  },

  // =====================================================
  // DELETE TOKEN
  // =====================================================

  clearToken: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("CLEAR TOKEN ERROR:", error);
    }
  },
};
