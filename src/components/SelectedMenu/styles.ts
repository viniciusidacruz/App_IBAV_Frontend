import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Content = styled(TouchableOpacity)`
  align-items: center;
  margin-left: 40px ;
  flex-direction: column;
  
`;

export const BackgroundIcon = styled.View`
  border-radius: 64;

  background-color: ${({ theme }) => theme.colors.red};

  height: 64px;
  width: 64px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  max-width: 80px;
  width: 100%;

  text-align: center;

  margin-top: 5px;

  color: ${({ theme }) => theme.colors.grey};
`;
