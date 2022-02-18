import { Image } from "react-native";
import styled from "styled-components/native";

export const Navigation = styled.Text`
  color: ${({ theme }) => theme.colors.light};

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

export const HeadingForm = styled.View`
  margin-bottom: 20;
`

export const FinishForm = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 10;
  margin-bottom: 40;
`

export const Info = styled.Text``

export const Button = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
`

export const Loading = styled(Image)``
