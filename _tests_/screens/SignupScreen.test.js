import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import SignupScreen from "../../src/screens/SignupScreen";
import AuthContext from "../../src/context/AuthContext";

const mockNavigate = jest.fn();
const mockRegister = jest.fn();
const mockLogin = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }) => children,
}));

jest.mock("../../src/components/LogoCircle", () => {
  return () => null;
});

jest.mock("../../src/components/PageDots", () => {
  return () => null;
});

jest.mock("../../src/components/IconInput", () => {
  const React = require("react");
  const { TextInput, Text } = require("react-native");

  return ({ placeholder, value, onChangeText, secure, error }) => (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
      />

      {error ? <Text>{error}</Text> : null}
    </>
  );
});

jest.mock("../../src/components/GradientButton", () => {
  const React = require("react");
  const { Pressable, Text } = require("react-native");

  return ({ title, onPress }) => (
    <Pressable onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
});

describe("SignupScreen", () => {
  const renderSignupScreen = () => {
    return render(
      <AuthContext.Provider
        value={{
          register: mockRegister,
          login: mockLogin,
        }}
      >
        <SignupScreen />
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render signup screen", () => {
    const { getByText, getByPlaceholderText } = renderSignupScreen();

    expect(getByText("Candy Train")).toBeTruthy();
    expect(getByText("Créez votre compte")).toBeTruthy();
    expect(getByPlaceholderText("Nom d'utilisateur")).toBeTruthy();
    expect(getByPlaceholderText("E-mail")).toBeTruthy();
    expect(getByPlaceholderText("Mot de passe")).toBeTruthy();
    expect(getByPlaceholderText("Prénom")).toBeTruthy();
    expect(getByPlaceholderText("Nom de famille")).toBeTruthy();
    expect(getByPlaceholderText("Téléphone")).toBeTruthy();
    expect(getByPlaceholderText("Adresse")).toBeTruthy();
    expect(getByText("Créer mon compte")).toBeTruthy();
  });

  test("should show validation errors when fields are empty", () => {
    const { getByText } = renderSignupScreen();

    fireEvent.press(getByText("Créer mon compte"));

    expect(getByText("Le nom d'utilisateur est requis.")).toBeTruthy();
    expect(getByText("L'email est requis.")).toBeTruthy();
    expect(getByText("Le mot de passe est requis.")).toBeTruthy();
    expect(getByText("Le prénom est requis.")).toBeTruthy();
    expect(getByText("Le nom de famille est requis.")).toBeTruthy();
    expect(getByText("Le téléphone est requis.")).toBeTruthy();
    expect(getByText("L'adresse est requise.")).toBeTruthy();

    expect(mockRegister).not.toHaveBeenCalled();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test("should show error for invalid email", () => {
    const { getByText, getByPlaceholderText } = renderSignupScreen();

    fireEvent.changeText(getByPlaceholderText("Nom d'utilisateur"), "issa123");
    fireEvent.changeText(getByPlaceholderText("E-mail"), "bademail");
    fireEvent.changeText(getByPlaceholderText("Mot de passe"), "Password1!");
    fireEvent.changeText(getByPlaceholderText("Prénom"), "Issa");
    fireEvent.changeText(getByPlaceholderText("Nom de famille"), "Test");
    fireEvent.changeText(getByPlaceholderText("Téléphone"), "5141234567");
    fireEvent.changeText(getByPlaceholderText("Adresse"), "Montréal");

    fireEvent.press(getByText("Créer mon compte"));

    expect(getByText("Votre email est pas valide.")).toBeTruthy();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  test("should register and login with valid information", async () => {
    mockRegister.mockResolvedValueOnce({});
    mockLogin.mockResolvedValueOnce({});

    const { getByText, getByPlaceholderText } = renderSignupScreen();

    fireEvent.changeText(getByPlaceholderText("Nom d'utilisateur"), "issa123");
    fireEvent.changeText(getByPlaceholderText("E-mail"), "issa@test.com");
    fireEvent.changeText(getByPlaceholderText("Mot de passe"), "Password1!");
    fireEvent.changeText(getByPlaceholderText("Prénom"), "Issa");
    fireEvent.changeText(getByPlaceholderText("Nom de famille"), "Test");
    fireEvent.changeText(getByPlaceholderText("Téléphone"), "5141234567");
    fireEvent.changeText(getByPlaceholderText("Adresse"), "Montréal");

    fireEvent.press(getByText("Créer mon compte"));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        username: "issa123",
        email: "issa@test.com",
        password: "Password1!",
        fname: "Issa",
        lname: "Test",
        phone: "5141234567",
        address: "Montréal",
        user_type: "student",
      });

      expect(mockLogin).toHaveBeenCalledWith(
        "issa@test.com",
        "Password1!"
      );
    });
  });

  test("should navigate to login screen", () => {
    const { getByText } = renderSignupScreen();

    fireEvent.press(getByText("Se connecter"));

    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});