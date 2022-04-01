import React, { Fragment, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalComponent } from "../../components/Modal";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { NavigationComponent } from "../../components/Navigation";
import { FooterInfoComponent } from "../../components/FooterInfo";
import { NotificationComponent } from "../../components/Notification";
import { CardMembersComponent } from "../../components/Cards/Members";
import { HeadingPresentComponent } from "../../components/HeadingPresent";
import { ReportContentModalComponent } from "../../components/Modal/Report";

import { AppProps } from "../../routes/types/app";
import ButtonsText from "../../common/constants/buttons";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import { connectApi } from "../../common/services/ConnectApi";

const loadingGif = require("../../assets/loader-two.gif");

import { IDataUserProps, ISelectedUserProps } from "./types";

import * as S from "./styles";

export function MembersReportScreen({ navigation }: AppProps) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [celulas, setCelulas] = useState<any>();
  const [members, setMembers] = useState<any>([]);
  const [membersIdentify, setMembersIdentify] = useState<any>();
  const [selectPerson, setSelectPerson] = useState<
    ISelectedUserProps | undefined
  >(undefined);
  const [isModalVisible, setModalVisible] = useState(false);

  const { state, dispatch } = useFormReport();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_dataUser");

      if (user) {
        setUser(JSON.parse(user));
      }
    };
    checkUser();
  }, []);

  const dataUser = user && user[0] && user[0][1];
  const identifyCelula = user && user[0][1].numero_celula;
  const idCelulaSelect = state.celulaSelect.split(" -")[0];
  const whatIsOffice = dataUser && dataUser.cargo;

  useEffect(() => {
    const filterMembers =
      members &&
      members.filter((item: any) => {
        return (
          item[1].celula === identifyCelula || item[1].celula === idCelulaSelect
        );
      });

    if (filterMembers) {
      setCelulas(filterMembers);
      AsyncStorage.setItem("@storage_members", JSON.stringify(filterMembers));
    }
  }, [identifyCelula, members]);

  useEffect(() => {
    setLoading(true);
    connectApi.get("celulas.json").then((response) => {
      setLoading(false);
      setMembers(Object.entries(response.data));
    });
  }, []);

  const newMembersList =
    celulas &&
    celulas.length > 0 &&
    Object.values(celulas[0][1].membros).filter(
      (member: any) =>
        member.status !== "visitante" && member.status !== "Visitante"
    );

  const newArrayMembers = membersIdentify ? membersIdentify : newMembersList;

  useEffect(() => {
    const memberFilter =
      newArrayMembers &&
      newArrayMembers.filter((item: IDataUserProps) => {
        if (item.nome !== selectPerson?.nome) {
          return item;
        }
      });

    if (selectPerson) {
      const tratarFalta = memberFilter.map((item: any) => {
        return {
          nome: item.nome,
          status: item.status,
          celula: item.celula ? item.celula : "F",
          culto: item.culto ? item.culto : "F",
        };
      });

      const selectPersonFalta = {
        nome: selectPerson.nome,
        status: selectPerson.status,
        celula: selectPerson.celula ? selectPerson.celula : "F",
        culto: selectPerson.culto ? selectPerson.culto : "F",
      };

      dispatch({
        type: FormReportActions.setMembers,
        payload: [...tratarFalta, selectPersonFalta],
      });

      setMembersIdentify([...memberFilter, selectPerson]);
    }
  }, [selectPerson]);

  function compared(a: IDataUserProps, b: IDataUserProps) {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  }

  newArrayMembers && newArrayMembers.sort(compared);

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate("SendReport")} />
        <NavigationComponent navigation={navigation} members />
        <NotificationComponent />
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <S.Content>
            {whatIsOffice !== "lider" && (
              <S.Heading>
                <S.Title>Célula</S.Title>
                <S.Subtitle>{state.celulaSelect}</S.Subtitle>
              </S.Heading>
            )}

            <HeadingPresentComponent />
            <ScrollView>
              {newArrayMembers &&
                newArrayMembers.map((data: any) => (
                  <CardMembersComponent
                    key={data}
                    data={data}
                    setSelectPerson={setSelectPerson}
                  />
                ))}
            </ScrollView>
            <FooterInfoComponent />

            <S.Button>
              <ButtonComponent
                title={ButtonsText.REPORT}
                onPress={handleOpenModal}
              />
            </S.Button>
          </S.Content>
        </KeyboardAvoidingView>
      )}

      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ReportContentModalComponent
          handleCloseModal={setModalVisible}
          data={user && user[1]}
          membersPresent={newArrayMembers}
        />
      </ModalComponent>
    </Fragment>
  );
}
