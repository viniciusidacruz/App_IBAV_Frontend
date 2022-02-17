import React, { useState } from "react";

import * as S from "./styles";

export function CardMembersComponent({ data }: any) {
  console.log('Esse é o data', data);

  return (
    <S.Content>
      <S.ContentName>
        <S.InfoName>{data && data.lenght > 20 ? '...' : ''}</S.InfoName>
      </S.ContentName>

      <S.ContainerSelect>
        <S.ContentPresent>

        </S.ContentPresent>
      </S.ContainerSelect>
    </S.Content>
  );
}
