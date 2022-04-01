import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/Home";
import { MembersScreen } from "../screens/Members";
import { UserGridScreen } from "../screens/UserGrid";
import { RegisterScreen } from "../screens/Register";
import { WaitApproval } from "../screens/WaitApproval";
import { SendReportScreen } from "../screens/SendReport";
import { Multiplication } from "../screens/Multiplication";
import { PreListAdminScreen } from "../screens/PreListAdmin";
import { MembersReportScreen } from "../screens/MembersReport";
import { VisitorsReportScreen } from "../screens/VisitorsReport";
import { PreRegisterAdminScreen } from "../screens/PreRegisterAdmin";

import { AppStackParamsList } from "./types/app";

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<AppStackParamsList>();

  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={HomeScreen}
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
      <Screen
        name="Multiplication"
        component={Multiplication}
        options={{ headerShown: false }}
      />
      <Screen
        name="WaitApproval"
        component={WaitApproval}
        options={{ headerShown: false }}
      />
      <Screen
        name="PreRegisterAdmin"
        component={PreRegisterAdminScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="PreListAdmin"
        component={PreListAdminScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="UserGrid"
        component={UserGridScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
