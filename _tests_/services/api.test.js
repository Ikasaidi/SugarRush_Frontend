import API from "../../src/services/api";
import { TokenService } from "../../src/services/tokenService";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("../../src/services/tokenService", () => ({
  TokenService: {
    getToken: jest.fn(),
  },
}));

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should have correct baseURL", () => {
    expect(API.defaults.baseURL).toBeTruthy();
  });

  test("should add authorization token to headers", async () => {
    TokenService.getToken.mockResolvedValue("abc123");

    const interceptor =
      API.interceptors.request.handlers[0].fulfilled;

    const config = {
      headers: {},
    };

    const result = await interceptor(config);

    expect(TokenService.getToken).toHaveBeenCalled();

    expect(result.headers.Authorization).toBe(
      "Bearer abc123"
    );
  });

  test("should not add authorization header if no token", async () => {
    TokenService.getToken.mockResolvedValue(null);

    const interceptor =
      API.interceptors.request.handlers[0].fulfilled;

    const config = {
      headers: {},
    };

    const result = await interceptor(config);

    expect(result.headers.Authorization).toBeUndefined();
  });

  test("should return response normally", () => {
    const interceptor =
      API.interceptors.response.handlers[0].fulfilled;

    const response = {
      data: {
        success: true,
      },
    };

    const result = interceptor(response);

    expect(result).toEqual(response);
  });

  test("should reject response error", async () => {
    const interceptor =
      API.interceptors.response.handlers[0].rejected;

    const error = new Error("API ERROR");

    await expect(interceptor(error)).rejects.toThrow(
      "API ERROR"
    );
  });
});