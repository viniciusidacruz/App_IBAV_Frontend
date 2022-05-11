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

// import { AppProps } from "../../routes/types/app";

import * as S from "./styles";
import { selectState } from "../../common/utils/selects";

export function MembersInformation(this: any, { navigation, route }: any) {
    const [successModal, setSuccessModal] = useState(false);
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

    const submitRegister = () => {
        try {
            setSuccessModal(true);
        } catch (err) { }
    };

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

                        <S.GridItemFull>
                            <InputFieldComponent
                                primary
                                value={cep}
                                placeholder={FormFields.CEP}
                                onChangeText={(value) => setCep(value)}
                                label="Cep"
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
                                    onChange={() => { }}
                                    selectedOption={() => { }}
                                    labelSelect={state}
                                    dataOptions={selectState}
                                />
                            </S.GridItem>

                            <S.GridItem>
                                <SelectComponent
                                    label="Estado Civil"
                                    onChange={() => { }}
                                    selectedOption={() => { }}
                                    labelSelect={civilStatus}
                                    dataOptions={[]}
                                />
                            </S.GridItem>
                        </S.GridForm>

                        <S.GridForm>
                            <S.GridItem>
                                <DateComponent
                                    text={birthday}
                                    open={() => { }}
                                    showCalender={false}
                                    dataDados={""}
                                    onChange={() => { }}
                                    label="Data de Nascimento"
                                />
                            </S.GridItem>

                            <S.GridItem>
                                <SelectComponent
                                    label="Categoria"
                                    onChange={() => { }}
                                    selectedOption={() => { }}
                                    labelSelect={status}
                                    dataOptions={[]}
                                />
                            </S.GridItem>
                        </S.GridForm>
                    </S.Form>

                    <S.FooterFields>
                        <S.Required>* Campos obrigatórios</S.Required>
                        <ButtonComponent title="SALVAR INFORMAÇÕES" onPress={submitRegister} />
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