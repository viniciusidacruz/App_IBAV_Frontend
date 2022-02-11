import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { HeaderComponent } from '../../components/Header';

const data = [
  { title: 'Dados', path: 'SendReport' },
  { title: 'Membros', path: 'MembersReport' },
  { title: 'Visitantes', path: 'VisitorsReport' },
];

export function VisitorsReportScreen() {
  const redirect = useNavigation();

  return (
    <>
      <HeaderComponent>
        {data.map((item) => (
          <TouchableOpacity
            key={item.title}
            onPress={() => redirect.navigate(item.path)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </HeaderComponent>
    </>
  );
}
