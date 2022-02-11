import React from "react";
import { Text } from "react-native";

import { HeaderComponent } from "../../components/Header";

const loadingGif = require("../../assets/loading.gif");

import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function PreloadScreen({ navigation }: AppProps) {
  return (
    <S.Container>
      <S.Loading source={loadingGif} />
    </S.Container>
  );
}
