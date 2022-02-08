import React from 'react';

import { IContentProps } from './types';

import * as S from './styles';

export function ButtonComponent({ title, onPress }: IContentProps) {
  return (
    <S.Content onPress={onPress}>
      <S.Background>
        <S.Title>{title}</S.Title>
      </S.Background>
    </S.Content>
  );
}
