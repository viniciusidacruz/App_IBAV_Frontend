import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

export const Field = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors.light};
  border-bottom-width: 1px;

  width: 100%;
  height: 48px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.TextInput`
  color: ${({ theme }) => theme.colors.light};

  width: 80%;

  padding-left: 16px;
`;

export const Icons = styled.TouchableOpacity``;

export const Show = styled(Entypo)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};

  color: ${({ theme }) => theme.colors.light};
`;

export const Hide = styled(Entypo)`
  font-size: ${({ theme }) => theme.fonts.fontSize.medium};

  color: ${({ theme }) => theme.colors.light};
`;
