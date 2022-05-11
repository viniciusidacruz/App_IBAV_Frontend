import React, { useState, useEffect, Fragment } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeaderComponent } from "../../components/Header";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { PersonLabelComponent } from "../../components/PersonLabel";
import { NotificationComponent } from "../../components/Notification";

const loadingGif = require("../../assets/loader-two.gif");

import { useFetch } from "../../hooks/useFetch";
import useUserFiltered from "../../hooks/useUserFiltered";
import { GetStorage } from "../../common/constants/storage";
import MenuNavigation from "../../common/constants/navigation";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";
import { ModalComponent } from "../../components/Modal";
import { RequestContentModalComponent } from "../../components/Modal/Request";
import { connectApi } from "../../common/services/ConnectApi";
import { ApprovalRequest } from "../../components/Modal/ApprovalRequest";

export function MembersScreen(this: any) {
  const [members, setMembers] = useState<any>([]);
  const [sendModal, setSendModal] = useState(false);
  const [modalConcluded, setModalConcluded] = useState(false)
  const [name, setName] = useState<string>();
  const [id, setId] = useState<any>();

  const { data: celulas, isFetching: loading } = useFetch("celulas.json");
  const { user } = useUserFiltered();
  const navigation = useNavigation<IPropsAppStack>();

  const identifyCelula = user && user[0][1].numero_celula;

  useEffect(() => {
    const filterMembers =
      celulas &&
      celulas.filter((item: any) => {
        return item[1].celula === identifyCelula;
      });

    if (filterMembers) {
      setMembers(filterMembers);
      AsyncStorage.setItem(
        GetStorage.MEMBERS_FILTERED,
        JSON.stringify(filterMembers)
      );
    }

  }, [identifyCelula, celulas]);

  const idCelula = members && members.length > 0 && Object.entries(members[0])[0][1]

  const timeModal = () => {
    setModalConcluded(true)
  }

  const waitingDeletion = async () => {
    try {
      await connectApi.patch(`/celulas/${idCelula}/membros/${id}.json`, {
        aguardando_exclusao: true
      })
        .then(() => {
          setSendModal(false)
          setTimeout(timeModal, 300)
        })
    } catch (err) {
      alert(err)
    }
  }


  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <S.Navigation>{MenuNavigation.MEMBERS}</S.Navigation>
        <ButtonComponent
          title="Cadastrar"
          onPress={() => { }}
          width='136px' 
          heigth='33px'
          size='12px' 
          icon="user-plus"
        />
        <NotificationComponent />
      </HeaderComponent>
      <ScrollView>
        <S.Container>
          {loading ? (
            <S.Loading source={loadingGif} />
          ) : (
            <Fragment>
              {members &&
                members.length > 0 &&
                Object.entries(members[0][1].membros).map((item: any) => {
                  return (
                    <Fragment>
                      <PersonLabelComponent
                        nome={item[1].nome}
                        status={item[1].status}
                        onPress={() =>
                          navigation.navigate("MemberInformation", {
                            nome: `${item[1].nome}`,
                            telefone: `${item[1].telefone}`,
                            email: `${item[1].email}`,
                            endereco: `${item[1].endereco}`,
                            bairro: `${item[1].bairro}`,
                            cep: `${item[1].cep}`,
                            cidade: `${item[1].cidade}`,
                            estado: `${item[1].estado}`,
                            estado_civil: `${item[1].estado_civil}`,
                            data_de_nascimento: `${item[1].data_de_nascimento}`,
                            status: `${item[1].status}`,
                            numero_casa: `${item[1].numero_casa}`,
                          })
                        }
                        delMember={() => {
                          setSendModal(true),
                            setName(item[1].nome),
                            setId(item[0])
                        }}
                      />
                    </Fragment>
                  );
                })}
            </Fragment>
          )}
        </S.Container>
      </ScrollView>
      <ModalComponent
        isVisible={sendModal}
        onBackdropPress={() => setSendModal(false)}
      >
        <RequestContentModalComponent
          name={name}
          cancel={() => setSendModal(false)}
          confirm={() => {
            waitingDeletion()
          }}
        />
      </ModalComponent>
      <ModalComponent
        isVisible={modalConcluded}
        onBackdropPress={() => setModalConcluded(false)}
      >
        <ApprovalRequest name={name} />
      </ModalComponent>
    </Fragment>
  );
}
