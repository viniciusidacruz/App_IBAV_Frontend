import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthRouter } from "./auth.routes";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

export const Routes = () => {
  const [user, setUser] = useState<boolean>(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRouter />}
    </NavigationContainer>
  );
};
