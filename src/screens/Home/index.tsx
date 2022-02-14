import React, { useEffect, useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import { AppProps } from "../../routes/types/app";
import { connectApi } from "../../common/services/ConnectApi";

import * as S from "./styles";
import { setStatusBarBackgroundColor } from "expo-status-bar";

export function HomeScreen({ navigation }: AppProps) {
  const [users, setUsers] = useState<any>();
  const [user, setUser] = useState<any>();
  const [userAuth, setUserAuth] = useState<any>();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_User");      

      if (user) {
        setUserAuth(JSON.parse(user))
      } else {
        navigation.navigate("SignIn");
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    connectApi
      .get("/users.json")
      .then((response) => setUsers(Object.entries(response.data)));
  }, []);

  useEffect(() => {
    const emailAuth = userAuth?.email;
    const filterUser =
      users &&
      users.filter((item: any) => {
        return item[1].email === emailAuth;
      });

    setUser(filterUser);
  }, [userAuth, users]);

  useEffect(() => {
    const data = user && user[0];

    AsyncStorage.setItem('@storage_dateUser', JSON.stringify(data))
  }, [])  

  const redirectReportWithData = async () => {
    navigation.navigate("Members");
  };

  const logout = () => {
    AsyncStorage.removeItem("@storage_User");
    navigation.navigate("SignIn");
  };

  console.log('Esse é o user', user);
  
  // const dataUser = user && user[0][1];

  return (
    <>
      <HeaderComponent>
        <LogoComponent full />

        <TouchableOpacity onPress={logout}>
          <S.Logout name="logout" />
        </TouchableOpacity>
      </HeaderComponent>

      <S.Content>
        {/* {dataUser && (
          <>
            <S.Names>
              <TitleComponent
                title={dataUser.nome}
                medium
                uppercase
                primary
                weight
              />
              {dataUser.cargo === "lider" && (
                <TitleComponent
                  title={`${dataUser.cargo} de Célula`}
                  decoration
                  red
                />
              )}
            </S.Names>
            <S.Info>
              <TitleComponent title="Célula" decoration red weight uppercase />
              <TitleComponent
                title={`${dataUser.celula} - ${dataUser.rede}`}
                small
                uppercase
                primary
              />
            </S.Info>

            <S.ContentOptions>
              <SelectedMenuComponent
                icon={<S.SendReportIcon name="document-text-sharp" />}
                title="Entregar Relatório"
                onPress={() => navigation.navigate("SendReport")}
              />
              <SelectedMenuComponent
                icon={<S.MembersIcon name="user-friends" />}
                title="Membros"
                onPress={redirectReportWithData}
              />
              <SelectedMenuComponent
                icon={<S.RegisterIcon name="user-plus" />}
                title="Cadastrar"
                onPress={() => navigation.navigate("Register")}
              />
            </S.ContentOptions>
          </>
        )} */}
      </S.Content>
    </>
  );
}
