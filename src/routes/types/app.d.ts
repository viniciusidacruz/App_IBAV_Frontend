import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamsList = {
  Home: undefined;
  SendReport: undefined;
  MembersReport: undefined;
  VisitorsReport: undefined;
  Members: undefined;
  Register: undefined;
  SignIn: undefined;
  Preload: undefined;
};

export type AppProps = NativeStackScreenProps<AppStackParamsList>;