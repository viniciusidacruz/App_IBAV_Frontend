import React from 'react';
import { Text } from 'react-native';

import { HeaderComponent } from '../../components/Header';

import { AppProps } from '../../routes/types/app';

export function RegisterScreen({ navigation }: AppProps) {

  return (
    <>
      <HeaderComponent>
        <Text>Register</Text>
      </HeaderComponent>
    </>
  );
}
