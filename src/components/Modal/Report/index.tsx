import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalComponent } from "..";
import { TitleComponent } from "../../Title";
import { ButtonComponent } from "../../Button";
import { DefaultContentModalComponent } from "../Default";

import { useFormReport } from "../../../hooks/useFormReport";
import { connectApi } from "../../../common/services/ConnectApi";

import { IContentModal } from "./types";
import * as S from "./styles";

export function ReportContentModalComponent({
  handleCloseModal,
  data,
}: IContentModal) {
  const [user, setUser] = useState<any>();
  const [sendModal, setSendModal] = useState(false);

  const { state } = useFormReport();

  const presentCLMembers = state.members.filter((item) => item.celula === "P");
  const presentCTMembers = state.members.filter((item) => item.culto === "P");
  const presentCLVisitors = state.visitors.filter(
    (item) => item.celula === "P"
  );
  const presentCTVisitors = state.visitors.filter((item) => item.culto === "P");

  const handleSubmitForm = () => {
    try {
      const numero_celula = user && user[0][1].numero_celula;
      const oferta = state.offer;
      const data = state.textDate;

      let presencas = [...state.members, ...state.visitors];

      const observacoes = state.observations;

      connectApi
        .post("/relatorios.json", {
          data,
          numero_celula,
          observacoes,
          oferta,
          presencas,
        })
        .then(() => setSendModal(true));
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
            title={`Oferta: ${state.offer ? state.offer : "Nenhuma oferta!"}`}
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
              presentCLMembers ? presentCLMembers.length : 0
            } membros (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCTMembers ? presentCTMembers.length : 0
            } membros (culto)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCLVisitors ? presentCLVisitors.length : 0
            } Visitantes (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${
              presentCTVisitors ? presentCTVisitors.length : 0
            } Visitantes (culto)`}
            decoration
            primary
          />
        </S.ListModal>

        <S.ObservationModal>
          <TitleComponent
            title={`Observações: ${
              state.observations ? state.observations : "Nenhuma observação!"
            }`}
            decoration
            primary
          />
        </S.ObservationModal>

        <ButtonComponent title="Confirmar" onPress={handleSubmitForm} />
      </S.ContentModal>

      <ModalComponent
        isVisible={sendModal}
        onBackdropPress={() => setSendModal(false)}
      >
        <DefaultContentModalComponent
          closeModal={setSendModal}
          type="sendReport"
        />
      </ModalComponent>
    </>
  );
}
