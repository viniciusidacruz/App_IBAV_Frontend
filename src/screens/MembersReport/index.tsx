import React from 'react';
import { Text } from 'react-native';

import { HeaderComponent } from '../../components/Header';

import { AppProps } from '../../routes/types/app';

export function MembersReportScreen({ navigation }: AppProps) {
  return (
    <>
      <HeaderComponent>
        <Text>Teste</Text>
      </HeaderComponent>
    </>
  );
}
