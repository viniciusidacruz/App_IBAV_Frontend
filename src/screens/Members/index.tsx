import React from 'react';
import { Text } from 'react-native';

import { HeaderComponent } from '../../components/Header';

import { AppProps } from '../../routes/types/app';

import * as S from './styles';

export function MembersScreen({ navigation }: AppProps) {

  return (
    <>
      <HeaderComponent>
      </HeaderComponent>

      <>
       <Text>Members</Text>
      </>
    </>
  );
}
