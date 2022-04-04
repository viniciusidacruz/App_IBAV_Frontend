import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, User } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { useFetch } from "../../hooks/useFetch";
import { firebaseConfig } from "../../config/firebase";
import { GetStorage } from "../../common/constants/storage";

import { IContextProps, IProviderProps } from "./types";

export const FilteredContext = createContext<IContextProps>(
  {} as IContextProps
);

export const FilteredProvider = ({ children }: IProviderProps) => {
  const [user, setUser] = useState(null);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const { data: listUsers, isFetching: loading } = useFetch("/users.json");

  useEffect(() => {
    const emailAuth = auth.currentUser?.email;
    const filterUser =
      listUsers &&
      listUsers.filter((item: any) => {
        return item[1].email === emailAuth;
      });

    if (filterUser) {
      setUser(filterUser);
      AsyncStorage.setItem(
        GetStorage.USER_FILTERED,
        JSON.stringify(filterUser)
      );
    }
  }, [listUsers]);

  return (
    <FilteredContext.Provider value={{ user, loading }}>
      {children}
    </FilteredContext.Provider>
  );
};
