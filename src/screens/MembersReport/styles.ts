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

export const Heading = styled.View`
  align-items: flex-end;

  border-bottom-color: ${({ theme }) => theme.colors.red};
  border-bottom-width: 1px;
`

export const Titles = styled.View`
  flex-direction: row;
`

export const Title = styled.Text`
  margin-left: 10;

  font-family: ${({ theme }) => theme.fonts.fontWeight.bold};
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.blue};
`

export const Footer = styled.View`
  padding-top: 5;
  margin-bottom: 10;
`

export const Info = styled.Text``

export const Decoration = styled.Text`
  font-family: ${({ theme }) => theme.fonts.fontWeight.bold};
  color: ${({ theme }) => theme.colors.blue};
`

export const Button = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
`