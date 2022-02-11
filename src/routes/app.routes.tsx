import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/Home";
import { SendReportScreen } from "../screens/SendReport";
import { MembersReportScreen } from "../screens/MembersReport";
import { VisitorsReportScreen } from "../screens/VisitorsReport";

import { IParamsRoutesAppProps } from "./types/routes";

export function AppRoutes() {
  const { Navigator, Screen } =
    createNativeStackNavigator<IParamsRoutesAppProps>();

  return (
    <Navigator>
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
    </Navigator>
  );
}
