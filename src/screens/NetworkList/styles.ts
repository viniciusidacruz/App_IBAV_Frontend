import styled from "styled-components/native";

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
`;

export const ContentButton = styled.View`
  margin-left: auto;
  margin-top: 40;
`;
