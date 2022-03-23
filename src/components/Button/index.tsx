import React from "react";
import { Feather } from "@expo/vector-icons";

import { IContentProps } from "./types";

import * as S from "./styles";

export function ButtonComponent({
  title,
  small,
  icon,
  ...rest
}: IContentProps) {
  return (
    <S.Content small={small} {...rest}>
      <S.Background small={small}>
        <Feather name={icon} size={24} color="#000A3E" />
        <S.Title small={small}>{title}</S.Title>
      </S.Background>
    </S.Content>
  );
}
