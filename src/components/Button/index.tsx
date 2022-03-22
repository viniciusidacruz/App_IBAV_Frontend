import React from "react";

import { IContentProps } from "./types";

import * as S from "./styles";

export function ButtonComponent({
  title,
  onPress,
  small,
  icon,
  disabled,
  onPressIn,
}: IContentProps) {
  return (
    <S.Content
      onPress={onPress}
      small={small}
      disabled={disabled}
      onPressIn={onPressIn}
    >
      <S.Background small={small}>
        <S.BoxIcon icon={icon}>{icon}</S.BoxIcon>
        <S.Title small={small}>{title}</S.Title>
      </S.Background>
    </S.Content>
  );
}
