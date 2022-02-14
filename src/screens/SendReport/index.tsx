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
import { DateComponent } from "../../components/Date";
import { ButtonComponent } from "../../components/Button";

export function SendReportScreen({ navigation }: AppProps) {
  const [offer, setOffer] = useState("");
  const [observation, setObservation] = useState("");

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
            <DateComponent />
          </S.ContentC>
        </S.Grid>

        <S.Grid>
          <TitleComponent title="Observações:" small primary />
          <S.Observations
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => setObservation(text)}
            value={observation}
          />
        </S.Grid>

        <S.Button>
          <ButtonComponent title="Entregar relatório" onPress={() => { }} />
        </S.Button>
      </S.Content>
    </>
  );
}
