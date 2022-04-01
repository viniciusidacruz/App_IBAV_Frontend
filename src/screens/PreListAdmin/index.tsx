import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NotificationComponent } from "../../components/Notification";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function PreListAdminScreen({ navigation }: AppProps) {
  const logout = () => {
    AsyncStorage.removeItem("@storage_User");
    AsyncStorage.removeItem("@storage_dataUser");
    AsyncStorage.removeItem("@storage_members");
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent onPress={() => navigation.navigate("Home")} />
          <LogoComponent full />
        </S.HeadingIcons>

        <S.Buttons>
          <NotificationComponent />

          <TouchableOpacity onPress={logout}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>

      <S.Content>
        <S.Names>
          <TitleComponent title="Listagem" medium uppercase primary weight />
        </S.Names>

        <S.ContentOptions>
          <SelectedMenuComponent
            icon={<S.MembersIcon name="user-friends" />}
            title="Membros"
            onPress={() => navigation.navigate("Members")}
          />

          <SelectedMenuComponent
            icon={<S.Font name="user-o" size={34} />}
            title="Usuário/Rede"
            onPress={() => navigation.navigate("UserGrid")}
          />

          <SelectedMenuComponent
            icon={<S.UserGridIcon name="network-wired" />}
            title="Rede"
            onPress={() => navigation.navigate("UserGrid")}
          />
        </S.ContentOptions>
      </S.Content>
    </Fragment>
  );
}
