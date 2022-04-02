import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

import { ISizeProps, ISvgProps } from "./types";

export const Content = styled.TouchableOpacity<ISizeProps>`
  height: ${(props) => (props.small ? "32" : "48")};

  width: ${(props) => (props.small ? "150" : "100%")};

  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 10;
`;

export const Background = styled(LinearGradient).attrs({
  colors: ["#A60100", "#EA0000"],
})<ISizeProps>`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100%;
  height: 100%;

  border-radius: 10;
`;

export const BoxIcon = styled.View<ISvgProps>`
  margin-right: ${(props) => (props.icon ? "5" : "0")};
`;

export const Title = styled.Text<ISizeProps>`
  font-size: ${(props) =>
    props.small ? "10" : props.theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};

  text-transform: uppercase;
  letter-spacing: 1;

  color: ${({ theme }) => theme.colors.light};
`;
