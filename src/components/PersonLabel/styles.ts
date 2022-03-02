import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons'; 

export const Box = styled.View`
    justify-content: space-between;
    flex-direction: row;
    padding: 2px 5px;

    border-bottom-color: ${({ theme }) => theme.colors.grey};
    border-bottom-width: 0.5px;

`

export const ContainerPerson =  styled.View`
    flex-direction: column;
    align-items: flex-start;

`

export const BoxName = styled.View`

`

export const TextName = styled.Text`
    font-size: 14px;
    line-height: 16px;
    color: #666666;
`

export const BoxStatus = styled.View`
    background: #000A3E;

`

export const TextStatus = styled.Text`
    font-size: 8px;
    line-height: 9px;
    color: #FFFFFF;
    padding: 2px 5px;
`

export const Icon = styled(FontAwesome5)`
font-size: ${({ theme }) => theme.fonts.fontSize.medium};

`