import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { CardProvider } from "./src/context/CardContext";

export default function App() {
  return (
    <CardProvider>

      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CardProvider>

  );
}