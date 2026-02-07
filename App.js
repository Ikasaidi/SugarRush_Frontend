import "react-native-gesture-handler";
import React from "react";
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </View>
  );
}
