import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import MenuNavigation from '../../common/constants/navigation'

import { HeaderComponent } from '../../components/Header';
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from '../../components/Button';
import { NotificationComponent } from '../../components/Notification';
import { PersonLabelComponent } from '../../components/PersonLabel';

import { AppProps } from '../../routes/types/app';
import * as S from './styles';
import { connectApi } from '../../common/services/ConnectApi';
import { GridItem } from '../Register/styles';
const loadingGif = require("../../assets/loader-two.gif");

export function MembersScreen(this: any, { navigation }: AppProps) {
  const [user, setUser] = useState<any>();
  const [members, setMembers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [celulas, setCelulas] = useState<any>();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_dataUser");

      if (user) {
        setUser(JSON.parse(user));
      }
    };
    checkUser();
  }, []);

  const identifyCelula = user && user[0][1].numero_celula;

  useEffect(() => {
    const filterMembers =
      members &&
      members.filter((item: any) => {
        return item[1].celula === identifyCelula;
      });

    if (filterMembers) {
      setCelulas(filterMembers);
      AsyncStorage.setItem("@storage_members", JSON.stringify(filterMembers));
    }
  }, [identifyCelula, members]);

  useEffect(() => {
    setLoading(true);
    connectApi.get("celulas.json").then((response) => {
      setLoading(false);
      setMembers(Object.entries(response.data));
    });
  }, []);

  function sendInformation() {
    navigation.navigate("MembersRegister")
  }

  return (
    <>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate("Home")} />
        <S.Navigation>{MenuNavigation.MEMBERS}</S.Navigation>
        <ButtonComponent title="Cadastrar" onPress={() => { }} small icon={<S.RegisterIcon name="user-plus" />} />
        <NotificationComponent />
      </HeaderComponent>
      <S.Container>
      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <>
        {celulas && celulas.length > 0 && Object.values(celulas[0][1].membros).map((item: any) => (
          <>
          {console.log(item, 'item')}
            <PersonLabelComponent 
              nome={item.nome} 
              status={item.status} 
              onPress={() => navigation.navigate('MembersRegister', {
                nome: `${item.nome}`,
                telefone: `${item.telefone}`,
                email: `${item.email}`,
                endereco: `${item.endereco}`,
                bairro: `${item.bairro}`,
                cep: `${item.cep}`,
                cidade: `${item.cidade}`
                })}/>
          </>
        ))}
        </>
        )}
      </S.Container>

    </>
  );
}
