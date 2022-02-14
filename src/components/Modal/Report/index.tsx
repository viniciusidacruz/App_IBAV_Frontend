import React from 'react'

import { TitleComponent } from '../../Title'
import { ButtonComponent } from '../../Button'

import * as S from './styles'
import { ICloseModal } from './types'

export function ReportContentModalComponent({ handleCloseModal }: ICloseModal) {
    return (
        <S.ContentModal>
            <S.TitleModal>Resumo do relatório</S.TitleModal>

            <S.ListModal>
                <TitleComponent title="Célula: 008-Radicais livres" decoration primary />
                <TitleComponent title="Oferta: R$10,00" decoration primary />
                <TitleComponent title="Data: 20/02/2022" decoration primary />
                <TitleComponent title="Presença:" decoration primary />
                <TitleComponent title="- 10 membros (célula)" decoration primary />
                <TitleComponent title="- 10 membros (culto)" decoration primary />
                <TitleComponent title="- 3 Visitantes (célula)" decoration primary />
                <TitleComponent title="- 1 Visitantes (culto)" decoration primary />
            </S.ListModal>

            <S.ObservationModal>
                <TitleComponent title="Observações: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" decoration primary />
            </S.ObservationModal>

            <ButtonComponent title="Confirmar" onPress={handleCloseModal} />
        </S.ContentModal>
    )
}
