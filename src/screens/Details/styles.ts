import styled from "styled-components/native";
import { Image } from "react-native";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;

export const Container = styled.View`
    padding-left: 10;
    padding-right: 10;
    padding-top: 20;
`;

export const HeaderButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Loading = styled(Image)``;
