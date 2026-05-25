import AsyncStorage from "@react-native-async-storage/async-storage";

import TokenService from "../../src/services/tokenService";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("TokenService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  test("should save token", async () => {
    await TokenService.saveToken("abc123");

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "auth_token",
      "abc123"
    );
  });


  test("should get token", async () => {
    AsyncStorage.getItem.mockResolvedValue("abc123");

    const result = await TokenService.getToken();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      "auth_token"
    );

    expect(result).toBe("abc123");
  });

  

  test("should clear token", async () => {
    await TokenService.clearToken();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      "auth_token"
    );
  });
});