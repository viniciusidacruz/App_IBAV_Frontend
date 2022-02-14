import React, { useEffect } from 'react'

import * as S from './styles'

export function VisitorContentModalComponent({ setisAddVisible }: any) {

    useEffect(() => {
        setTimeout(() => {
            setisAddVisible(false)
        }, 3000)
    }, [])

    return (
        <S.ContentModal>
            <S.Description>
                Visitante <S.Name>Polyane Paulino Ribeiro</S.Name> adicionado com sucesso!
            </S.Description>
            <S.Success name="verified" />
        </S.ContentModal>
    )
}
