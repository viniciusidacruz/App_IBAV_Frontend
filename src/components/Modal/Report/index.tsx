import { Alert } from "react-native";
import React, { Fragment, useState } from "react";

import { ModalComponent } from "..";
import { TitleComponent } from "../../Title";
import { ButtonComponent } from "../../Button";
import { DefaultContentModalComponent } from "../Default";

import useUserFiltered from "../../../hooks/useUserFiltered";
import { useFormReport } from "../../../hooks/useFormReport";
import { connectApi } from "../../../common/services/ConnectApi";

import { IContentModal } from "./types";

import * as S from "./styles";

export function ReportContentModalComponent({
  handleCloseModal,
  data,
  handleCancelForm,
  titCelulaAdm,
}: IContentModal) {
  const [sendModal, setSendModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const { state } = useFormReport();
  const { user } = useUserFiltered();

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

  const tituloCelula = () => {
    switch (data && data[0][1].cargo) {
      case 'lider':
        return (
          <TitleComponent
            title={`Célula: ${data && data[0][1].numero_celula} - ${data && data[0][1].rede
              }`}
            decoration
            primary
          />
        )
        case 'administrador':
        return (
          <TitleComponent
            title={`Célula: ${titCelulaAdm && titCelulaAdm}`}
            decoration
            primary
          />
        )
    }
  }

  return (
    <Fragment>
      <S.ContentModal>
        <S.TitleModal>Resumo do relatório</S.TitleModal>

        <S.ListModal>
          {console.log(data, 'data')}
          {/* <TitleComponent
            title={`Célula: ${data && data[0][1].numero_celula} - ${data && data[0][1].rede
              }`}
            decoration
            primary
          /> */}
          {tituloCelula()}
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
            title={`- ${presentCLMembers ? presentCLMembers.length : 0
              } membros (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${presentCTMembers ? presentCTMembers.length : 0
              } membros (culto)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${presentCLVisitors ? presentCLVisitors.length : 0
              } Visitantes (célula)`}
            decoration
            primary
          />
          <TitleComponent
            title={`- ${presentCTVisitors ? presentCTVisitors.length : 0
              } Visitantes (culto)`}
            decoration
            primary
          />
        </S.ListModal>

        <S.ObservationModal>
          <TitleComponent
            title={`Observações: ${state.observations ? state.observations : "Nenhuma observação!"
              }`}
            decoration
            primary
          />
        </S.ObservationModal>
        <S.BoxButton>
          <ButtonComponent
            title="Cancelar"
            onPress={handleCancelForm}
            small
          />

          <ButtonComponent
            title="Confirmar"
            onPress={handleSubmitForm}
            onPressIn={() => setModalSuccess(true)}
            small

          />
        </S.BoxButton>
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

      <ModalComponent
        isVisible={modalSuccess}
        onBackdropPress={() => setModalSuccess(false)}
      >
        <DefaultContentModalComponent
          closeModal={setModalSuccess}
          type="sendReport"
        />
      </ModalComponent>
    </Fragment>
  );
}
