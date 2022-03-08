import React, { useState } from "react";
import Modal from "react-native-modal";

import { ContentSelect } from "./Content";

import { ILabelProps } from "./types";

import * as S from "./styles";

export function SelectComponent({ label }: ILabelProps) {
  const [chooseData, setChooseData] = useState("Selecione");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = (prev: boolean) => {
    setIsModalVisible(prev);
  };

  const setData = (option: string) => {
    setChooseData(option);
  };

  return (
    <S.Content>
      <S.LabelField>{label}</S.LabelField>
      <S.Container onPress={() => changeModalVisibility(true)}>
        <S.Field>
          <S.Label>{chooseData}</S.Label>
        </S.Field>
        <S.Icons>
          {isModalVisible ? (
            <S.Icon name="arrow-drop-up" />
          ) : (
            <S.Icon name="arrow-drop-down" />
          )}
        </S.Icons>
      </S.Container>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => changeModalVisibility(false)}
      >
        <ContentSelect
          changeModalVisibility={changeModalVisibility}
          setData={setData}
        />
      </Modal>
    </S.Content>
  );
}
