import React, { useEffect } from "react";

import { useFormReport } from "../../../hooks/useFormReport";
import { FormReportActions } from "../../../contexts/FormReport";

import * as S from "./styles";

export function DefaultContentModalComponent({ closeModal, type }: any) {
  const { state, dispatch } = useFormReport();

  useEffect(() => {
    setTimeout(() => {
      closeModal(false);

      dispatch({
        type: FormReportActions.setNameVisitor,
        payload: "",
      });
    }, 3000);
  }, []);

  return (
    <S.ContentModal>
      {type === "addVisitor" && (
        <S.Description>
          Visitante <S.Name>{state.nameVisitor}</S.Name> adicionado com sucesso!
        </S.Description>
      )}
      {type === "sendReport" && (
        <S.Description>Relatório entregue com sucesso</S.Description>
      )}
      <S.Success name="verified" />
    </S.ContentModal>
  );
}
