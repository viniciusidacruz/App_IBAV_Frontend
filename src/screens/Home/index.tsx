import React, { Fragment, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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

  const dataUser = user && user[0] && user[0][1];
  const whatIsOffice = dataUser && dataUser.cargo;

  const office = () => {
    switch (whatIsOffice) {
      case "lider":
        return <S.Office>Lider de Célula</S.Office>;

      case "discipulador":
        return <TitleComponent title="Discipulador" decoration red />;
    }
  };

  return (
    <Fragment>
      <HeaderComponent>
        <LogoComponent full />

        <S.Buttons>
          <NotificationComponent />

          <TouchableOpacity onPress={logout}>
            <S.Material name="logout" size={24} />
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
                <S.Name>{dataUser.nome}</S.Name>

                {office()}
              </S.Names>

              {whatIsOffice === "lider" && (
                <S.Info>
                  <S.InfoTextTitle>Célula</S.InfoTextTitle>

                  <S.InfoTextSubtitle>{`${dataUser.numero_celula} - ${dataUser.rede}`}</S.InfoTextSubtitle>
                </S.Info>
              )}

              <S.ContentOptions>
                <SelectedMenuComponent
                  icon={<S.SendReportIcon name="document-text-sharp" />}
                  title="Entregar Relatório"
                  onPress={() => navigation.navigate("SendReport")}
                />

                {whatIsOffice === "administrador" ? (
                  <SelectedMenuComponent
                    icon={<S.Material name="add" size={40} />}
                    title="Cadastro"
                    onPress={() => navigation.navigate("PreRegisterAdmin")}
                  />
                ) : (
                  <SelectedMenuComponent
                    icon={<S.RegisterIcon name="user-plus" />}
                    title="Cadastrar"
                    onPress={() => navigation.navigate("Register")}
                  />
                )}

                {whatIsOffice === "administrador" ? (
                  <SelectedMenuComponent
                    icon={<S.Material name="format-list-bulleted" size={40} />}
                    title="Listagem"
                    onPress={() => navigation.navigate("PreListAdmin")}
                  />
                ) : (
                  <SelectedMenuComponent
                    icon={<S.MembersIcon name="user-friends" />}
                    title="Membros"
                    onPress={() => navigation.navigate("Members")}
                  />
                )}
              </S.ContentOptions>

              {whatIsOffice === "administrador" && (
                <S.ContentOptions>
                  <SelectedMenuComponent
                    icon={<S.WaitApprovalIcon name="thumbs-up" />}
                    title="Aguardando Aprovação"
                    onPress={() => navigation.navigate("WaitApproval")}
                  />
                  <SelectedMenuComponent
                    icon={<S.MultiplicationIcon name="multiplication" />}
                    title="Multiplicação"
                    onPress={() => navigation.navigate("Multiplication")}
                  />
                </S.ContentOptions>
              )}
            </Fragment>
          )}
        </S.Content>
      )}
    </Fragment>
  );
}
