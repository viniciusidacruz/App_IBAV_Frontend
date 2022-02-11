import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HeaderComponent } from '../../components/Header';

const data = [
  { title: 'Dados', path: 'SendReport' },
  { title: 'Membros', path: 'MembersReport' },
  { title: 'Visitantes', path: 'VisitorsReport' },
];

export function MembersReportScreen() {
  const redirect = useNavigation();

  return (
    <>
      <HeaderComponent>
        <Text>Teste</Text>
      </HeaderComponent>
    </>
  );
}
