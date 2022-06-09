import React, { Fragment, useEffect, useState } from "react";

import MenuNavigation from "../../common/constants/navigation";

import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";

import * as S from "./styles";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import RequestService from "../../common/services/RequestService";

export default function NetworkListScreen() {
  const [network, setNetwork] = useState("Selecione");

  const serviceNetwork = new RequestService();

  useEffect(() => {
    // try {
    //   const response = serviceNetwork.getCelulas();

    console.log("response =>");
    // } catch (err) {
    //   throw new Error("Ops algo deu errado na sua conexão de getCelulas");
    // }
  }, []);

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.NETWORK}</S.TitlePage>
        </S.ComeBack>
        {/* <NotificationComponent /> */}
      </HeaderComponent>

      <S.Container>
        <SelectComponent
          label="Rede"
          onChange={(value) => setNetwork(value)}
          selectedOption={(value) => setNetwork(value)}
          labelSelect={network}
          dataOptions={[]}
        />

        <SelectComponent
          label="Discipulado"
          onChange={() => {}}
          selectedOption={() => {}}
          labelSelect={"Teste"}
          dataOptions={[]}
        />

        <S.ContentButton>
          <ButtonComponent
            title="Pesquisar"
            width="200"
            icon="user-plus"
            color="white"
          />
        </S.ContentButton>
      </S.Container>
    </Fragment>
  );
}
