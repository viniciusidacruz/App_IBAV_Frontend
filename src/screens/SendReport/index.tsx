import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DateComponent } from "../../components/Date";
import { TitleComponent } from "../../components/Title";
import { ModalComponent } from "../../components/Modal";
import { HeaderComponent } from "../../components/Header";
import { ButtonComponent } from "../../components/Button";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";
import { ReportContentModalComponent } from "../../components/Modal/Report";
import { DefaultContentModalComponent } from "../../components/Modal/Default"

const loadingGif = require("../../assets/loader-two.gif");

import { AppProps } from "../../routes/types/app";
import FormFields from "../../common/constants/form";
import ButtonsText from "../../common/constants/buttons";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import MenuNavigation from "../../common/constants/navigation";

import * as S from "./styles";

export function SendReportScreen({ navigation }: AppProps) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false)
  const [showCalender, setShowCalender] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalSucess, setModalsucess] = useState(false);

  const { state, dispatch } = useFormReport();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const openModalSucess = () => {
    setModalsucess(true);
  }

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
      payload: currentDate
    })
    dispatch({
      type: FormReportActions.setTextDate,
      payload: newDate
    })
  }

  const showMode = () => {
    setShowCalender(true);
  };

  useEffect(() => {
    setLoading(true);
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@storage_dataUser");

      if (user) {
        setUser(JSON.parse(user));
        setLoading(false);
      } else {
        navigation.replace("SignIn");
      }
    };
    checkUser();
  }, []);

  const userInfo = user && user[0][1];

  return (
    <Fragment>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate("Home")} />
        <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
          <S.Navigation
            style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
          >
            {MenuNavigation.DATA}
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MembersReport")}>
          <S.Navigation>{MenuNavigation.MEMBERS}</S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("VisitorsReport")}>
          <S.Navigation>{MenuNavigation.VISITORS}</S.Navigation>
        </TouchableOpacity>
        <NotificationComponent />
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <Fragment>
          {userInfo && (
            <Fragment>
              <S.Content>
                <S.Grid>
                  <TitleComponent title={`${FormFields.CELULA}:`} small primary />
                  <S.ContentC>
                    <S.IconC name="user-friends" />
                    <S.DescriptionC>{`${userInfo && userInfo.numero_celula} - ${userInfo && userInfo.rede
                      }`}</S.DescriptionC>
                  </S.ContentC>
                </S.Grid>

                <S.Grid>
                  <TitleComponent title={`${FormFields.OFFER}R$:`} small primary />
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
                  <TitleComponent title={`${FormFields.DATE}:`} small primary />
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
                  <TitleComponent title={`${FormFields.OBSERVATIONS}:`} small primary />
                  <S.Observations
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={handleObservationsChange}
                    value={state.observations}
                  />
                </S.Grid>

                <ButtonComponent
                  title={ButtonsText.REPORT}
                  onPress={handleOpenModal}
                />
              </S.Content>

              <ModalComponent
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
              >
                <ReportContentModalComponent
                  handleCloseModal={setModalVisible}
                    data={user}
                    openModal={openModalSucess}
                />
              </ModalComponent>

              <ModalComponent
                isVisible={modalSucess}
                onBackdropPress={() => setModalsucess(false)}
              >
                <DefaultContentModalComponent
                  closeModal={setModalsucess}
                  type="sendReport"
                />
              </ModalComponent>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
