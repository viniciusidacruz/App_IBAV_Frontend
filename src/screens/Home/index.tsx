import React, { Fragment, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
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
import { useNavigation } from "@react-navigation/native";

export function HomeScreen({ navigation }: AppProps) {
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

  const dataUser = user && user[0][1];
  const isDisciple = dataUser.cargo;

  const office = () => {
    switch (isDisciple) {
      case "lider":
        return <TitleComponent title="lider de Célula" decoration red />;

      case "discipulador":
        return <TitleComponent title="Discipulador" decoration red />;
    }
  };

  return (
    <>
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
          {dataUser && (
            <Fragment>
              <S.Names>
                <TitleComponent
                  title={dataUser.nome}
                  medium
                  uppercase
                  primary
                  weight
                />

                {office()}
              </S.Names>

              {isDisciple === "lider" && (
                <S.Info>
                  <TitleComponent
                    title="Célula"
                    decoration
                    red
                    weight
                    uppercase
                  />
                  <TitleComponent
                    title={`${dataUser.numero_celula} - ${dataUser.rede}`}
                    small
                    uppercase
                    primary
                  />
                </S.Info>
              )}

              <S.ContentOptions>
                <SelectedMenuComponent
                  icon={<S.SendReportIcon name="document-text-sharp" />}
                  title="Entregar Relatório"
                  onPress={() => navigation.navigate("SendReport")}
                />
                <SelectedMenuComponent
                  icon={<S.MembersIcon name="user-friends" />}
                  title="Membros"
                  onPress={() => navigation.navigate("Members")}
                />
                <SelectedMenuComponent
                  icon={<S.RegisterIcon name="user-plus" />}
                  title="Cadastrar"
                  onPress={() => navigation.navigate("Register")}
                />
              </S.ContentOptions>
            </Fragment>
          )}
        </S.Content>
      )}
    </>
  );
}
