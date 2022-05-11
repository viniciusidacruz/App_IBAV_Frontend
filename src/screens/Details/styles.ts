import styled from "styled-components/native";
import { Image } from "react-native";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  text-transform: uppercase;

  font-size: 14;
  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;

export const Container = styled.View`
    padding-left: 10;
    padding-right: 10;
    padding-top: 20;
`;

export const HeaderButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Loading = styled(Image)``;

export const HeaderInfo = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  margin-left: auto;
  margin-right: auto;

  align-items: center;
`;

export const GroupName = styled.View`
  flex-direction: row;
`;

export const TitleInfo = styled.Text`
  color: ${({ theme }) => theme.colors.blue};

  font-family: ${({ theme }) => theme.fonts.fontFamily.bold};
`;

export const NameInfo = styled.Text`
  color: ${({ theme }) => theme.colors.grey};
`;

export const NameInfoFull = styled.Text``;

export const DescriptionInfo = styled.View`
  margin-bottom: 20;

  flex-direction: column;
  align-items: center;
`;

export const TitleDescricao = styled.Text``;

export const GroupInfoAction = styled.View``;

export const TitleAction = styled.Text``;

export const Action = styled.Text``;