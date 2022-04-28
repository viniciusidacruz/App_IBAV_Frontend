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
  justify-content: space-around;
`;

export const Info = styled.View`
  align-items: center;

  margin-top: 20;
  margin-bottom: 20;
`;

export const Username = styled.Text`
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  color: ${({ theme }) => theme.colors.blue};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.fontFamily.regular};
  color: ${({ theme }) => theme.colors.grey};
`;

export const InfoFullName = styled.Text``;

export const Description = styled.View``;

export const TitleDescription = styled.Text``;

export const Action = styled.Text``;

export const ActionName = styled.Text``;

export const Loading = styled(Image)``;
