import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalComponent } from "../../components/Modal";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputMaskComponent } from "../../components/InputMask";
import { FooterInfoComponent } from "../../components/FooterInfo";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";
import { CardMembersComponent } from "../../components/Cards/Members";
import { HeadingPresentComponent } from "../../components/HeadingPresent";
import { ReportContentModalComponent } from "../../components/Modal/Report";
import { VisitorContentModalComponent } from "../../components/Modal/Visitor";

const loadingGif = require("../../assets/loader-two.gif");
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";

import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function VisitorsReportScreen({ navigation }: AppProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAddVisible, setisAddVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [memberStorage, setMemberStorage] = useState<any>();
  const [membersPerPage, setMembersPerPage] = useState<any>();

  const { state, dispatch } = useFormReport();

  const handleOpenModalReport = () => {
    setModalVisible(true);
  };

  const handleCloseModalReport = () => {
    setModalVisible(false);
  };

  const ID_CELULA = memberStorage && memberStorage.length > 0 && memberStorage[0][0];

  const handleOpenModalAdd = () => {
    const nome = state.nameVisitor;
    const telefone = state.phoneVisitor;
    const status = 'visitante'

    if (state.phoneVisitor !== "") {
      connectApi.post(`/celulas/${ID_CELULA}/membros.json`, {
        nome,
        telefone,
        status
      }).then(() => {
        setisAddVisible(true)
        setError('')
      });
    } else {
      setError("Campo obrigatório!")
    }
  };

  useEffect(() => {
    setLoading(true);
    const checkMembers = async () => {
      const members = await AsyncStorage.getItem("@storage_members");

      if (members) {
        setMemberStorage(JSON.parse(members));
        setLoading(false);
      }
    };

    checkMembers();
  }, [isAddVisible]);

  useEffect(() => {
    connectApi.get(`/celulas/${ID_CELULA}/membros.json`)
      .then((response) => setMembersPerPage(response.data));
  }, [isAddVisible]);

  const handleNameVisitorChange = (value: string) => {
    dispatch({
      type: FormReportActions.setNameVisitor,
      payload: value,
    });
  };

  const handlePhoneVisitorChange = (value: string) => {
    dispatch({
      type: FormReportActions.setPhoneVisitor,
      payload: value,
    });
  };

  const newVisitorsList =
    membersPerPage &&
    membersPerPage !== undefined &&
    Object.values(membersPerPage);

  console.log('Esse é o newVisitorsList ==========>', newVisitorsList && newVisitorsList);

  return (
    <>
      <HeaderComponent>
        <ComeBackComponent
          onPress={() => navigation.navigate("MembersReport")}
        />
        <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
          <S.Navigation>Dados</S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MembersReport")}>
          <S.Navigation>Membros</S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("VisitorsReport")}>
          <S.Navigation
            style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
          >
            Visitantes
          </S.Navigation>
        </TouchableOpacity>
        <NotificationComponent />
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <S.Content>
          <S.HeadingForm>
            <InputFieldComponent
              primary
              value={state.nameVisitor}
              placeholder="*Nome"
              onChangeText={handleNameVisitorChange}
            />

            <InputMaskComponent
              value={state.phoneVisitor}
              mask="phone"
              maxLength={14}
              placeholder="*Digite o Telefone"
              inputMaskChange={handlePhoneVisitorChange}
              primary
            />

            <S.FinishForm>
              <S.Info>{error !== "" && error}</S.Info>

              <ButtonComponent
                title="Adicionar visitante"
                onPress={handleOpenModalAdd}
                small
              />
            </S.FinishForm>
          </S.HeadingForm>

          <HeadingPresentComponent />

          <ScrollView>
            {/* {newVisitorsList && newVisitorsList.map((data: any) => {
              return <CardMembersComponent key={data} data={data} />;
            })} */}
          </ScrollView>

          <FooterInfoComponent />

          <S.Button>
            <ButtonComponent
              title="Entregar relatório"
              onPress={handleOpenModalReport}
            />
          </S.Button>
        </S.Content>
      )}

      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ReportContentModalComponent
          handleCloseModal={handleCloseModalReport}
        />
      </ModalComponent>

      <ModalComponent
        isVisible={isAddVisible}
        onBackdropPress={() => setisAddVisible(false)}
      >
        <VisitorContentModalComponent setisAddVisible={setisAddVisible} />
      </ModalComponent>
    </>
  );
}
