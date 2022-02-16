import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

export const Content = styled.TouchableOpacity`
  height: 32;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-color: ${({ theme }) => theme.colors.grey};
  border-width: 1px;
`

export const TextSelect = styled.Text`
  color: ${({ theme }) => theme.colors.grey};

  padding-left: 5;
  padding-right: 5;
`;

export const SelectDate = styled.View`
  background-color: ${({ theme }) => theme.colors.red};

  height: 100%;

  justify-content: center;
  align-items: center;

  padding-left: 10;
  padding-right: 10;
`;

export const Icon = styled(AntDesign)`
  color: ${({ theme }) => theme.colors.light};

  height: 100%;
  justify-content: center;

  font-size: 24;
`;
