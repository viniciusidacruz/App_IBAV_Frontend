import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalComponent } from "../../components/Modal";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { FooterInfoComponent } from "../../components/FooterInfo";
import { NotificationComponent } from "../../components/Notification";
import { CardMembersComponent } from "../../components/Cards/Members";
import { HeadingPresentComponent } from "../../components/HeadingPresent";
import { ReportContentModalComponent } from "../../components/Modal/Report";

import { connectApi } from "../../common/services/ConnectApi";
import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function MembersReportScreen({ navigation }: AppProps) {
  const [members, setMembers] = useState<any>([]);
  const [celulas, setCelulas] = useState<any>()
  const [user, setUser] = useState<any>();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };  

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_dateUser");      

      if (user) {
        setUser(JSON.parse(user));
      }
    };
    checkUser();
  }, []);  

  useEffect(() => {    
    const ID_CELULAS = "-Mve6Q42f4wIHHdTQLuu";

    connectApi.get(`celulas/${ID_CELULAS}/membros.json`).then((response) => {
      setMembers(Object.entries(response.data));
    });
  }, []);

  useEffect(() => {
    connectApi.get('/celulas.json').then((response) => {
      setCelulas(Object.entries(response.data))
    })
  }, []);
  
  return (
    <>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate("SendReport")} />
        <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
          <S.Navigation>Dados</S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MembersReport")}>
          <S.Navigation
            style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
          >
            Membros
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("VisitorsReport")}>
          <S.Navigation>Visitantes</S.Navigation>
        </TouchableOpacity>
        <NotificationComponent />
      </HeaderComponent>

      <S.Content>
        <HeadingPresentComponent />
        <ScrollView>
          {members.map((data: any) => {      
            return <CardMembersComponent key={data} data={data} />;
          })}
        </ScrollView>
        <FooterInfoComponent />

        <S.Button>
          <ButtonComponent
            title="Entregar relatório"
            onPress={handleOpenModal}
          />
        </S.Button>
      </S.Content>

      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ReportContentModalComponent handleCloseModal={handleCloseModal} data={user && user[1]} />
      </ModalComponent>
    </>
  );
}
