import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DateComponent } from "../../components/Date";
import { TitleComponent } from "../../components/Title";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";
import { ReportContentModalComponent } from "../../components/Modal/Report";

import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function SendReportScreen({ navigation }: AppProps) {
  const [offer, setOffer] = useState("");
  const [observation, setObservation] = useState("");
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
      } else {
        navigation.navigate("SignIn");
      }
    };
    checkUser();
  }, []);  

  return (
    <>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate("Home")} />
        <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
          <S.Navigation
            style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
          >
            Dados
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MembersReport")}>
          <S.Navigation>Membros</S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("VisitorsReport")}>
          <S.Navigation>Visitantes</S.Navigation>
        </TouchableOpacity>
        <NotificationComponent />
      </HeaderComponent>

      {user && (
        <>
          <S.Content>
            <S.Grid>
              <TitleComponent title="Célula:" small primary />
              <S.ContentC>
                <S.IconC name="user-friends" />
                <S.DescriptionC>{`${user[1].numero_celula} - ${user[1].rede}`}</S.DescriptionC>
              </S.ContentC>
            </S.Grid>

            <S.Grid>
              <TitleComponent title="Oferta R$:" small primary />
              <S.ContentC>
                <S.IconC name="file-invoice-dollar" />
                <InputFieldComponent
                  primary
                  value={offer}
                  placeholderTextColor="grey"
                  onChangeText={(value) => setOffer(value)}
                />
              </S.ContentC>
            </S.Grid>

            <S.Grid>
              <TitleComponent title="Data:" small primary />
              <S.ContentC>
                <DateComponent />
              </S.ContentC>
            </S.Grid>

            <S.Grid>
              <TitleComponent title="Observações:" small primary />
              <S.Observations
                multiline={true}
                numberOfLines={5}
                onChangeText={(text) => setObservation(text)}
                value={observation}
              />
            </S.Grid>

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
            <ReportContentModalComponent handleCloseModal={handleCloseModal} data={user[1]} />
          </ModalComponent>
        </>
      )}
    </>
  );
}
