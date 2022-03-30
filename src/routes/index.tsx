import React, { useEffect, useState } from "react";

import { AppRoutes } from "./app.routes";
import { AuthRouter } from "./auth.routes";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { firebaseConfig } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

export const Routes = () => {

  const [user, setUser] = useState<any>();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user, 'user')
      if (user) {
        setUser(true);
      } else {
        setUser(false)
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ?<AppRoutes /> : <AuthRouter/>}
    </NavigationContainer>
  );
};
