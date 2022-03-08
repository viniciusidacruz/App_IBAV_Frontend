import React, { useState } from "react";
import { Text } from "react-native";

import { ModalComponent } from "../../components/Modal";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import { AppProps } from "../../routes/types/app";
import FormFields from "../../common/constants/form";

import * as S from "./styles";

export function RegisterScreen({ navigation }: AppProps) {
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const submitRegister = () => {
    try {
      setSuccessModal(true);
    } catch (err) {}
  };

  return (
    <>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent onPress={() => navigation.navigate("Home")} />
          <TitleComponent title="Cadastro" small />
        </S.ComeBack>

        <NotificationComponent />
      </HeaderComponent>

      <S.Container>
        <S.Form>
          <InputFieldComponent
            primary
            value={name}
            placeholder={`* ${FormFields.FULL_NAME}`}
            onChangeText={(value) => setName(value)}
          />

          <InputFieldComponent
            primary
            value={phone}
            placeholder={`* ${FormFields.PHONE}`}
            onChangeText={(value) => setPhone(value)}
          />

          <InputFieldComponent
            primary
            value={email}
            placeholder={FormFields.EMAIL}
            onChangeText={(value) => setEmail(value)}
          />

          <InputFieldComponent
            primary
            value={address}
            placeholder={FormFields.ADDRESS}
            onChangeText={(value) => setAddress(value)}
          />

          <S.GridForm>
            <S.GridItem>
              <InputFieldComponent
                primary
                value={district}
                placeholder={FormFields.DISTRICT}
                onChangeText={(value) => setDistrict(value)}
              />
            </S.GridItem>

            <S.GridItem>
              <InputFieldComponent
                primary
                value={cep}
                placeholder={FormFields.CEP}
                onChangeText={(value) => setCep(value)}
              />
            </S.GridItem>
          </S.GridForm>

          <S.GridForm>
            <S.GridItem>
              <InputFieldComponent
                primary
                value={city}
                placeholder={FormFields.CITY}
                onChangeText={(value) => setCity(value)}
              />
            </S.GridItem>

            <S.GridItem>
              <SelectComponent label="Estado" />
            </S.GridItem>
          </S.GridForm>

          <S.GridForm>
            <S.GridItem>
            <SelectComponent label="Estado Civil" />
            </S.GridItem>

            <S.GridItem>
              <SelectComponent label="Categoria" />
            </S.GridItem>
          </S.GridForm>
        </S.Form>

        <S.FooterFields>
          <S.Required>* Campos obrigatórios</S.Required>
          <ButtonComponent title="Cadastrar" onPress={submitRegister} small />
        </S.FooterFields>
      </S.Container>

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
