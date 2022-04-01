import React, { Fragment, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { NotificationComponent } from "../../components/Notification";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

const loadingGif = require("../../assets/loader-two.gif");

import { AppProps } from "../../routes/types/app";
import { firebaseConfig } from "../../config/firebase";
import { connectApi } from "../../common/services/ConnectApi";

import * as S from "./styles";

export function PreRegisterAdmin({ navigation }: AppProps) {
  const [listUsers, setListUsers] = useState<any>();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(false);
      } else {
        navigation.replace("SignIn");
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setLoading(true);
    connectApi.get("/users.json").then((response) => {
      setListUsers(Object.entries(response.data));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const emailAuth = auth.currentUser?.email;
    const filterUser =
      listUsers &&
      listUsers.filter((item: any) => {
        return item[1].email === emailAuth;
      });

    if (filterUser) {
      setUser(filterUser);
      AsyncStorage.setItem("@storage_dataUser", JSON.stringify(filterUser));
    }
  }, [listUsers]);

  const logout = () => {
    auth.signOut().then(() => alert("Você está deslogado"));
    AsyncStorage.removeItem("@storage_User");
    AsyncStorage.removeItem("@storage_dataUser");
    AsyncStorage.removeItem("@storage_members");
  };


  return (
    <Fragment>
      <HeaderComponent>
        <LogoComponent full />

        <S.Buttons>
          <NotificationComponent />

          <TouchableOpacity onPress={logout}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>
      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <S.Content>
          <S.Names>
            <TitleComponent
              title={"Cadastro"}
              medium
              uppercase
              primary
              weight
            />
          </S.Names>

          <S.ContentOptions>
            <SelectedMenuComponent
              icon={<S.RegisterIcon name="user-plus" />}
              title="Membros"
              onPress={() => navigation.navigate("Register")}
            />
            <SelectedMenuComponent
              icon={<S.UserGridIcon name="network-wired" />}
              title="Usuário/Rede"
              onPress={() => navigation.navigate("UserGrid")}
            />
          </S.ContentOptions>
        </S.Content>
      )}
    </Fragment>
  );
}
