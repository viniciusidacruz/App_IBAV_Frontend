import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

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

export const Grid = styled.View`
  margin-bottom: 32px;
`;

export const ContentC = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 15;
  width: 310px;
`;

export const IconC = styled(FontAwesome5)`
  color: ${({ theme }) => theme.colors.red};

  font-size: ${({ theme }) => theme.fonts.fontSize.medium};

  margin-right: 20;
`;

export const DescriptionC = styled.Text`
  width: 100%;

  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontWeight.medium};
  color: ${({ theme }) => theme.colors.grey};

  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 1px;
`;

export const Observations = styled.TextInput`
  border-color: ${({ theme }) => theme.colors.grey};
  border-width: 1px;

  margin-top: 15;
`;
