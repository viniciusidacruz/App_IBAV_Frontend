import React, { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { NotificationComponent } from "../../components/Notification";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

const loadingGif = require("../../assets/loader-two.gif");

import useUserFiltered from "../../hooks/useUserFiltered";
import { handleSignOut } from "../../common/utils/firebase";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";

export function HomeScreen() {
  const { loading, user } = useUserFiltered();
  const navigation = useNavigation<IPropsAppStack>();

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

          <TouchableOpacity onPress={() => handleSignOut()}>
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
