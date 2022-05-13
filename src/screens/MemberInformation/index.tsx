import React, { useState } from "react";
import { ScrollView } from 'react-native';

import { DateComponent } from "../../components/Date";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

import MenuNavigation from "../../common/constants/navigation";
import FormFields from "../../common/constants/form";

import * as S from "./styles";
import { selectCategory, selectCivilStatus, selectState } from "../../common/utils/selects";
import { connectApi } from "../../common/services/ConnectApi";

export function MembersInformation(this: any, { navigation, route }: any) {
    const [successModal, setSuccessModal] = useState(false);
    const [showCalender, setShowCalender] = useState(false);
    const [cep, setCep] = useState(route.params?.cep || "");
    const [name, setName] = useState(route.params?.nome || "");
    const [city, setCity] = useState(route.params?.cidade || "");
    const [email, setEmail] = useState(route.params?.email || "");
    const [state, setState] = useState(route.params?.estado || "");
    const [status, setStatus] = useState(route.params?.status || "");
    const [phone, setPhone] = useState(route.params?.telefone || "");
    const [address, setAddress] = useState(route.params?.endereco || "");
    const [district, setDistrict] = useState(route.params?.bairro || "");
    const [number, setNumber] = useState(route.params?.numero_casa || "");
    const [birthday, setBirthday] = useState(
        route.params?.data_de_nascimento || ""
    );
    const [civilStatus, setCivilStatus] = useState(
        route.params?.estado_civil || ""
    );

    const showMode = () => {
        setShowCalender(true);
      };

    const submitRegister = () => {
        try {
            connectApi.patch
        } catch (err) { }
    };

    // const waitingDeletion = async () => {
    //     try {
    //       await connectApi.patch(`/celulas/${idCelula}/membros/${id}.json`, {
    //         aguardando_exclusao: true
    //       })
    //         .then(() => {
    //           setSendModal(false)
    //           setTimeout(timeModal, 300)
    //         })
    //     } catch (err) {
    //       alert(err)
    //     }
    //   }

    return (
        <>
            <HeaderComponent>
                <ComeBackComponent />
                <S.Navigation>{MenuNavigation.MEMBERS}</S.Navigation>
                <NotificationComponent />
            </HeaderComponent>

            <ScrollView>
                <S.Container>
                    <S.Form>
                        <S.GridItemFull>
                            <InputFieldComponent
                                primary
                                value={name}
                                placeholder={`* ${FormFields.FULL_NAME}`}
                                onChangeText={(value) => setName(value)}
                                label="*Nome Completo"
                            />
                        </S.GridItemFull>

                        <S.GridItemFull>
                            <InputFieldComponent
                                primary
                                value={phone}
                                placeholder={`* ${FormFields.PHONE}`}
                                onChangeText={(value) => setPhone(value)}
                                label="*Telefone"
                            />
                        </S.GridItemFull>

                        <S.GridItemFull>
                            <InputFieldComponent
                                primary
                                value={email}
                                placeholder={FormFields.EMAIL}
                                onChangeText={(value) => setEmail(value)}
                                label="*Email"
                            />
                        </S.GridItemFull>

                        <S.GridForm>
                            <S.GridItemLarge>
                                <InputFieldComponent
                                    primary
                                    value={address}
                                    placeholder={FormFields.ADDRESS}
                                    onChangeText={(value) => setAddress(value)}
                                    label="Endereço"
                                />
                            </S.GridItemLarge>

                            <S.GridItemSmall>
                                <InputFieldComponent
                                    primary
                                    value={number}
                                    placeholder={FormFields.NUMBER}
                                    onChangeText={(value) => setNumber(value)}
                                    label="Nº"
                                />
                            </S.GridItemSmall>
                        </S.GridForm>

                        <S.GridForm>
                            <S.GridItem>
                                <InputFieldComponent
                                    primary
                                    value={district}
                                    placeholder={FormFields.DISTRICT}
                                    onChangeText={(value) => setDistrict(value)}
                                    label="Bairro"
                                />
                            </S.GridItem>

                            <S.GridItem>
                                <InputFieldComponent
                                    primary
                                    value={city}
                                    placeholder={FormFields.CITY}
                                    onChangeText={(value) => setCity(value)}
                                    label="Cidade"
                                />
                            </S.GridItem>
                        </S.GridForm>

                        <S.GridForm>
                            <S.GridItem>
                                <SelectComponent
                                    label="Estado"
                                    onChange={(labelSelect) => setState(labelSelect)}
                                    selectedOption={() => { }}
                                    labelSelect={state}
                                    dataOptions={selectState}
                                />
                            </S.GridItem>

                            <S.GridItem>
                                <SelectComponent
                                    label="Estado Civil"
                                    onChange={(labelSelect) => setCivilStatus(labelSelect)}
                                    selectedOption={() => { }}
                                    labelSelect={civilStatus}
                                    dataOptions={selectCivilStatus}
                                />
                            </S.GridItem>
                        </S.GridForm>

                        <S.GridForm>
                            <S.GridItem>
                                <DateComponent
                                    text={birthday}
                                    open={showMode}
                                    showCalender={false}
                                    dataDados={""}
                                    onChange={(text: any) => setBirthday(text)}
                                    label="Data de Nascimento"
                                />
                            </S.GridItem>

                            <S.GridItem>
                                <SelectComponent
                                    label="Categoria"
                                    onChange={(labelSelect) => setStatus(labelSelect)}
                                    selectedOption={() => { }}
                                    labelSelect={status}
                                    dataOptions={selectCategory}
                                />
                            </S.GridItem>
                        </S.GridForm>
                    </S.Form>

                    <S.FooterFields>
                        <S.Required>* Campos obrigatórios</S.Required>
                        <ButtonComponent title="SALVAR INFORMAÇÕES" 
                        onPress={submitRegister}
                        width='213px'
                        heigth="39px"
                        size="14px"
                        />
                    </S.FooterFields>
                </S.Container>
            </ScrollView>

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