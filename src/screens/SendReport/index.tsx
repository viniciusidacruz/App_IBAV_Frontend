import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { InputFieldComponent } from "../../components/InputField";
import { NotificationComponent } from "../../components/Notification";

import { AppProps } from "../../routes/types/app";

import * as S from "./styles";

export function SendReportScreen({ navigation }: AppProps) {
  const [offer, setOffer] = useState("");
  const [observation, setObservation] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event: Event, selectedDate: any) => {
    setDate(selectedDate);
    setShow(false)
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      <HeaderComponent>
        <ComeBackComponent onPress={() => navigation.navigate('Home')} />
        <TouchableOpacity onPress={() => navigation.navigate("SendReport")}>
          <S.Navigation
            style={{ borderBottomColor: "white", borderBottomWidth: 2 }}
          >
            Dados
          </S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MembersReport")}>
          <S.Navigation>Membros</S.Navigation>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("VisitorsReport")}>
          <S.Navigation>Visitantes</S.Navigation>
        </TouchableOpacity>
        <NotificationComponent />
      </HeaderComponent>

      <S.Content>
        <S.Grid>
          <TitleComponent title="Célula:" small primary />
          <S.ContentC>
            <S.IconC name="user-friends" />
            <S.DescriptionC>008-Radicais livres</S.DescriptionC>
          </S.ContentC>
        </S.Grid>

        <S.Grid>
          <TitleComponent title="Oferta R$:" small primary />
          <S.ContentC>
            <S.IconC name="file-invoice-dollar" />
            <InputFieldComponent
              primary
              value={offer}
              placeholderTextColor="grey"
              onChangeText={(value) => setOffer(value)}
            />
          </S.ContentC>
        </S.Grid>

        <S.Grid>
          <TitleComponent title="Data:" small primary />
          <S.ContentC>
            <View>
              <TouchableOpacity onPress={showDatepicker}>
                <Text>Selecione a data</Text>
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </S.ContentC>
        </S.Grid>

        <S.Grid>
          <TitleComponent title="Observações:" small primary />
          <S.Observations
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setObservation(text)}
          />
        </S.Grid>
      </S.Content>
    </>
  );
}
