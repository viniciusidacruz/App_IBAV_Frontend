import React, { useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { authentication } from '../../config/firebase';

import { LogoComponent } from '../../components/Logo';
import { TitleComponent } from '../../components/Title';
import { ButtonComponent } from '../../components/Button';
import { InputFieldComponent } from '../../components/InputField';

import * as S from './styles';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        redirect.navigate('Home');
      }
    });

    return unsubscribe;
  }, []);

  const SignInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        const user = response.user;
        console.log('Logged in with: ', user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SignUpUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        const user = response.user;

        console.log('Registered with: ', user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <S.Container source={require('../../assets/background.png')}>
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
            <ButtonComponent title="Entrar" onPress={SignInUser} />
            <ButtonComponent title="Register" onPress={SignUpUser} />
          </S.Buttons>
        </S.Content>
      </S.Form>
    </S.Container>
  );
}
