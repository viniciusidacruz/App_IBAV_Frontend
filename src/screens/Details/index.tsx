import React, { Fragment, useEffect, useState } from "react";

import MenuNavigation from "../../common/constants/navigation";

import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NotificationComponent } from "../../components/Notification";

const loadingGif = require("../../assets/loader-two.gif");

import * as S from "./styles";

// useEffect(() => {
//   function teste{}

//   teste()
// }

export function DetailsScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.DETAILS}</S.TitlePage>
        </S.ComeBack>

        <NotificationComponent />
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <S.Container>
          <S.HeaderButtons>
            <ButtonComponent
              title="Rejeitar"
              width="150"
              icon="thumbs-down"
              colorIcon="#fff"
            />
            <ButtonComponent
              title="Aprovar"
              width="150"
              icon="thumbs-up"
              colorIcon="#fff"
            />
          </S.HeaderButtons>

          <S.Info>
            <S.Username>
              Usuário: <S.Name>felipe</S.Name>
            </S.Username>
            <S.InfoFullName>Felipe</S.InfoFullName>
          </S.Info>

          {/* <S.Description>
            <S.TitleDescription>Descrição</S.TitleDescription>
            <S.Action>
              Ação: <S.ActionName>adicionou novo membro</S.ActionName>
            </S.Action>
          </S.Description> */}
        </S.Container>
      )}
    </Fragment>
  );
}
