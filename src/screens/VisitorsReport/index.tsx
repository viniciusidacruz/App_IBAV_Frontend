import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalComponent } from "../../components/Modal";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { FooterInfoComponent } from "../../components/FooterInfo";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";
import { CardVisitorsComponent } from "../../components/Cards/Visitors";
import { HeadingPresentComponent } from "../../components/HeadingPresent";
import { ReportContentModalComponent } from "../../components/Modal/Report";
import { VisitorContentModalComponent } from "../../components/Modal/Visitor";

import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
const loadingGif = require("../../assets/loader-two.gif");

import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function VisitorsReportScreen({ navigation }: AppProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddVisible, setisAddVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<any>();
  const [error, setError] = useState('');

  const { state, dispatch } = useFormReport();

  const handleOpenModalReport = () => {
    setModalVisible(true);
  };

  const handleCloseModalReport = () => {
    setModalVisible(false);
  };

  const handleOpenModalAdd = () => {
    if (state.phoneVisitor === "") {
      setError("Campo obrigatório!")
    } else {
      setisAddVisible(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    const checkMembers = async () => {
      const members = await AsyncStorage.getItem("@storage_members");

      if (members) {
        setMembers(JSON.parse(members));
        setLoading(false);
      }
    };

    checkMembers();
  }, []);

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
              placeholderTextColor="grey"
              onChangeText={handleNameVisitorChange}
            />

            <InputFieldComponent
              primary
              placeholder="*Telefone"
              value={state.phoneVisitor}
              placeholderTextColor="grey"
              onChangeText={handlePhoneVisitorChange}
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
            {/* {celulas &&
            celulas.length > 0 &&
            Object.values(celulas[0][1].membros).map((data: any) => {
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
