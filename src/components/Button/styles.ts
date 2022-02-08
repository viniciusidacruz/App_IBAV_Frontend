import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Content = styled.TouchableOpacity`
  height: 48px;

  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 10;
`;

export const Background = styled(LinearGradient).attrs({
  colors: ['#4F0609', '#D30000'],
})`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-radius: 10;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.fontSize.small};
  font-family: ${({ theme }) => theme.fonts.fontWeight.bold}

  text-transform: uppercase;
  letter-spacing: 1px;

  color: ${({ theme }) => theme.colors.light};
`;
