import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { AppProps } from "../../routes/types/app";
import { firebaseConfig } from "../../config/firebase";
import ButtonsText from "../../common/constants/buttons";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { ButtonComponent } from "../../components/Button";
import { InputFieldComponent } from "../../components/InputField";

import * as S from "./styles";

export function SignInScreen({ navigation }: AppProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        const userStore = JSON.stringify(user);

        AsyncStorage.setItem("@storage_User", userStore);
      })
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          alert("Email/Senha não encontrado!");
        }
      });
  };

  return (
    <S.Container source={require("../../assets/background.png")}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Form behavior="position" enabled>
          <S.Heading>
            <LogoComponent />
          </S.Heading>

          <S.Content>
            <S.Heading>
              <TitleComponent title="Entrar" uppercase large weight />
            </S.Heading>

            <S.Field>
              <InputFieldComponent
                placeholder="Usuário"
                placeholderTextColor="white"
                onChangeText={(value) => setEmail(value)}
                value={email}
              />
            </S.Field>

            <S.Field>
              <InputFieldComponent
                placeholder="Senha"
                secureTextEntry
                placeholderTextColor="white"
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </S.Field>
            <S.Buttons>
              <ButtonComponent
                title={ButtonsText.ENTER}
                onPress={handleSignIn}
              />
            </S.Buttons>
          </S.Content>
        </S.Form>
      </TouchableWithoutFeedback>
    </S.Container>
  );
}
