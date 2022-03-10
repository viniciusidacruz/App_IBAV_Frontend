import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DateComponent } from "../../components/Date";
import { ModalComponent } from "../../components/Modal";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputMaskComponent } from "../../components/InputMask";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import { AppProps } from "../../routes/types/app";
import FormFields from "../../common/constants/form";
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";

const loadingGif = require("../../assets/loader-two.gif");

import { IAddress } from "./types";

import * as S from "./styles";

export function RegisterScreen({ navigation }: AppProps) {
  const [address, setAddress] = useState<IAddress>({
    uf: '',
    cep: '',
    ddd: '',
    gia: '',
    ibge: '',
    siafi: '',
    bairro: '',
    logradouro: '',
    localidade: '',
    complemento: '',
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<any>();
  const [members, setMembers] = useState<any>();
  const [celulas, setCelulas] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { state, dispatch } = useFormReport();

  const identifyCelula = user && user[0][1].numero_celula;

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_dataUser");

      if (user) {
        setUser(JSON.parse(user));
      }
    };
    checkUser();
  }, []);

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

  const submitRegister = () => {
    const ID_CELULAS = celulas && celulas[0][0];
    const { cep, bairro, localidade, logradouro } = address;

    try {
      connectApi.post(`/celulas/${ID_CELULAS}/membros.json`, {
        nome: name,
        status: "membro",
        telefone: phone,
        email,
        endereco: logradouro,
        cep,
        bairro,
        cidade: localidade,
        estado: state.stateSelect,
        data_de_nascimento: state.dateRegister,
        estado_civil: state.civilStatusSelect,
      });
      setSuccessModal(true);
    } catch (err) {}
  };

  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || state.dateRegister;

    setShowCalender(false);

    const tempDate = new Date(currentDate);
    const newDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    dispatch({
      type: FormReportActions.setDateRegister,
      payload: currentDate,
    });
    dispatch({
      type: FormReportActions.setTextRegister,
      payload: newDate,
    });
  };

  const showMode = () => {
    setShowCalender(true);
  };

  const handleStateChange = (value: string) => {
    dispatch({
      type: FormReportActions.setStateSelect,
      payload: value,
    });
  };

  const handleCivilStatusChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCivilStatusSelect,
      payload: value,
    });
  };

  const handleCategoryChange = (value: string) => {
    dispatch({
      type: FormReportActions.setCategorySelect,
      payload: value,
    });
  };

  const selectedOptionState = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectState,
      payload: value,
    });
  };

  const selectedOptionCivilStatus = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectCivilStatus,
      payload: value,
    });
  };

  const selectedOptionCategory = (value: string) => {
    dispatch({
      type: FormReportActions.setTextSelectCategory,
      payload: value,
    });
  };

  const getAddressFromApi = useCallback(() => {
    axios.get(`https://viacep.com.br/ws/${address.cep}/json/`)
    .then(response => response.data)
    .then((data: IAddress) => {
      setAddress({
        uf: data.uf,
        ddd: data.ddd,
        gia: data.gia,
        ibge: data.ibge,
        siafi: data.siafi,
        bairro: data.bairro,
        logradouro: data.logradouro,
        localidade: data.localidade,
        complemento: data.complemento,
      })
  }).catch(err => console.log('Erro:', err))
  }, [address.cep]);

  return (
    <>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent onPress={() => navigation.navigate("Home")} />
          <TitleComponent title="Cadastro" small />
        </S.ComeBack>

        <NotificationComponent />
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <S.Container>
          <S.Form>
            <InputFieldComponent
              primary
              value={name}
              placeholder={`* ${FormFields.FULL_NAME}`}
              onChangeText={(value) => setName(value)}
            />

            <InputMaskComponent
              value={phone}
              mask="phone"
              maxLength={14}
              placeholder={`* ${FormFields.PHONE}`}
              inputMaskChange={(value: string) => setPhone(value)}
              primary
            />

            <InputFieldComponent
              primary
              value={email}
              placeholder={FormFields.EMAIL}
              onChangeText={(value) => setEmail(value)}
            />

            <InputFieldComponent
              primary
              value={address.logradouro}
              placeholder={address.logradouro !== '' ? address.logradouro : FormFields.ADDRESS}
              onChangeText={(value) => setAddress((old) => ({
                ...old,
                logradouro: value
              }))}
              editable={address.logradouro === ''}
            />

            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address.bairro}
                  placeholder={address.bairro !== '' ? address.bairro : FormFields.DISTRICT}
                  onChangeText={(value) => setAddress((old) => ({
                    ...old,
                    bairro: value
                  }))}
                  editable={address.bairro === ''}
                />
              </S.GridItem>

              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address.cep}
                  placeholder={FormFields.CEP}
                  onEndEditing={() => getAddressFromApi()}
                  onChangeText={(value) => setAddress((old) => ({
                    ...old,
                    cep: value
                  }))}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address.localidade}
                  placeholder={address.localidade !== '' ? address.localidade : FormFields.CITY}
                  onChangeText={(value) => setAddress((old) => ({
                    ...old,
                    localidade: value
                  }))}
                  editable={address.localidade === ''}
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Estado"
                  onChange={handleStateChange}
                  selectedOption={selectedOptionState}
                  labelSelect={state.textSelectState}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <DateComponent
                  text={state.textRegister}
                  open={showMode}
                  showCalender={showCalender}
                  dataDados={state.dateRegister}
                  onChange={handleDateChange}
                  label="Data de Nascimento"
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Estado Civil"
                  onChange={handleCivilStatusChange}
                  selectedOption={selectedOptionCivilStatus}
                  labelSelect={state.textSelectCivilStatus}
                />
              </S.GridItem>
            </S.GridForm>
            <SelectComponent
              label="Categoria"
              onChange={handleCategoryChange}
              selectedOption={selectedOptionCategory}
              labelSelect={state.textSelectCategory}
            />
          </S.Form>

          <S.FooterFields>
            <S.Required>* Campos obrigatórios</S.Required>
            <ButtonComponent title="Cadastrar" onPress={submitRegister} small />
          </S.FooterFields>
        </S.Container>
      )}

      <ModalComponent
        isVisible={successModal}
        onBackdropPress={() => setSuccessModal(false)}
      >
        <DefaultContentModalComponent
          closeModal={setSuccessModal}
          data={name}
          type="register"
        />
      </ModalComponent>
    </>
  );
}
