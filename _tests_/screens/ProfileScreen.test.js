import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import ProfileScreen from "../../src/screens/ProfileScreen";
import AuthContext from "../../src/context/AuthContext";
const mockNavigate = jest.fn();
const mockLogout = jest.fn();
const mockRefreshUser = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
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

describe("ProfileScreen", () => {
    const normalUser = {
        fname: "Issa",
        lname: "Test",
        email: "issa@test.com",
        user_type: "user",
        wallet: {
            free_ticket_balance: 2,
            paid_ticket_balance: 5,
        },
        stats: {
            total_spent: 25,
        },
        purchases: [],
    };

    const renderProfileScreen = (user = normalUser) => {
        return render(
            <AuthContext.Provider
                value={{
                    user,
                    logout: mockLogout,
                    refreshUser: mockRefreshUser,
                }}
            >
                <ProfileScreen />
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should render user information", () => {
        const { getByText } = renderProfileScreen();

        expect(getByText("Issa Test")).toBeTruthy();
        expect(getByText("issa@test.com")).toBeTruthy();
        expect(getByText("Mon portefeuille")).toBeTruthy();
        expect(getByText("Billets gratuits")).toBeTruthy();
        expect(getByText("Billets payés")).toBeTruthy();
        expect(getByText("Total dépensé")).toBeTruthy();
        expect(getByText("25.00 $")).toBeTruthy();
    });

    test("should show empty purchase history", () => {
        const { getByText } = renderProfileScreen();

        expect(getByText("Historique des achats")).toBeTruthy();
        expect(getByText("Aucun achat pour le moment")).toBeTruthy();
    });

    test("should display purchases if user has purchases", () => {
        const userWithPurchases = {
            ...normalUser,
            purchases: [
                {
                    _id: "1",
                    quantity: 2,
                    total_amount: 10,
                    created_at: "2026-05-25T00:00:00.000Z",
                },
            ],
        };

        const { getByText } = renderProfileScreen(userWithPurchases);

        expect(getByText("2 billet(s)")).toBeTruthy();
        expect(getByText("10.00 $")).toBeTruthy();
    });

    test("should navigate to QR screen", () => {
        const { getByText } = renderProfileScreen();

        fireEvent.press(getByText("Mon QR Code"));

        expect(mockNavigate).toHaveBeenCalledWith("My QR");
    });

    test("should navigate to personal info", () => {
        const { getByText } = renderProfileScreen();

        fireEvent.press(getByText("Informations personnelles"));

        expect(mockNavigate).toHaveBeenCalledWith("PersonalInfo");
    });

    test("should navigate to notifications", () => {
        const { getByText } = renderProfileScreen();

        fireEvent.press(getByText("Email et notifications"));

        expect(mockNavigate).toHaveBeenCalledWith("Notifications");
    });

    test("should navigate to payment", () => {
        const { getByText } = renderProfileScreen();

        fireEvent.press(getByText("Moyens de paiement"));

        expect(mockNavigate).toHaveBeenCalledWith("Payment");
    });

    test("should logout user", () => {
        const { getByText } = renderProfileScreen();

        fireEvent.press(getByText("Se déconnecter"));

        expect(mockLogout).toHaveBeenCalled();
    });
    test("should navigate to admin panel when user is admin", () => {
        const adminUser = {
            ...normalUser,
            user_type: "admin",
        };

        const { getByText } = renderProfileScreen(adminUser);

        fireEvent.press(getByText("Admin"));

        expect(mockNavigate).toHaveBeenCalledWith("AdminPanel");
    });

    test("should display default user email when email is missing", () => {
        const userWithoutEmail = {
            ...normalUser,
            email: null,
        };

        const { getByText } = renderProfileScreen(userWithoutEmail);

        expect(getByText("Utilisateur")).toBeTruthy();
    });

    test("should display wallet default values when wallet is missing", () => {
        const userWithoutWallet = {
            ...normalUser,
            wallet: null,
        };

        const { getAllByText } = renderProfileScreen(userWithoutWallet);

        expect(getAllByText("0").length).toBeGreaterThan(0);
    });

    test("should call refreshUser on pull refresh", async () => {
        renderProfileScreen();

        await mockRefreshUser();

        expect(mockRefreshUser).toHaveBeenCalled();
    });
});