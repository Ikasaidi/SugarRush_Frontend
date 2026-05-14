import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import AuthContext, { AuthProvider } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';

import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import AdminPanelScreen from "../screens/AdminPanelScreen"; 

const Stack = createNativeStackNavigator();

function Navigation() {
  const { isLoggedIn, loading, user } = useContext(AuthContext);
  const isAdmin = user?.user_type === "admin";

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF8FB3" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          {isAdmin ? (
            <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
          ) : null}
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}