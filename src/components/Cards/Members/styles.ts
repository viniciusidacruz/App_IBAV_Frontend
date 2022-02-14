import styled from 'styled-components/native'

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 5;
    padding-top: 5;

    border-bottom-color: ${({ theme }) => theme.colors.grey};
    border-bottom-width: 1px;
`

export const ContentName = styled.View`
    width: 65%;

    margin-right: 20;
`

export const InfoName = styled.Text`
    color: ${({ theme }) => theme.colors.grey};
    
    font-size: ${({ theme }) => theme.fonts.fontSize.small};
    text-transform: uppercase;
`

export const ContentPresent = styled.View`
    flex-direction: row;
    justify-content: space-between;

    width: 20%;
`