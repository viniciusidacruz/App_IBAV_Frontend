import React, { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableOpacity } from 'react-native';
import { LogoComponent } from '../../components/Logo';
import { TitleComponent } from '../../components/Title';
import { HeaderComponent } from '../../components/Header';
import { SelectOptionsComponent } from '../../components/SelectOptions';

import { AppProps } from '../../routes/types/app';

import * as S from './styles';
import useAuth from '../../hooks/useAuth';

export function HomeScreen({ navigation }: AppProps) {
  const { user } = useAuth();

  useEffect(() => {
    if(!user) {
      navigation.navigate('SignIn')
    }
  }, []);
  
  const logout = async () => {
    navigation.navigate('SignIn')
    await AsyncStorage.removeItem('@storage_User')
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
            onPress={() => navigation.navigate('SendReport')}
          />
          <SelectOptionsComponent
            icon={<S.MembersIcon name="user-friends" />}
            title="Membros"
            onPress={() => navigation.navigate('Members')}
          />
          <SelectOptionsComponent
            icon={<S.RegisterIcon name="user-plus" />}
            title="Cadastrar"
            onPress={() => navigation.navigate('Register')}
          />
        </S.ContentOptions>
      </S.Content>
    </>
  );
}
