import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { TouchableOpacity } from 'react-native';
import { LogoComponent } from '../../components/Logo';
import { TitleComponent } from '../../components/Title';
import { HeaderComponent } from '../../components/Header';

import * as S from './styles';
import { SelectOptionsComponent } from '../../components/SelectOptions';

export function HomeScreen() {
  const redirect = useNavigation();

  const logout = () => {
    redirect.navigate('SignIn');
  };

  return (
    <>
      <HeaderComponent>
        <LogoComponent full />

        <TouchableOpacity onPress={logout}>
          <S.Logout name="logout" />
        </TouchableOpacity>
      </HeaderComponent>

      <S.Content>
        <S.Names>
          <TitleComponent
            title="Felipe Paulino Ribeiro"
            medium
            uppercase
            primary
            weight
          />
          <TitleComponent title="Lider de Célula" decoration red />
        </S.Names>

        <S.Info>
          <TitleComponent title="Célula" decoration red weight uppercase />
          <TitleComponent
            title="0008 - Radicais livres"
            small
            uppercase
            primary
          />
        </S.Info>

        <S.ContentOptions>
          <SelectOptionsComponent
            icon={<S.SendReportIcon name="document-text-sharp" />}
            title="Entregar Relatório"
            onPress={() => redirect.navigate('SendReport')}
          />
          <SelectOptionsComponent
            icon={<S.MembersIcon name="user-friends" />}
            title="Membros"
            onPress={() => redirect.navigate('SendReport')}
          />
          <SelectOptionsComponent
            icon={<S.RegisterIcon name="user-plus" />}
            title="Cadastrar"
            onPress={() => redirect.navigate('SendReport')}
          />
        </S.ContentOptions>
      </S.Content>
    </>
  );
}
