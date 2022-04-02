import React, { useEffect, useState, createContext } from "react";

import { getAuth, User } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "../../config/firebase";

import { IProviderProps } from "./types";

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: IProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
