import React, { useState } from 'react';
import { Text } from 'react-native';

import { HeaderComponent } from '../../components/Header';
import { InputFieldComponent } from '../../components/InputField';

import { AppProps } from '../../routes/types/app';

export function RegisterScreen({ navigation }: AppProps) {
  const [name, setName] = useState('')

  return (
    <>
      <HeaderComponent>
        <Text>Register</Text>
      </HeaderComponent>

      <InputFieldComponent
              primary
              value={name}
              placeholder="*Nome"
              onChangeText={(value) => setName(value)}
            />
    </>
  );
}
