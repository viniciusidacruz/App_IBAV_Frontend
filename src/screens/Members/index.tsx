import React, { useState, useEffect, Fragment } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from "../../components/Button";
import { NotificationComponent } from "../../components/Notification";
import { PersonLabelComponent } from "../../components/PersonLabel";

const loadingGif = require("../../assets/loader-two.gif");

import { useFetch } from "../../hooks/useFetch";
import { IPropsAppStack } from "../../routes/AppStack/types";
import MenuNavigation from "../../common/constants/navigation";

import * as S from "./styles";

export function MembersScreen(this: any) {
  const [user, setUser] = useState<any>();
  const [members, setMembers] = useState<any>([]);

  const { data: celulas, isFetching: loading } = useFetch("celulas.json");

  const navigation = useNavigation<IPropsAppStack>();

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
      celulas &&
      celulas.filter((item: any) => {
        return item[1].celula === identifyCelula;
      });

    if (filterMembers) {
      setMembers(filterMembers);
      AsyncStorage.setItem("@storage_members", JSON.stringify(filterMembers));
    }
  }, [identifyCelula, celulas]);

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <S.Navigation>{MenuNavigation.MEMBERS}</S.Navigation>
        <ButtonComponent
          title="Cadastrar"
          onPress={() => {}}
          small
          icon={<S.RegisterIcon name="user-plus" />}
        />
        <NotificationComponent />
      </HeaderComponent>
      <S.Container>
        {loading ? (
          <S.Loading source={loadingGif} />
        ) : (
          <Fragment>
            {members &&
              members.length > 0 &&
              Object.values(members[0][1].membros).map((item: any) => (
                <Fragment>
                  <PersonLabelComponent
                    nome={item.nome}
                    status={item.status}
                    onPress={() =>
                      navigation.navigate("MembersRegister", {
                        nome: `${item.nome}`,
                        telefone: `${item.telefone}`,
                        email: `${item.email}`,
                        endereco: `${item.endereco}`,
                        bairro: `${item.bairro}`,
                        cep: `${item.cep}`,
                        cidade: `${item.cidade}`,
                        estado: `${item.estado}`,
                        estado_civil: `${item.estado_civil}`,
                        data_de_nascimento: `${item.data_de_nascimento}`,
                        status: `${item.status}`,
                        numero_casa: `${item.numero_casa}`,
                      })
                    }
                  />
                </Fragment>
              ))}
          </Fragment>
        )}
      </S.Container>
    </Fragment>
  );
}
