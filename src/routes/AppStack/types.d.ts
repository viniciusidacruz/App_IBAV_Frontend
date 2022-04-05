import { NativeStackScreenProps } from "@react-navigation/native";

export type INavigationAppStackProps = {
  Home: undefined;
  Members: undefined;
  Register: undefined;
  SendReport: undefined;
  WaitApproval: undefined;
  UserRegister: undefined;
  PreListAdmin: undefined;
  MembersReport: undefined;
  VisitorsReport: undefined;
  Multiplication: undefined;
  PreRegisterAdmin: undefined;
};

export type IPropsAppStack = NativeStackScreenProps<INavigationAppStackProps>;
