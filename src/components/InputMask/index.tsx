import React from "react";
import { TextInputProps } from "react-native";

import { maskCep, maskPhone, maskCurrency } from "../../common/utils/masks";

import * as S from './styles'

interface InputProps extends TextInputProps {
  mask: "cep" | "phone" | "currency";
  inputMaskChange: any;
  primary?: boolean;
}

export const InputMaskComponent: React.FC<InputProps> = ({ mask, inputMaskChange, primary, ...rest }) => {
  function handleChange(text: string) {
    if (mask === "cep") {
      const value = maskCep(text);
      inputMaskChange(value);
    }
    if (mask === "phone") {
      const value = maskPhone(text);
      inputMaskChange(value);
    }
    if (mask === "currency") {
      const value = maskCurrency(text);
      inputMaskChange(value);
    }
  }

  return (
    <S.Field>
      <S.Input
        onChangeText={(text) => handleChange(text)}
        primary={primary}
        {...rest}
      />
    </S.Field>
  );
};
