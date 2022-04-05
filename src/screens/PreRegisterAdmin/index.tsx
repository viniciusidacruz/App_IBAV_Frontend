import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NotificationComponent } from "../../components/Notification";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import { handleSignOut } from "../../common/utils/firebase";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";

export function PreRegisterAdminScreen() {
  const navigation = useNavigation<IPropsAppStack>();

  return (
    <Fragment>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>

        <S.Buttons>
          <NotificationComponent />

          <TouchableOpacity onPress={() => handleSignOut()}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>

      <S.Content>
        <S.Names>
          <TitleComponent title="Cadastro" medium uppercase primary weight />
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
            onPress={() => navigation.navigate("UserRegister")}
          />
        </S.ContentOptions>
      </S.Content>
    </Fragment>
  );
}
