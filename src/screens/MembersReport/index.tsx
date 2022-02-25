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

import { AppProps } from "../../routes/types/app";
const loadingGif = require("../../assets/loader-two.gif");
import { connectApi } from "../../common/services/ConnectApi";

import * as S from "./styles";
import { IDataUserProps, ISelectedUserProps } from "./types";

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

  const identifyCelula = user && user[0][1].numero_celula;

  useEffect(() => {
    const filterMembers =
      members &&
      members.filter((item: any) => {
        return item[1].celula === identifyCelula;
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

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <>
          <S.Content>
            <HeadingPresentComponent />
            <ScrollView>
              {newArrayMembers &&
                newArrayMembers.map((data: any) => {
                  return (
                    <CardMembersComponent
                      key={data}
                      data={data}
                      setSelectPerson={setSelectPerson}
                    />
                  );
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
        </>
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
    </>
  );
}
