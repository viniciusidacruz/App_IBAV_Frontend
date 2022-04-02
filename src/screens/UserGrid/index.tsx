import React, { Fragment } from "react";

import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NotificationComponent } from "../../components/Notification";

import * as S from "./styles";

export function UserGridScreen() {
  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <TitleComponent title="Cadastro Usuário" small />
        </S.ComeBack>

        <NotificationComponent />
      </HeaderComponent>
    </Fragment>
  );
}
