import styled from "styled-components/native";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;

export const Main = styled.ScrollView`
  padding-left: 10;
  padding-right: 10;
`;

export const GridForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  margin-bottom: 12;
`;

export const GridItem = styled.View`
  width: 48%;
`;

export const GridItemLarge = styled.View`
  width: 73%;
`;

export const GridItemSmall = styled.View`
  width: 25%;
`;

export const GridSelect = styled.View`
  margin-bottom: 10;
`;