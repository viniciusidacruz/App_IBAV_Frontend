import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamsList = {
  Home: undefined;
  SignIn: undefined;
  Members: undefined;
  Preload: undefined;
  UserGrid: undefined;
  Register: undefined;
  SendReport: undefined;
  PreListAdmin: undefined;
  WaitApproval: undefined;
  MembersReport: undefined;
  VisitorsReport: undefined;
  Multiplication: undefined;
  PreRegisterAdmin: undefined;
};

export type AppProps = NativeStackScreenProps<AppStackParamsList>;
