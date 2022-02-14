import React, { useState } from 'react'
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

import * as S from './styles';

export function DateComponent() {
  const [date, setDate] = useState(new Date());
  const [showCalender, setShowCalender] = useState(false);
  const [text, setText] = useState('Selecione uma data');

  const onChangeDate = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || date;

    setShowCalender(false)
    setDate(currentDate)

    const tempDate = new Date(currentDate)
    const newDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

    setText(newDate)
  }

  const showMode = () => {
    setShowCalender(true);
  }

  return (
    <>
      <S.SelectDate onPress={showMode}>
        <S.TextSelect>{text}</S.TextSelect>
      </S.SelectDate>

      {showCalender && (
        <DateTimePicker
          value={date}
          onChange={onChangeDate}
        />
      )}
    </>
  )
}
