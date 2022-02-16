import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 5;
  padding-top: 5;

  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 1px;
`;

export const ContentName = styled.View`
  margin-right: 20;
`;

export const InfoName = styled.Text`
  color: ${({ theme }) => theme.colors.grey};

  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  text-transform: uppercase;
`;

export const ContainerSelect = styled.View`
  flex-direction: row;
`;

export const ContentPresent = styled.View`
  flex-direction: row;
  justify-content: space-between;

  border-color: ${({ theme }) => theme.colors.grey};
  border-width: 1px;

  padding-right: 80px;

  width: 25%;
`;

export const Select = styled(Picker)`
  background: #D30000;
/* 
  width: 27px;
  height: 14px; */
`;
