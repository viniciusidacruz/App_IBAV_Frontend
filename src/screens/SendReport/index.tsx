import React, { useEffect, useState, Fragment } from "react";
import { ScrollView, Text } from "react-native";
import { DateComponent } from "../../components/Date";
import { TitleComponent } from "../../components/Title";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { SelectComponent } from "../../components/Select";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { NavigationComponent } from "../../components/Navigation";
import { NotificationComponent } from "../../components/Notification";
import { ReportContentModalComponent } from "../../components/Modal/Report";
import { DefaultContentModalComponent } from "../../components/Modal/Default";

const loadingGif = require("../../assets/loader-two.gif");

import FormFields from "../../common/constants/form";
import ButtonsText from "../../common/constants/buttons";
import useUserFiltered from "../../hooks/useUserFiltered";
import { useFormReport } from "../../hooks/useFormReport";
import { connectApi } from "../../common/services/ConnectApi";
import { FormReportActions } from "../../contexts/FormReport";

import { IContentProps } from "./types";

import * as S from "./styles";

export function SendReportScreen() {
  const [celulas, setCelulas] = useState<any>([]);
  const [showCalender, setShowCalender] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [celulaFiltered, setCelulaFiltered] = useState<any>([]);

  const { state, dispatch } = useFormReport();
  const { user, loading } = useUserFiltered();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const openModalSuccess = () => {
    setModalSuccess(true);
  };

  const handleOfferChange = (value: string) => {
    dispatch({
      type: FormReportActions.setOffer,
      payload: value,
    });
  };

  const handleObservationsChange = (value: string) => {
    dispatch({
      type: FormReportActions.setObservations,
      payload: value,
    });
  };

  const handleDateChange = (event: Event, selectedDate: any) => {
    const currentDate = selectedDate || state.date;

    setShowCalender(false);

    const tempDate = new Date(currentDate);
    const newDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    dispatch({
      type: FormReportActions.setDate,
      payload: currentDate,
    });
    dispatch({
      type: FormReportActions.setTextDate,
      payload: newDate,
    });
  };

  const showMode = () => {
    setShowCalender(true);
  };

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

  const handleRedeChange = (value: string) => {
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: null,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: null,
    });
  };

  const handleDiscipuladoChange = (value: string) => {
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: value,
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: null,
    });
  };

  const userInfo = user && user[0][1];
  const whatOffice = userInfo && userInfo.cargo;

  useEffect(() => {
    if (whatOffice !== "lider") {
      const getCelulas = async () => {
        const response = await connectApi.get("/celulas.json");

        setCelulas(Object.values(response.data));
      };
      getCelulas();
    }
  }, []);

  useEffect(() => {
    const filterCelulas =
      celulas &&
      celulas.filter((celula: any) => {
        return celula.discipulador === userInfo.nome;
      });

    setCelulaFiltered(filterCelulas);
  }, [celulas]);


  const redes = celulas.map((item: any) => (item.rede))
  const redesUnicas = redes.filter(function (este: any, i: any) {
    return redes.indexOf(este) === i;
  });

  const mapRedesUnicas = redesUnicas.map((item: any) => {
    return {
      value: item
    }
  })

  const filtrandoRedes = celulas.filter((item: any) => {
    return item.rede === state.redeSelect
  })
  const discipulado = filtrandoRedes.map((item: any) =>
    (item.discipulador))

  const discipuladossUnicos = discipulado.filter(function (este: any, i: any) {
    return discipulado.indexOf(este) === i;
  });

  const mapDiscipuladosUnicos = discipuladossUnicos.map((item: any) => {
    return {
      value: item
    }
  })

  const filtrandoDiscipulado = celulas.filter((item: any) => {
    return item.discipulador === state.discipuladoSelect && item.rede === state.redeSelect
  })
  const celulaAdm = filtrandoDiscipulado.map((item: any) => {
    return {
      value: item.celula
    }
  })

  const optionsCelula =
    celulaFiltered &&
    celulaFiltered.map((celulaIdentify: IContentProps) => {
      return {
        value: `${celulaIdentify?.celula} - ${celulaIdentify.lider}`,
      };
    });


  const office = () => {
    switch (whatOffice) {
      case "lider":
        return (
          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <S.DescriptionC>{`${userInfo && userInfo.numero_celula} - ${userInfo && userInfo.rede
                }`}</S.DescriptionC>
            </S.ContentC>
          </S.Grid>
        );

      case "discipulador":
        return (
          <S.Grid>
            <TitleComponent title={`${FormFields.CELULA}:`} small primary />
            <S.ContentC>
              <S.IconC name="user-friends" />
              <SelectComponent
                onChange={handleCelulaChange}
                labelSelect={state.textSelectCelula}
                dataOptions={optionsCelula && optionsCelula}
                selectedOption={selectedOptionCelula}
              />
            </S.ContentC>
          </S.Grid>
        );
      case "pastor":
        return (
          <>
            <S.Grid>
              <TitleComponent title={`${FormFields.DISCIPLESHIP}:`} small primary />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  onChange={handleCelulaChange}
                  labelSelect={state.textSelectCelula}
                  dataOptions={[]}
                  selectedOption={handleCelulaChange}
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.CELULA}:`} small primary />
              <S.ContentC>
                <S.IconC name="user-friends" />
                <SelectComponent
                  onChange={handleCelulaChange}
                  labelSelect={state.textSelectCelula}
                  dataOptions={[]}
                  selectedOption={selectedOptionCelula}
                />
                {
                  redesUnicas && redesUnicas.map((item: any) => {
                    return (
                      <Text>{item}</Text>
                    )
                  })}
              </S.ContentC>
            </S.Grid>
          </>
        );

      case "administrador":
        return (
          <>
            <S.Grid>
              <TitleComponent title={`${FormFields.REDE}:`} small primary />
              <S.ContentC>
                <S.IconC name="vector-square" />
                <SelectComponent
                  onChange={handleRedeChange}
                  labelSelect={state.redeSelect}
                  dataOptions={mapRedesUnicas}
                  selectedOption={handleRedeChange}
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.DISCIPLESHIP}:`} small primary />
              <S.ContentC>
                <S.IconC name="network-wired" />
                <SelectComponent
                  onChange={(handleDiscipuladoChange)}
                  labelSelect={state.discipuladoSelect}
                  dataOptions={state.redeSelect && mapDiscipuladosUnicos}
                  selectedOption={handleDiscipuladoChange}
                />
              </S.ContentC>
            </S.Grid>
            <S.Grid>
              <TitleComponent title={`${FormFields.CELULA}:`} small primary />
              <S.ContentC>
                <S.IconC name="user-friends" />
                <SelectComponent
                  onChange={handleCelulaChange}
                  labelSelect={state.celulaSelect}
                  dataOptions={celulaAdm}
                  selectedOption={selectedOptionCelula}
                />
              </S.ContentC>
            </S.Grid>
          </>
        );
    }
  };

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent />
        <NavigationComponent data />
        <NotificationComponent />
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <Fragment>
          {userInfo && (
            <Fragment>
              <S.Content>
                <ScrollView>
                  <S.Form behavior="position" enabled>
                    {office()}
                    <S.Grid>
                      <TitleComponent
                        title={`${FormFields.OFFER}R$:`}
                        small
                        primary
                      />
                      <S.ContentC>
                        <S.IconC name="file-invoice-dollar" />
                        <InputFieldComponent
                          primary
                          value={state.offer}
                          placeholderTextColor="grey"
                          onChangeText={handleOfferChange}
                        />
                      </S.ContentC>
                    </S.Grid>

                    <S.Grid>
                      <TitleComponent
                        title={`${FormFields.DATE}:`}
                        small
                        primary
                      />
                      <S.ContentC>
                        <DateComponent
                          text={state.textDate}
                          open={showMode}
                          showCalender={showCalender}
                          dataDados={state.date}
                          onChange={handleDateChange}
                        />
                      </S.ContentC>
                    </S.Grid>

                    <S.Grid>
                      <TitleComponent
                        title={`${FormFields.OBSERVATIONS}:`}
                        small
                        primary
                      />
                      <S.Observations
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={handleObservationsChange}
                        value={state.observations}
                      />
                    </S.Grid>

                    <S.ContentButton>
                      <ButtonComponent
                        title={ButtonsText.REPORT}
                        onPress={handleOpenModal}
                      />
                    </S.ContentButton>
                  </S.Form>
                </ScrollView>
              </S.Content>
            </Fragment>
          )}
        </Fragment>
      )}

      <ModalComponent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ReportContentModalComponent
          handleCloseModal={setModalVisible}
          data={user}
          onPressIn={openModalSuccess}
        />
      </ModalComponent>

      <ModalComponent
        isVisible={modalSuccess}
        onBackdropPress={() => setModalSuccess(false)}
      >
        <DefaultContentModalComponent
          closeModal={setModalSuccess}
          type="sendReport"
        />
      </ModalComponent>
    </Fragment>
  );
}
