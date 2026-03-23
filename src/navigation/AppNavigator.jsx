import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';
import AuthContext from '../context/AuthContext';

import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authContext = {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />

            <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}

      </Stack.Navigator>
    </AuthContext.Provider>
  );
}