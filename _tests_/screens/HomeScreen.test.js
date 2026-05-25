import React from "react";
import { render, waitFor } from "@testing-library/react-native";

import HomeScreen from "../../src/screens/HomeScreen";
import API from "../../src/services/api";

jest.mock("../../src/services/api", () => ({
  get: jest.fn(),
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }) => children,
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    console.error.mockRestore();
  });

  test("should render loading screen first", () => {
    API.get.mockResolvedValue({ data: [] });

    const { getByText } = render(<HomeScreen />);

    expect(getByText("Horaires des trains")).toBeTruthy();
    expect(getByText("Chargement des horaires...")).toBeTruthy();
  });

  test("should show offline message when no train status", async () => {
    API.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: null });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("Hors ligne")).toBeTruthy();
      expect(getByText("Train hors ligne")).toBeTruthy();
    });
  });

  test("should display upcoming schedule", async () => {
    API.get
      .mockResolvedValueOnce({
        data: [
          {
            _id: "1",
            departure_station: "station-1",
            arrival_station: "station-2",
            departure_time: new Date(Date.now() + 60000).toISOString(),
            arrival_time: new Date(Date.now() + 180000).toISOString(),
          },
        ],
      })
      .mockResolvedValueOnce({
        data: {
          service_status: "online",
          train_running: false,
          last_known_station: "station-1",
          last_seen_at: new Date().toISOString(),
        },
      });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText("BubbleGum")).toBeTruthy();
      expect(getByText("Candy Cloud")).toBeTruthy();
      expect(getByText("PROCHAIN")).toBeTruthy();
    });
  });

  test("should show train running status", async () => {
    API.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({
        data: {
          service_status: "online",
          train_running: true,
          last_known_station: "station-1",
          last_seen_at: new Date().toISOString(),
        },
      });

    const { getAllByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getAllByText("Train en route").length).toBeGreaterThan(0);
      expect(getAllByText("LIVE").length).toBeGreaterThan(0);
    });
  });
});