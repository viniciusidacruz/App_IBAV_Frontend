import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import * as S from "./styles";
import { IDataPros } from "./types";

export function CardMembersComponent({ data }: IDataPros) {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <S.Content>
      <S.ContentName>
        <S.InfoName>{data.nome}</S.InfoName>
      </S.ContentName>

      <S.ContainerSelect>
        <Picker
          selectedValue={selectedLanguage}
          style={{ height: 50, width: 100, backgroundColor: "red" }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="F" value="java" />
          <Picker.Item label="P" value="js" />
        </Picker>

        <Picker
          selectedValue={selectedLanguage}
          style={{ height: 50, width: 50 }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </S.ContainerSelect>
    </S.Content>
  );
}
