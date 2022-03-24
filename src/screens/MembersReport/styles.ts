import styled from "styled-components/native";
import { Image } from "react-native";

export const Navigation = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: capitalize;

  font-size: ${({ theme }) => theme.fonts.fontSize.small};
`;

export const Content = styled.View`
  flex: 1;

  max-width: 350px;
  width: 100%;

  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
`;

export const Heading = styled.View`
  align-items: center;

  margin-bottom: 40;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};
  font-family: ${({ theme }) => theme.fonts.fontWeight.bold};

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.blue};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontWeight.bold};

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.grey};
`;

export const Button = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const Loading = styled(Image)``;
