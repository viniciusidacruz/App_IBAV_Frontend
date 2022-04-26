import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { SelectComponent } from '../../Select'

import { IDataPros } from "./types";

import * as S from "./styles";

export function CardMembersComponent({ data, setSelectPerson }: IDataPros) {
  const presenca = [
    {
      label: "F",
      value: "F"
    },
    {
      label: "P",
      value: "P"
    },
    {
      label: "D",
      value: "D"
    },
    {
      label: "T",
      value: "T"
    },
    {
      label: "V",
      value: "V"
    }
  ]

  const [presencaCelula, setPresencaCelula] = useState("-");
  const [presencaCulto, setPresencaCulto] = useState("-");

  const handlePresentCelula = (value: string) => {
    setSelectPerson({ ...data, celula: value })
    setPresencaCelula(value)
  };

  const handlePresentCulto = (value: string) => {
    setSelectPerson({ ...data, culto: value })
    setPresencaCulto(value)
  };

  return (
    <S.Content>
      <S.ContentName>
        <S.InfoName>{data.nome}</S.InfoName>
      </S.ContentName>

      <S.ContainerSelect>
        <S.BoxSelect>
          <SelectComponent
            onChange={handlePresentCelula}
            selectedOption={handlePresentCelula}
            labelSelect={presencaCelula}
            dataOptions={presenca}
            small
          />
        </S.BoxSelect>
        <S.BoxSelect>
          <SelectComponent
            onChange={handlePresentCulto}
            selectedOption={handlePresentCulto}
            labelSelect={presencaCulto}
            dataOptions={presenca}
            small
          />
        </S.BoxSelect>
      </S.ContainerSelect>
    </S.Content>
  );
}
