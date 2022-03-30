import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen } from "../screens/SignIn";
import { PreloadScreen } from "../screens/PreLoad";

import { AppStackParamsList } from "./types/app";

export function AuthRouter() {
  const { Navigator, Screen } =
    createNativeStackNavigator<AppStackParamsList>();

  return (
    <Navigator initialRouteName="Preload">
      <Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Preload"
        component={PreloadScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
