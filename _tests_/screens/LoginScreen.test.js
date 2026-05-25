import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import LoginScreen from "../../src/screens/LoginScreen";
import AuthContext from "../../src/context/AuthContext";


const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  useFocusEffect: jest.fn(),
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }) => children,
}));


jest.mock("../../src/components/AnimatedLogo", () => {
  return () => null;
});

jest.mock("../../src/components/IconInput", () => {
  const React = require("react");
  const { TextInput } = require("react-native");

  return ({ placeholder, value, onChangeText, secure, editable }) => (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      editable={editable}
    />
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

describe("LoginScreen", () => {
  const mockLogin = jest.fn();

  const renderLoginScreen = () => {
    return render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <LoginScreen />
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render login screen", () => {
    const { getByText, getByPlaceholderText } = renderLoginScreen();

    expect(getByText("Candy Train")).toBeTruthy();
    expect(getByText("Bienvenue !")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Mot de passe")).toBeTruthy();
    expect(getByText("Se connecter")).toBeTruthy();
  });

  test("should show error when email and password are empty", async () => {
    const { getByText } = renderLoginScreen();

    fireEvent.press(getByText("Se connecter"));

    expect(
      getByText("Veuillez entrer votre email et votre mot de passe.")
    ).toBeTruthy();

    expect(mockLogin).not.toHaveBeenCalled();
  });

  test("should call login with email and password", async () => {
    const { getByText, getByPlaceholderText } = renderLoginScreen();

    fireEvent.changeText(getByPlaceholderText("Email"), "test@gmail.com");
    fireEvent.changeText(getByPlaceholderText("Mot de passe"), "123456");

    fireEvent.press(getByText("Se connecter"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@gmail.com", "123456");
    });
  });

  test("should navigate to signup screen", () => {
    const { getByText } = renderLoginScreen();

    fireEvent.press(getByText("S'inscrire"));

    expect(mockNavigate).toHaveBeenCalledWith("Signup");
  });
});