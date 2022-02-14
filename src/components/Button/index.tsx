import React from 'react';

import { IContentProps } from './types';

import * as S from './styles';

export function ButtonComponent({ title, onPress, small }: IContentProps) {
  return (
    <S.Content onPress={onPress} small={small}>
      <S.Background small={small}>
        <S.Title small={small}>{title}</S.Title>
      </S.Background>
    </S.Content>
  );
}
