import React from 'react';

import { IContentProps } from './types';

import * as S from './styles';

export function TitleComponent({
  small,
  medium,
  large,
  primary,
  title,
  weight,
  uppercase,
  decoration,
  red,
}: IContentProps) {
  return (
    <>
      {small && (
        <S.Small primary={primary} weight={weight} uppercase={uppercase}>
          {title}
        </S.Small>
      )}
      {medium && (
        <S.Medium primary={primary} weight={weight} uppercase={uppercase}>
          {title}
        </S.Medium>
      )}
      {large && (
        <S.Large primary={primary} weight={weight} uppercase={uppercase}>
          {title}
        </S.Large>
      )}
      {decoration && (
        <S.Decoration red={red} weight={weight} uppercase={uppercase}>
          {title}
        </S.Decoration>
      )}
    </>
  );
}
