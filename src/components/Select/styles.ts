import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import { IStyledDisabled } from "./types";

export const Content = styled.View`
  flex-direction: column;
`;

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 32;

  border-color: ${({ theme }) => theme.colors.grey};
  border-width: 1px;
`;

export const LabelField = styled.Text`
  color: ${({ theme }) => theme.colors.grey};

  font-size: 12;

  margin-bottom: 5;
  margin-top: 5;
`;

export const Field = styled.View``;

export const Label = styled.Text`
  padding-left: 15;

  color: ${({ theme }) => theme.colors.grey};
`;

export const Icons = styled.View<IStyledDisabled>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.red};

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 15%;
`;

export const Icon = styled(MaterialIcons)`
  font-size: 16;
  color: ${({ theme }) => theme.colors.light};
`;
