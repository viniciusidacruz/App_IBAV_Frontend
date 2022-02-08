import React from "react";

const Logo = require("../../assets/logo.png");
const LogoFull = require("../../assets/logo-full.png");

import { ISizeLogoProps } from "./types";

import * as S from "./styles";

export function LogoComponent({ full }: ISizeLogoProps) {
  return (
    <S.Container>
      {full ? <S.LogoFull source={LogoFull} /> : <S.LogoImage source={Logo} />}
    </S.Container>
  );
}
