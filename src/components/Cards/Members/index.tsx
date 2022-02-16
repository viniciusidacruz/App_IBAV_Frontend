import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

import * as S from "./styles";

export function CardMembersComponent({ data }: any) {
  const [presentCelula, setCelulaPresent] = useState("F");
  const [presentCulto, setPresentCulto] = useState("-");

  const maxName = data && data.nome.substring(0, 20);

  return (
    <S.Content>
      <S.ContentName>
        <S.InfoName>{maxName}...</S.InfoName>
      </S.ContentName>

      <S.ContainerSelect>
        <S.ContentPresent>
          <S.Select
            style={{ width: 45 }}
            selectedValue={presentCelula}
            onValueChange={(value, index) => {
              setCelulaPresent(value);
            }}
          >
            <>
              <Picker.Item label="F" value="F" />
              <Picker.Item label="P" value="P" />
              <Picker.Item label="D" value="D" />
              <Picker.Item label="T" value="T" />
              <Picker.Item label="V" value="V" />
            </>
          </S.Select>
        </S.ContentPresent>

        <S.ContentPresent>
          <S.Select
            style={{ width: 45 }}
            selectedValue={presentCulto}
            onValueChange={(value, index) => {
              setPresentCulto(value);
            }}
          >
            <Picker.Item label="F" value="F" />
            <Picker.Item label="P" value="P" />
            <Picker.Item label="D" value="D" />
            <Picker.Item label="T" value="T" />
            <Picker.Item label="V" value="V" />
          </S.Select>
        </S.ContentPresent>
      </S.ContainerSelect>
    </S.Content>
  );
}
