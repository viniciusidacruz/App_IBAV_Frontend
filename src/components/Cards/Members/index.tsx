import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { useFormReport } from "../../../hooks/useFormReport";
import { FormReportActions } from "../../../contexts/FormReport";

import { IDataPros } from "./types";

import * as S from "./styles";

export function CardMembersComponent({ data, setSelectPerson }: IDataPros) {
  const { state, dispatch } = useFormReport();
  const handlePresentCelula = (value: string) => {
    setSelectPerson({...data, celula: value})
    dispatch({
      type: FormReportActions.setMembersCL,
      payload: value,
    });
  };

  const handlePresentCulto = (value: string) => {
    setSelectPerson({...data, culto: value})
    dispatch({
      type: FormReportActions.setMembersCT,
      payload: value,
    });
  };

  return (
    <S.Content>
      <S.ContentName>
        <S.InfoName>{data.nome}</S.InfoName>
      </S.ContentName>

      <S.ContainerSelect>
        <Picker
          selectedValue={data.celula}
          style={{ height: 50, width: 80 }}
          onValueChange={handlePresentCelula}
        >
          <Picker.Item label="F" value="F" />
          <Picker.Item label="P" value="P" />
          <Picker.Item label="D" value="D" />
          <Picker.Item label="T" value="T" />
          <Picker.Item label="V" value="V" />
        </Picker>

        <Picker
          selectedValue={data.culto}
          style={{ height: 50, width: 80 }}
          onValueChange={handlePresentCulto}
        >
          <Picker.Item label="F" value="F" />
          <Picker.Item label="P" value="P" />
          <Picker.Item label="D" value="D" />
          <Picker.Item label="T" value="T" />
          <Picker.Item label="V" value="V" />
        </Picker>
      </S.ContainerSelect>
    </S.Content>
  );
}
