import React from 'react';
import { Text } from 'react-native';

import * as S from './styles';
import { IPersonProps } from './types';

export function PersonLabelComponent({nome, status}: IPersonProps) {
  return (
    <S.Box>
        <S.ContainerPerson>
            <S.BoxName>
                <S.TextName>{nome}</S.TextName>
            </S.BoxName>
            <S.BoxStatus>
                <S.TextStatus>MEMBRO</S.TextStatus>
            </S.BoxStatus>
        </S.ContainerPerson>
        <S.Icon name="trash"/>
    </S.Box>
  );
}
