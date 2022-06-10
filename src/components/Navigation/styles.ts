import styled from "styled-components/native";
import { IDataProps } from './types'

export const Navigation = styled.Text<IDataProps>`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};

  ${({ disabled }) => {
    disabled && `color: red`
  }}
`;
