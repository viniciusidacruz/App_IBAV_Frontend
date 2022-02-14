import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadingGif = require("../../assets/loading.gif");

import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function PreloadScreen({ navigation }: AppProps) {
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_User");

      if (user) {
        navigation.navigate('Home')
      } else {
        navigation.navigate('SignIn')
      }
    }

    checkUser();
  }, []);

  return (
    <S.Container>
      <S.Loading source={loadingGif} />
    </S.Container>
  );
}
