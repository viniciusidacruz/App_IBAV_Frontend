import React, { useState } from "react";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";

import * as S from "./styles";

export function DateComponent() {
  const [showCalender, setShowCalender] = useState(false);

  const { state, dispatch } = useFormReport();


  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || state.date;

    setShowCalender(false);

    const tempDate = new Date(currentDate);
    const newDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    dispatch({
      type: FormReportActions.setDate,
      payload: currentDate
    })
    dispatch({
      type: FormReportActions.setTextDate,
      payload: newDate
    })
  }

  const showMode = () => {
    setShowCalender(true);
  };

  return (
    <>
      <S.Content onPress={showMode}>
        <S.TextSelect>{state.textDate}</S.TextSelect>
        <S.SelectDate>
          <S.Icon name="calendar" />
        </S.SelectDate>
      </S.Content>

      {showCalender && <DateTimePicker value={state.date} onChange={handleDateChange} />}
    </>
  );
}
