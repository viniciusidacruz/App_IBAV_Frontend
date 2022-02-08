import styled from "styled-components/native";

export const Content = styled.View`
    height: 120px;

    justify-content: center;

    background-color: ${({ theme }) => theme.colors.blue};

    padding: 0 16px;
`

export const Container = styled.View`
    margin-top: 40px;
    
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`