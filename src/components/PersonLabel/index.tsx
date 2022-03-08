import React, { useState } from 'react';
import * as S from './styles';
import { IPersonProps } from './types';

export function PersonLabelComponent({
  nome,
  status, 
  categoria, 
  onPress
}: IPersonProps) {
  return (
    <S.Box>
        <S.ContainerPerson onPress={onPress}>
                <S.TextName>{nome}</S.TextName>
                <S.BoxStatus status={status}>
                  <S.TextStatus >{categoria}</S.TextStatus>
                </S.BoxStatus>
        </S.ContainerPerson>
        <S.Icon name="trash"/>
    </S.Box>
  );
}
