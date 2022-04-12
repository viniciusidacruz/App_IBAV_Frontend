import React, { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";

import { DateComponent } from "../../components/Date";
import { ModalComponent } from "../../components/Modal";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputMaskComponent } from "../../components/InputMask";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";

import FormFields from "../../common/constants/form";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import MenuNavigation from "../../common/constants/navigation";
import {
  officeMembers,
  selectCategory,
  selectCivilStatus,
  selectState,
} from "../../common/utils/selects";

import { connectApi } from "../../common/services/ConnectApi";

import { IAddress } from "../Register/types";
import { IDataUser } from "./types";

import * as S from "./styles";
import { ReportContentModalComponent } from "../../components/Modal/Report";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

export function UserRegisterScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState("");
  const [stateCivil, setStateCivil] = useState("");
  const [numberHouse, setNumberHouse] = useState("");
  const [office, setOffice] = useState("Selecionar");
  const [showCalender, setShowCalender] = useState(false);
  const [selectNetwork, setSelectNetwork] = useState("Selecionar");
  const [selectDisciples, setSelectDisciples] = useState("Selecionar");
  const [confirmRegisterModal, setConfirmRegisterModal] = useState(false);

  const [address, setAddress] = useState<IAddress>({
    uf: "",
    cep: "",
    ddd: "",
    gia: "",
    ibge: "",
    siafi: "",
    bairro: "",
    logradouro: "",
    localidade: "",
    complemento: "",
  });

  const { state: stateReducer, dispatch } = useFormReport();

  useEffect(() => {
    const getCelulas = async () => {
      const response = await connectApi.get("/users.json");

      setUsers(Object.values(response.data));
    };
    getCelulas();
  }, []);

  const getNetwork = selectNetwork.split(" -")[0];

  const usersMinister =
    users && users.filter((minister: IDataUser) => minister.cargo === "pastor");
  const usersDisciples =
    users &&
    users.filter((discipler: IDataUser) => discipler.cargo === "discipulador");

  const disciplesFiltered =
    usersDisciples &&
    usersDisciples.filter((user: IDataUser) => user.rede === getNetwork);

  const optionsDisciples =
    disciplesFiltered &&
    disciplesFiltered.map((disc: IDataUser) => {
      return {
        value: disc.nome,
      };
    });

  const optionsNetwork =
    usersMinister &&
    usersMinister.map((pastor: IDataUser) => {
      return {
        value: `${pastor?.rede} - ${pastor.nome}`,
      };
    });

  const getAddressFromApi = useCallback(() => {
    axios
      .get(`https://viacep.com.br/ws/${address.cep}/json/`)
      .then((response) => response.data)
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
        });
      })
      .catch((err) => console.log("Erro:", err));
  }, [address.cep]);

  const handleStateChange = (value: string) => {
    setState(value);
  };

  const selectOffice = (value: string) => {
    setOffice(value);

    setSelectNetwork("Selecionar");
    setSelectDisciples("Selecionar");
  };

  const handleCivilStatusChange = (value: string) => {
    setStateCivil(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const showMode = () => {
    setShowCalender(true);
  };

  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || stateReducer.dateRegister;

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

  const handleNetworkChange = (value: string) => {
    setSelectNetwork(value);

    setSelectDisciples("Selecionar");
  };

  const handleDisciplesChange = (value: string) => {
    setSelectDisciples(value);
  };

  const submitRegister = () => {
    setConfirmRegisterModal(true);
  };

  const renderSelectsOptions = () => {
    if (office === "discipulador") {
      return (
        <S.GridSelect>
          <SelectComponent
            label="Rede"
            onChange={handleNetworkChange}
            selectedOption={handleNetworkChange}
            labelSelect={selectNetwork}
            dataOptions={optionsNetwork && optionsNetwork}
          />
        </S.GridSelect>
      );
    } else if (office === "lider de celula") {
      return (
        <Fragment>
          <S.GridSelect>
            <SelectComponent
              label="Rede"
              onChange={handleNetworkChange}
              selectedOption={handleNetworkChange}
              labelSelect={selectNetwork}
              dataOptions={optionsNetwork && optionsNetwork}
            />
          </S.GridSelect>

          <S.GridSelect>
            <SelectComponent
              label="Discipulado"
              onChange={handleDisciplesChange}
              selectedOption={handleDisciplesChange}
              labelSelect={selectDisciples}
              dataOptions={optionsDisciples && optionsDisciples}
            />
          </S.GridSelect>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>{MenuNavigation.REGISTER_USERS}</S.TitlePage>
        </S.ComeBack>
        <NotificationComponent />
      </HeaderComponent>

      <S.Main>
        <S.GridSelect>
          <SelectComponent
            label="Cargo"
            onChange={selectOffice}
            selectedOption={selectOffice}
            labelSelect={office}
            dataOptions={officeMembers}
          />
        </S.GridSelect>

        {renderSelectsOptions()}

        {office !== "Selecionar" && (
          <Fragment>
            <InputFieldComponent
              primary
              value={name}
              placeholder={`* ${FormFields.FULL_NAME}`}
              onChangeText={setName}
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
              onChangeText={setEmail}
            />

            <InputFieldComponent
              primary
              value={address.cep}
              placeholder={FormFields.CEP}
              onEndEditing={() => getAddressFromApi()}
              onChangeText={(value) =>
                setAddress((old) => ({
                  ...old,
                  cep: value,
                }))
              }
            />

            <S.GridForm>
              <S.GridItemLarge>
                <InputFieldComponent
                  primary
                  value={address.logradouro}
                  placeholder={
                    address.logradouro !== ""
                      ? address.logradouro
                      : FormFields.ADDRESS
                  }
                  onChangeText={(value) =>
                    setAddress((old) => ({
                      ...old,
                      logradouro: value,
                    }))
                  }
                  editable={address.logradouro === ""}
                />
              </S.GridItemLarge>

              <S.GridItemSmall>
                <InputFieldComponent
                  primary
                  value={numberHouse}
                  placeholder={FormFields.NUMBER}
                  onChangeText={setNumberHouse}
                />
              </S.GridItemSmall>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address.bairro}
                  placeholder={
                    address.bairro !== "" ? address.bairro : FormFields.DISTRICT
                  }
                  onChangeText={(value) =>
                    setAddress((old) => ({
                      ...old,
                      bairro: value,
                    }))
                  }
                  editable={address.bairro === ""}
                />
              </S.GridItem>

              <S.GridItem>
                <InputFieldComponent
                  primary
                  value={address.localidade}
                  placeholder={
                    address.localidade !== ""
                      ? address.localidade
                      : FormFields.CITY
                  }
                  onChangeText={(value) =>
                    setAddress((old) => ({
                      ...old,
                      localidade: value,
                    }))
                  }
                  editable={address.localidade === ""}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <SelectComponent
                  label="Estado"
                  onChange={handleStateChange}
                  selectedOption={handleStateChange}
                  labelSelect={address.uf ? address.uf : state}
                  dataOptions={selectState}
                  disabled={address.uf !== ""}
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Estado Civil"
                  onChange={handleCivilStatusChange}
                  selectedOption={handleCivilStatusChange}
                  labelSelect={stateCivil}
                  dataOptions={selectCivilStatus}
                />
              </S.GridItem>
            </S.GridForm>

            <S.GridForm>
              <S.GridItem>
                <DateComponent
                  text={stateReducer.textRegister}
                  open={showMode}
                  showCalender={showCalender}
                  dataDados={stateReducer.dateRegister}
                  onChange={handleDateChange}
                  label="Data de Nascimento"
                />
              </S.GridItem>

              <S.GridItem>
                <SelectComponent
                  label="Categoria"
                  onChange={handleCategoryChange}
                  selectedOption={handleCategoryChange}
                  labelSelect={category}
                  dataOptions={selectCategory}
                />
              </S.GridItem>
            </S.GridForm>

            <S.FooterFields>
              <S.Required>* Campos obrigatórios</S.Required>
              <ButtonComponent
                title="Cadastrar"
                onPress={submitRegister}
                small
              />
            </S.FooterFields>
          </Fragment>
        )}
      </S.Main>

      <ModalComponent
        isVisible={confirmRegisterModal}
        onBackdropPress={() => setConfirmRegisterModal(false)}
      >
        <DefaultContentModalComponent
          closeModal={setConfirmRegisterModal}
          type="register"
          data={name}
        />
      </ModalComponent>
    </Fragment>
  );
}
