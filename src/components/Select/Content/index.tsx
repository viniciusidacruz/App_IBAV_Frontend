import React from "react";
import { ScrollView } from "react-native";

import { IContentSelect } from "./types";

import * as S from "./styles";

export function ContentSelect({ changeModalVisibility, onChange, selectedOption }: IContentSelect) {

  const selectOption = (option: any) => {
    changeModalVisibility(false);
    onChange(option)
    selectedOption(option)
  };

  const data = ["red", "blue", "yellow", "green", "orange"];

  const option = data.map((item, index) => {
    return (
      <S.Options key={index} onPress={() => selectOption(item)}>
        <S.OptionSelect>{item}</S.OptionSelect>
      </S.Options>
    );
  });

  return (
    <S.Content onPress={() => changeModalVisibility(false)}>
      <S.Container>
        <S.ContentOptions>
          <ScrollView>{option}</ScrollView>
        </S.ContentOptions>
      </S.Container>
    </S.Content>
  );
}
