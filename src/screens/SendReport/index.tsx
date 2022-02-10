import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HeaderComponent } from '../../components/Header';
import { ComeBackComponent } from '../../components/ComeBack';
import { NotificationComponent } from '../../components/Notification';

import * as S from './styles';
import { TitleComponent } from '../../components/Title';
import { InputFieldComponent } from '../../components/InputField';

export default function SendReportScreen() {
  const [offer, setOffer] = useState('');
  const [observation, setObservation] = useState('');

  const redirect = useNavigation();

  return (
    <>
      <HeaderComponent>
        <ComeBackComponent onPress={() => redirect.navigate('Home')} />
        <TouchableOpacity onPress={() => redirect.navigate('SendReport')}>
          <S.Navigation
            style={{ borderBottomColor: 'white', borderBottomWidth: 2 }}
          >
            Dados
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => redirect.navigate('MembersReport')}>
          <S.Navigation>Membros</S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => redirect.navigate('VisitorsReport')}>
          <S.Navigation>Visitantes</S.Navigation>
        </TouchableOpacity>
        <NotificationComponent />
      </HeaderComponent>

      <S.Content>
        <S.Grid>
          <TitleComponent title="Célula:" small primary />
          <S.ContentC>
            <S.IconC name="user-friends" />
            <S.DescriptionC>008-Radicais livres</S.DescriptionC>
          </S.ContentC>
        </S.Grid>

        <S.Grid>
          <TitleComponent title="Oferta R$:" small primary />
          <S.ContentC>
            <S.IconC name="file-invoice-dollar" />
            <InputFieldComponent
              primary
              placeholderTextColor="grey"
              onChangeText={(value) => setOffer(value)}
            />
          </S.ContentC>
        </S.Grid>

        <S.Grid>
          <TitleComponent title="Data:" small primary />
        </S.Grid>

        <S.Grid>
          <TitleComponent title="Observações:" small primary />
          <S.Observations
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setObservation(text)}
          />
        </S.Grid>
      </S.Content>
    </>
  );
}
