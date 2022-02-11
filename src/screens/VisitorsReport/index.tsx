import Reac from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { HeaderComponent } from '../../components/Header';

import { AppProps } from '../../routes/types/app';

export function VisitorsReportScreen({ navigation }: AppProps) {

  return (
    <>
      <HeaderComponent>
          <TouchableOpacity
            onPress={() => navigation.navigate('SendReport')}
          >
            <Text>Dados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MembersReport')}
          >
            <Text>Membros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('VisitorsReport')}
          >
            <Text>Visitantes</Text>
          </TouchableOpacity>
      </HeaderComponent>
    </>
  );
}
