import React, { useState, useEffect, Fragment } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { ButtonComponent } from "../../components/Button";
import { NotificationComponent } from "../../components/Notification";
import { PersonLabelComponent } from "../../components/PersonLabel";

import { useFormReport } from "../../hooks/useFormReport";
const loadingGif = require("../../assets/loader-two.gif");
import { FormReportActions } from "../../contexts/FormReport";
import { connectApi } from "../../common/services/ConnectApi";
import MenuNavigation from "../../common/constants/navigation";

import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function MembersScreen(this: any, { navigation }: AppProps) {
  const [user, setUser] = useState<any>();
  const [members, setMembers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [celulas, setCelulas] = useState<any>();

  const { state, dispatch } = useFormReport();

  const selectedOptionCelula = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectCelula,
      payload: value,
    });
  };

  const handleCelulaChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: value,
    });
  };

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

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate("Home")} />
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
            {celulas &&
              celulas.length > 0 &&
              Object.values(celulas[0][1].membros).map((item: any) => (
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
