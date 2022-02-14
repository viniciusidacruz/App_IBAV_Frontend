import styled from 'styled-components/native';

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

export const Button = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
`