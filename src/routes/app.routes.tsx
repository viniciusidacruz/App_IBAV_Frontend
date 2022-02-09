import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignIn';

export function AppRoutes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignInScreen}
      />
    </Stack.Navigator>
  );
}
