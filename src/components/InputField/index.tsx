import React from "react";
import { Feather } from "@expo/vector-icons";

import { IContentInputProps } from "./types";

import * as S from "./styles";

export function InputFieldComponent({
  icon,
  value,
  primary,
  ...rest
}: IContentInputProps) {
  return (
    <S.Field primary={primary}>
      <S.Input value={value} {...rest} />

      {icon && <Feather name={icon} size={24} color="#000A3E" />}
    </S.Field>
  );
}
