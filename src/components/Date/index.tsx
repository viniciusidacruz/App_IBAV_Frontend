import React, { useState } from "react";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";

import * as S from "./styles";

interface Props {
  text: string;
  dataDados: any;
  showCalender: boolean;
  onChange: any;
  open: any;
}

export function DateComponent({ dataDados, showCalender, onChange, open, text }: Props) {
  
  return (
    <>
      <S.Content onPress={open}>
        <S.TextSelect>{text}</S.TextSelect>
        <S.SelectDate>
          <S.Icon name="calendar" />
        </S.SelectDate>
      </S.Content>

      {showCalender && <DateTimePicker value={dataDados} onChange={onChange} />}
    </>
  );
}
