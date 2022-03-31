import React from "react";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NotificationComponent } from "../../components/Notification";

import { AppProps } from "../../routes/types/app";

import * as S from "./styles"

export function UserGridScreen({ navigation }: AppProps) {
  return (
    <>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent onPress={() => navigation.navigate("Home")} />
          <TitleComponent title="Cadastro Usuário" small />
        </S.ComeBack>

        <NotificationComponent />
      </HeaderComponent>
    </>
  );
}
