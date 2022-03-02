import React, {useState} from 'react';
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from 'react-native';

import { HeaderComponent } from '../../components/Header';
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from '../../components/Button';
import { NotificationComponent } from '../../components/Notification';
import { PersonLabelComponent } from '../../components/PersonLabel';

import { AppProps } from '../../routes/types/app';
import * as S from './styles';

export function MembersScreen(this: any, { navigation }: AppProps) {
  const [selectedValue, setSelectedValue] = useState(['']);

  return (
    <>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate("Home")} />
        <S.Navigation>Membros</S.Navigation>
        <ButtonComponent title="Cadastrar" onPress={()=>{}} small icon={<S.RegisterIcon name="user-plus" />}/>
        <NotificationComponent />
      </HeaderComponent>
      <S.Container>
        <PersonLabelComponent nome='CAIO SILVA BARBARA' status={1} categoria='MEMBRO'/>
        <PersonLabelComponent nome='CAIO SILVA BARBARA' status={2} categoria='FREQUENTADOR ASSIDUO'/>
        <PersonLabelComponent nome='CAIO SILVA BARBARA' status={3} categoria='VISITANTE'/>
        <PersonLabelComponent nome='CAIO SILVA BARBARA' status={4} categoria='AGUARDANDO APROVAÇÃO'/>
      </S.Container>

    </>
  );
}
