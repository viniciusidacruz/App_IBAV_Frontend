import styled from "styled-components/native";

export const Footer = styled.View`
  padding-top: 5;
  margin-bottom: 10;
`;

export const Info = styled.Text``;

export const Decoration = styled.Text`
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
  color: ${({ theme }) => theme.colors.blue};
`;
