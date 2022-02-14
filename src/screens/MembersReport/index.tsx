import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { ButtonComponent } from '../../components/Button';
import { HeaderComponent } from '../../components/Header';
import { ComeBackComponent } from '../../components/ComeBack';
import { FooterInfoComponent } from '../../components/FooterInfo';
import { ModalComponent } from '../../components/Modal';
import { NotificationComponent } from '../../components/Notification';
import { CardMembersComponent } from '../../components/Cards/Members';
import { HeadingPresentComponent } from '../../components/HeadingPresent';

import { connectApi } from '../../common/services/ConnectApi';
import { AppProps } from '../../routes/types/app';

import * as S from './styles'
import { ReportContentModalComponent } from '../../components/Modal/Report';

export function MembersReportScreen({ navigation }: AppProps) {
  const [members, setMembers] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const teste = [
    { nome: "Caio Silva Barbara", status: "Aprovado", id: 1 },
    { nome: "Julia Silva Barbara", status: "Aprovado", id: 2 },
    { nome: "Andrea Silva Barbara", status: "Aprovado", id: 3 },
    { nome: "Beatriz Barbara da Cruz", status: "Aprovado", id: 4 },
    { nome: "Vinicius Italo da Cruz", status: "Aprovado", id: 5 },
    { nome: "Mauricio", status: "Aguardando Aprovação", id: 6 }
  ];

  useEffect(() => {
    const ID_CELULAS = '-Mve6Q42f4wIHHdTQLuu'

    connectApi.get(`celulas/${ID_CELULAS}/membros.json`)
      .then((response) => {
        setMembers(response.data)
      })
  }, []);


  return (
    <>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate('SendReport')} />
        <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
          <S.Navigation>
            Dados
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MembersReport")}>
          <S.Navigation
            style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
          >
            Membros
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("VisitorsReport")}>
          <S.Navigation>Visitantes</S.Navigation>
        </TouchableOpacity>
        <NotificationComponent />
      </HeaderComponent>

      <S.Content>
        <HeadingPresentComponent />

        <FlatList
          data={teste}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CardMembersComponent data={item} />}
        />

        <FooterInfoComponent />

        <S.Button>
          <ButtonComponent title="Entregar relatório" onPress={handleOpenModal} />
        </S.Button>
      </S.Content>

      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ReportContentModalComponent handleCloseModal={handleCloseModal} />
      </ModalComponent>
    </>
  );
}
