import React, { useState } from 'react';
import { Text } from 'react-native';

import { HeaderComponent } from '../../components/Header';
import { InputFieldComponent } from '../../components/InputField';

import { AppProps } from '../../routes/types/app';
import FormFields from '../../common/constants/form';

import * as S from './styles'

export function RegisterScreen({ navigation }: AppProps) {
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');

  return (
    <>
      <HeaderComponent>
        <Text>Register</Text>
      </HeaderComponent>

      <S.Form>
        <InputFieldComponent
          primary
          value={name}
          placeholder={`* ${FormFields.FULL_NAME}`}
          onChangeText={(value) => setName(value)}
        />

        <InputFieldComponent
          primary
          value={phone}
          placeholder={`* ${FormFields.PHONE}`}
          onChangeText={(value) => setPhone(value)}
        />

        <InputFieldComponent
          primary
          value={email}
          placeholder={`* ${FormFields.EMAIL}`}
          onChangeText={(value) => setEmail(value)}
        />

        <InputFieldComponent
          primary
          value={address}
          placeholder={`* ${FormFields.ADDRESS}`}
          onChangeText={(value) => setAddress(value)}
        />

        <S.GridForm>
          <S.GridItem>
            <InputFieldComponent
              primary
              value={district}
              placeholder={`* ${FormFields.DISTRICT}`}
              onChangeText={(value) => setDistrict(value)}
            />
          </S.GridItem> 

          <S.GridItem>
            <InputFieldComponent
              primary
              value={cep}
              placeholder={`* ${FormFields.CEP}`}
              onChangeText={(value) => setCep(value)}
            />
          </S.GridItem>
        </S.GridForm>

        <InputFieldComponent
          primary
          value={city}
          placeholder={`* ${FormFields.CITY}`}
          onChangeText={(value) => setCity(value)}
        />
      </S.Form>
    </>
  );
}
