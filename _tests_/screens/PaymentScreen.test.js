import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";

import PaymentScreen from "../../src/screens/PaymentScreen";

const mockGoBack = jest.fn();
const mockAddCard = jest.fn();
const mockDeleteCard = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
}));

jest.mock("expo-linear-gradient", () => ({
    LinearGradient: ({ children }) => children,
}));

jest.mock("@expo/vector-icons", () => ({
    Ionicons: () => null,
}));

jest.mock("../../src/context/CardContext", () => ({
    useCards: jest.fn(),
}));

import { useCards } from "../../src/context/CardContext";

describe("PaymentScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Alert, "alert").mockImplementation(() => { });
    });

    test("should show empty card message", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText } = render(<PaymentScreen />);

        expect(getByText("Aucune carte")).toBeTruthy();

        expect(
            getByText("Ajoutez une carte pour acheter vos billets.")
        ).toBeTruthy();

        expect(getByText("Ajouter une carte")).toBeTruthy();
    });

    test("should open add card modal", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText } = render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));

        expect(getByText("Nouvelle carte")).toBeTruthy();

        expect(
            getByText("Entrez les informations de votre carte")
        ).toBeTruthy();
    });

    test("should show error if fields are empty", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText } = render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));
        fireEvent.press(getByText("Ajouter"));

        expect(Alert.alert).toHaveBeenCalledWith(
            "Erreur",
            "Remplis tous les champs."
        );

        expect(mockAddCard).not.toHaveBeenCalled();
    });

    test("should add a valid card", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText, getByPlaceholderText } =
            render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));

        fireEvent.changeText(
            getByPlaceholderText("Numéro de carte"),
            "1234567812345678"
        );

        fireEvent.changeText(
            getByPlaceholderText("Nom sur la carte"),
            "Issa Test"
        );

        fireEvent.changeText(
            getByPlaceholderText("MM/AA"),
            "1299"
        );

        fireEvent.changeText(
            getByPlaceholderText("CVV"),
            "123"
        );

        fireEvent.press(getByText("Ajouter"));

        expect(mockAddCard).toHaveBeenCalled();
    });

    test("should display saved card", () => {
        useCards.mockReturnValue({
            cards: [
                {
                    id: "1",
                    number: "1234 5678 1234 5678",
                    name: "ISSA TEST",
                    expiry: "12/99",
                    cvv: "123",
                },
            ],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText } = render(<PaymentScreen />);

        expect(getByText("VISA")).toBeTruthy();

        expect(
            getByText("•••• •••• •••• 5678")
        ).toBeTruthy();

        expect(getByText("ISSA TEST")).toBeTruthy();

        expect(getByText("12/99")).toBeTruthy();
    });
    test("should show error if card number is invalid", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText, getByPlaceholderText } = render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));

        fireEvent.changeText(getByPlaceholderText("Numéro de carte"), "1234");
        fireEvent.changeText(getByPlaceholderText("Nom sur la carte"), "Issa Test");
        fireEvent.changeText(getByPlaceholderText("MM/AA"), "1299");
        fireEvent.changeText(getByPlaceholderText("CVV"), "123");

        fireEvent.press(getByText("Ajouter"));

        expect(Alert.alert).toHaveBeenCalledWith(
            "Erreur",
            "Le numéro doit avoir 16 chiffres."
        );
    });

    test("should show error if name is too short", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText, getByPlaceholderText } = render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));

        fireEvent.changeText(getByPlaceholderText("Numéro de carte"), "1234567812345678");
        fireEvent.changeText(getByPlaceholderText("Nom sur la carte"), "A");
        fireEvent.changeText(getByPlaceholderText("MM/AA"), "1299");
        fireEvent.changeText(getByPlaceholderText("CVV"), "123");

        fireEvent.press(getByText("Ajouter"));

        expect(Alert.alert).toHaveBeenCalledWith(
            "Erreur",
            "Le nom doit contenir au moins 3 caractères."
        );
    });

    test("should show error if expiry date is invalid", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText, getByPlaceholderText } = render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));

        fireEvent.changeText(getByPlaceholderText("Numéro de carte"), "1234567812345678");
        fireEvent.changeText(getByPlaceholderText("Nom sur la carte"), "Issa Test");
        fireEvent.changeText(getByPlaceholderText("MM/AA"), "0120");
        fireEvent.changeText(getByPlaceholderText("CVV"), "123");

        fireEvent.press(getByText("Ajouter"));

        expect(Alert.alert).toHaveBeenCalledWith(
            "Erreur",
            "La date d’expiration est invalide ou expirée."
        );
    });

    test("should show error if cvv is invalid", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText, getByPlaceholderText } = render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));

        fireEvent.changeText(getByPlaceholderText("Numéro de carte"), "1234567812345678");
        fireEvent.changeText(getByPlaceholderText("Nom sur la carte"), "Issa Test");
        fireEvent.changeText(getByPlaceholderText("MM/AA"), "1299");
        fireEvent.changeText(getByPlaceholderText("CVV"), "12");

        fireEvent.press(getByText("Ajouter"));

        expect(Alert.alert).toHaveBeenCalledWith(
            "Erreur",
            "Le CVV doit avoir 3 chiffres."
        );
    });

    test("should show error if card already exists", () => {
        useCards.mockReturnValue({
            cards: [
                {
                    id: "1",
                    number: "1234 5678 1234 5678",
                    name: "ISSA TEST",
                    expiry: "12/99",
                    cvv: "123",
                },
            ],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText, getByPlaceholderText } = render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));

        fireEvent.changeText(getByPlaceholderText("Numéro de carte"), "1234567812345678");
        fireEvent.changeText(getByPlaceholderText("Nom sur la carte"), "Issa Test");
        fireEvent.changeText(getByPlaceholderText("MM/AA"), "1299");
        fireEvent.changeText(getByPlaceholderText("CVV"), "123");

        fireEvent.press(getByText("Ajouter"));

        expect(Alert.alert).toHaveBeenCalledWith(
            "Carte existante",
            "Cette carte est déjà enregistrée."
        );
    });

    test("should close modal when cancel is pressed", () => {
        useCards.mockReturnValue({
            cards: [],
            addCard: mockAddCard,
            deleteCard: mockDeleteCard,
        });

        const { getByText, queryByText } = render(<PaymentScreen />);

        fireEvent.press(getByText("Ajouter une carte"));
        expect(getByText("Nouvelle carte")).toBeTruthy();

        fireEvent.press(getByText("Annuler"));

        expect(queryByText("Nouvelle carte")).toBeNull();
    });
});