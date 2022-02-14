import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { ModalComponent } from '../../components/Modal';
import { ButtonComponent } from '../../components/Button';
import { HeaderComponent } from '../../components/Header';
import { ComeBackComponent } from '../../components/ComeBack';
import { FooterInfoComponent } from '../../components/FooterInfo';
import { InputFieldComponent } from '../../components/InputField';
import { NotificationComponent } from '../../components/Notification';
import { CardVisitorsComponent } from '../../components/Cards/Visitors';
import { HeadingPresentComponent } from '../../components/HeadingPresent';
import { ReportContentModalComponent } from '../../components/Modal/Report';
import { VisitorContentModalComponent } from '../../components/Modal/Visitor';

import { AppProps } from '../../routes/types/app';

import * as S from './styles'

export function VisitorsReportScreen({ navigation }: AppProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddVisible, setisAddVisible] = useState(false);

  const handleOpenModalReport = () => {
    setModalVisible(true);
  };

  const handleCloseModalReport = () => {
    setModalVisible(false)
  }

  const handleOpenModalAdd = () => {
    if (phone !== '') {
      setisAddVisible(true)
    }
  }

  const teste = [
    { nome: "Caio Silva Barbara", status: "Aprovado", id: 1 },
    { nome: "Julia Silva Barbara", status: "Aprovado", id: 2 },
    { nome: "Andrea Silva Barbara", status: "Aprovado", id: 3 },
    { nome: "Beatriz Barbara da Cruz", status: "Aprovado", id: 4 },
    { nome: "Vinicius Italo da Cruz", status: "Aprovado", id: 5 },
    { nome: "Mauricio", status: "Aguardando Aprovação", id: 6 }
  ];

  return (
    <>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate('MembersReport')} />
        <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
          <S.Navigation>
            Dados
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MembersReport")}>
          <S.Navigation>
            Membros
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("VisitorsReport")}>
          <S.Navigation
            style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
          >
            Visitantes
          </S.Navigation>
        </TouchableOpacity>
        <NotificationComponent />
      </HeaderComponent>

      <S.Content>
        <S.HeadingForm>
          <InputFieldComponent
            primary
            value={name}
            placeholder="*Nome"
            placeholderTextColor="grey"
            onChangeText={(value) => setName(value)}
          />

          <InputFieldComponent
            primary
            placeholder="*Telefone"
            value={phone}
            placeholderTextColor="grey"
            onChangeText={(value) => setPhone(value)}
          />

          <S.FinishForm>
            <S.Info>*Campo obrigatório</S.Info>
            <ButtonComponent title="Adicionar visitante" onPress={handleOpenModalAdd} small />
          </S.FinishForm>
        </S.HeadingForm>

        <HeadingPresentComponent />

        <FlatList
          data={teste}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CardVisitorsComponent data={item} />}
        />

        <FooterInfoComponent />

        <S.Button>
          <ButtonComponent title="Entregar relatório" onPress={handleOpenModalReport} />
        </S.Button>
      </S.Content>

      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ReportContentModalComponent handleCloseModal={handleCloseModalReport} />
      </ModalComponent>

      <ModalComponent
        isVisible={isAddVisible}
        onBackdropPress={() => setisAddVisible(false)}
      >
        <VisitorContentModalComponent setisAddVisible={setisAddVisible} />
      </ModalComponent>
    </>
  );
}
