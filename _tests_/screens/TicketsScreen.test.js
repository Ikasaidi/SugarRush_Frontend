import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import TicketsScreen from "../../src/screens/TicketsScreen";
import AuthContext from "../../src/context/AuthContext";
import API from "../../src/services/api";

const mockNavigate = jest.fn();
const mockRefreshUser = jest.fn();

jest.mock("../../src/context/CardContext", () => ({
  useCards: jest.fn(),
}));

jest.mock("../../src/services/api", () => ({
  post: jest.fn(),
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }) => children,
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

jest.mock("../../src/utils/currency", () => ({
  formatCAD: (amount) => `${amount.toFixed(2)} $`,
}));

import { useCards } from "../../src/context/CardContext";

describe("TicketsScreen", () => {
  const renderTicketsScreen = () => {
    return render(
      <AuthContext.Provider value={{ refreshUser: mockRefreshUser }}>
        <TicketsScreen navigation={{ navigate: mockNavigate }} />
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("should render ticket screen", () => {
    useCards.mockReturnValue({
      cards: [],
    });

    const { getByText, getAllByText } = renderTicketsScreen();

    expect(getByText("Achat de billets")).toBeTruthy();
    expect(getByText("Achetez vos billets avant votre passage")).toBeTruthy();
    expect(getByText("Billet Sugar-Pi")).toBeTruthy();
    expect(getByText("Standard")).toBeTruthy();
    expect(getAllByText("34.25 $").length).toBeGreaterThan(0);
  });

  test("should show no card message", () => {
    useCards.mockReturnValue({
      cards: [],
    });

    const { getByText } = renderTicketsScreen();

    expect(getByText("Aucune carte enregistrée")).toBeTruthy();
    expect(getByText("Touchez ici pour ajouter une carte.")).toBeTruthy();
  });

  test("should navigate to payment when no card and user presses pay", () => {
    useCards.mockReturnValue({
      cards: [],
    });

    const { getByText } = renderTicketsScreen();

    fireEvent.press(getByText("Payer 34.25 $"));

    expect(mockNavigate).toHaveBeenCalledWith("Payment");
  });

  test("should show saved card", () => {
    useCards.mockReturnValue({
      cards: [
        {
          id: "1",
          number: "1234 5678 1234 5678",
          name: "ISSA TEST",
        },
      ],
    });

    const { getByText } = renderTicketsScreen();

    expect(getByText("Carte •••• 5678")).toBeTruthy();
    expect(getByText("ISSA TEST")).toBeTruthy();
  });

  test("should show warning if card exists but no card selected", () => {
    useCards.mockReturnValue({
      cards: [
        {
          id: "1",
          number: "1234 5678 1234 5678",
          name: "ISSA TEST",
        },
      ],
    });

    const { getByText } = renderTicketsScreen();

    fireEvent.press(getByText("Payer 34.25 $"));

    expect(getByText("Choisissez une carte pour payer.")).toBeTruthy();
  });

  test("should buy ticket when card is selected", async () => {
    API.post.mockResolvedValueOnce({
      data: {
        success: true,
      },
    });

    useCards.mockReturnValue({
      cards: [
        {
          id: "1",
          number: "1234 5678 1234 5678",
          name: "ISSA TEST",
        },
      ],
    });

    const { getByText } = renderTicketsScreen();

    fireEvent.press(getByText("Carte •••• 5678"));
    fireEvent.press(getByText("Payer 34.25 $"));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith("/purchases/purchase", {
        quantity: 1,
        unit_price: 34.25,
        currency: "CAD",
      });

      expect(mockRefreshUser).toHaveBeenCalled();
    });
  });
});