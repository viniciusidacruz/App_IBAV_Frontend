import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogoComponent } from '../../components/Logo';
import { TitleComponent } from '../../components/Title';
import { HeaderComponent } from '../../components/Header';
import { SelectedMenuComponent } from '../../components/SelectedMenu';

import { AppProps } from '../../routes/types/app';
import { connectApi } from '../../common/services/ConnectApi';

import { IUsers } from './types/users';

import * as S from './styles';

export function HomeScreen({ navigation }: AppProps) {
  const [users, setUsers] = useState<IUsers>();
  const [userAuth, setUserAuth] = useState<any>();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_User");

      if (!user) {
        navigation.navigate('SignIn')
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("@storage_User")
      .then((response) => setUserAuth(response))
  }, []);

  useEffect(() => {
    connectApi.get('users.json')
      .then((response) => setUsers(response.data))
  }, []);

  const logout = () => {
    AsyncStorage.removeItem('@storage_User')
    navigation.navigate('SignIn')
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
          <SelectedMenuComponent
            icon={<S.SendReportIcon name="document-text-sharp" />}
            title="Entregar Relatório"
            onPress={() => navigation.navigate('SendReport')}
          />
          <SelectedMenuComponent
            icon={<S.MembersIcon name="user-friends" />}
            title="Membros"
            onPress={() => navigation.navigate('Members')}
          />
          <SelectedMenuComponent
            icon={<S.RegisterIcon name="user-plus" />}
            title="Cadastrar"
            onPress={() => navigation.navigate('Register')}
          />
        </S.ContentOptions>
      </S.Content>
    </>
  );
}
