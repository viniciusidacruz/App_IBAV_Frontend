import React, { Fragment } from 'react';
import { Text } from 'react-native';

import { HeaderComponent } from '../../components/Header';
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from '../../components/Button';
import { NotificationComponent } from '../../components/Notification';

import { AppProps } from '../../routes/types/app';

import * as S from './styles';

export function MembersScreen({ navigation }: AppProps) {

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate("Home")} />
        <S.Navigation>Membros</S.Navigation>
        <ButtonComponent title="Cadastrar" onPress={()=>{}} small icon={<S.RegisterIcon name="user-plus" />}/>
        <NotificationComponent />
      </HeaderComponent>
    </Fragment>
  );
}
