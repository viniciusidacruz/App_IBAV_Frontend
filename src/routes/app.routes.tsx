import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
import SignInScreen from '../screens/SignIn';
import SendReportScreen from '../screens/SendReport';
import MembersReportScreen from '../screens/MembersReport';
import VisitorsReportScreen from '../screens/VisitorsReport';

export function AppRoutes() {
  const [isLogged, setIsLogged] = useState(false);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {isLogged ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignIn"
            component={SignInScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SendReport"
            component={SendReportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MembersReport"
            component={MembersReportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VisitorsReport"
            component={VisitorsReportScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
