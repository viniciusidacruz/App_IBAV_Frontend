import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TitleComponent } from "../../Title";
import { ButtonComponent } from "../../Button";

import { useFormReport } from "../../../hooks/useFormReport";

import * as S from "./styles";
import { IContentModal, IMemberOrVisitor } from "./types";
import { connectApi } from "../../../common/services/ConnectApi";
import { ModalComponent } from "..";
import { DefaultContentModalComponent } from "../Default";

export function ReportContentModalComponent({
  handleCloseModal,
  data,
  membersPresent,
  visitorsPresent,
}: IContentModal) {
  const [user, setUser] = useState<any>();
  const [sendModal, setSendModal] = useState(false);

  console.log("user", user && user[0][1].numero_celula);

  const { state } = useFormReport();

  const presentCLMembers =
    membersPresent &&
    membersPresent.filter((item: IMemberOrVisitor) => item.celula === "P");

  const presentCTMembers =
    membersPresent &&
    membersPresent.filter((item: IMemberOrVisitor) => item.culto === "P");

  const presentCLVisitors =
    visitorsPresent &&
    visitorsPresent.filter((item: IMemberOrVisitor) => item.celula === "P");

  const presentCTVisitors =
    visitorsPresent &&
    visitorsPresent.filter((item: IMemberOrVisitor) => item.culto === "P");

  const handleSubmitForm = () => {
    try {
      const celula = `${user && user[0][1].numero_celula}-${
        user && user[0][1].rede
      }`;
      const oferta = state.offer;
      const data = state.textDate;
      const presencas = {
        celula_membros: presentCLMembers?.length,
        culto_membros: presentCTMembers?.length,
        celula_visitantes: presentCLVisitors?.length,
        culto_visitantes: presentCTVisitors?.length,
      };
      const observacoes = state.observations;

      connectApi("/relatorios.json", {
        celula,
        oferta,
        data,
        presencas,
        observacoes,
      }).then(() => setSendModal(true));
      handleCloseModal(false);
    } catch (err) {
      if (err) {
        Alert.alert("Ops algo deu errado ao enviar o seu formulário!");
        handleCloseModal(false);
      }
    }
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

  return (
    <>
      <S.ContentModal>
        <S.TitleModal>Resumo do relatório</S.TitleModal>

        <S.ListModal>
          <TitleComponent
            title={`Célula: ${data && data[0][1].numero_celula} - ${
              data && data[0][1].rede
            }`}
            decoration
            primary
          />

          <TitleComponent
            title={`Oferta: ${
              state.offer ? state.offer : "Precisa selecionar uma data[E"
            }`}
            decoration
            primary
          />
          <TitleComponent
            title={`Data: ${state.textDate}`}
            decoration
            primary
          />
          <TitleComponent title="Presença:" decoration primary />
          <TitleComponent
            title={`- ${
              presentCLMembers && presentCLMembers.length
            } membros (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCTMembers && presentCTMembers.length
            } membros (culto)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCLVisitors && presentCLVisitors.length
            } Visitantes (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCTVisitors && presentCTVisitors.length
            } Visitantes (culto)`}
            decoration
            primary
          />
        </S.ListModal>

        <S.ObservationModal>
          <TitleComponent
            title={`Observações: ${state.observations}`}
            decoration
            primary
          />
        </S.ObservationModal>

        <ButtonComponent title="Confirmar" onPress={handleCloseModal} />
      </S.ContentModal>

      <ModalComponent
        isVisible={sendModal}
        onBackdropPress={() => setSendModal(false)}
      >
        <DefaultContentModalComponent closeModal={setSendModal} type="sendReport" />
      </ModalComponent>
    </>
  );
}
