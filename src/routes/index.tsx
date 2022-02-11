import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { NavigationContainer } from "@react-navigation/native";

export const Routes = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    AsyncStorage.getItem("@storage_User").then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};
