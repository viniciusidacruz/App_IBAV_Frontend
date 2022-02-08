import React, { useState } from 'react';

import { LogoComponent } from '../../components/Logo';
import { TitleComponent } from '../../components/Title';
import { ButtonComponent } from '../../components/Button';
import { InputFieldComponent } from '../../components/InputField';

import * as S from './styles';
import { Text } from 'react-native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit() {
    try {
      const data = {
        email,
        password,
      };

      console.log(data);
    } catch (error) {}
  }

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
            />
          </S.Field>

          <S.Field>
            <InputFieldComponent
              placeholder="Senha"
              icon
              secureTextEntry
              placeholderTextColor="white"
              onChangeText={(value) => setPassword(value)}
            />
          </S.Field>
          <S.Buttons>
            <ButtonComponent title="Entrar" onPress={() => onSubmit()} />
          </S.Buttons>
        </S.Content>
      </S.Form>
    </S.Container>
  );
}
