import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/Home";
import { SignInScreen } from "../screens/SignIn";
import { MembersScreen } from "../screens/Members";
import { PreloadScreen } from "../screens/PreLoad";
import { RegisterScreen } from "../screens/Register";
import { SendReportScreen } from "../screens/SendReport";
import { MembersReportScreen } from "../screens/MembersReport";
import { VisitorsReportScreen } from "../screens/VisitorsReport";

import { AppStackParamsList } from "./types/app";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator<AppStackParamsList>();

  return (
    <Navigator initialRouteName="Preload">
      <Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
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
      <Screen
        name="SendReport"
        component={SendReportScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="MembersReport"
        component={MembersReportScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="VisitorsReport"
        component={VisitorsReportScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Members"
        component={MembersScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
