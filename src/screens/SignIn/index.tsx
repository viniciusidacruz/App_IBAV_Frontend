import React, { useState } from "react";
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { ButtonComponent } from "../../components/Button";
import { InputFieldComponent } from "../../components/InputField";

import * as S from "./styles";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
   
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        createUser(user.uid)
        alert("Conta criada com sucesso!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert(
            "Este e-mail já está em uso. Cadastre um novo email!"
          );
        }

        if (error.code === "auth/invalid-email") {
          alert(
            "Este e-mail está invalido!"
          );
        }

        if (error.code === "auth/weak-password") {
          alert(
            "Esta senha está invalida!"
          );
        }
      });
  };

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        const userStore = JSON.stringify(user);        

        AsyncStorage.setItem("@storage_User", userStore);

        console.log(userStore);
        

        redirect.navigate("Home");
      })
      .catch((error) => {
        if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          alert('Email/Senha não encontrado!');
        }
        
      });
  };

  const createUser = (id: string) => {
    axios.post('https://authentication-ibav-2ba41-default-rtdb.firebaseio.com/users.json', {
      email,
      senha: password,
      id
    }).then((res: any) => {
      console.log('Esse é o res', res);
    });
  }

  return (
    <S.Container source={require("../../assets/background.png")}>
      <S.Form>
        <LogoComponent />

        <S.Content>
          <S.Heading>
            <TitleComponent title="Login" uppercase large weight />
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
              icon
              secureTextEntry
              placeholderTextColor="white"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </S.Field>
          <S.Buttons>
            <ButtonComponent title="Entrar" onPress={handleSignIn} />
            <ButtonComponent title="Register" onPress={handleCreateAccount} />
          </S.Buttons>
        </S.Content>
      </S.Form>
    </S.Container>
  );
}
