import React from 'react'

import { TitleComponent } from '../../Title'
import { ButtonComponent } from '../../Button'

import { useFormReport } from '../../../hooks/useFormReport'

import * as S from './styles'

export function ReportContentModalComponent({ handleCloseModal, data }: any) {
   const { state } = useFormReport();

    return (
        <S.ContentModal>
            <S.TitleModal>Resumo do relatório</S.TitleModal>

            <S.ListModal>
                <TitleComponent
                    title={`Célula: ${data && data[0][1].numero_celula} - ${data && data[0][1].rede}`}
                    decoration
                    primary
                />

                <TitleComponent title={`Oferta: ${state.offer ? state.offer : 'Precisa selecionar uma data[E'}`} decoration primary />
                <TitleComponent title={`Data: ${state.textDate}`} decoration primary />
                <TitleComponent title="Presença:" decoration primary />
                <TitleComponent title="- 10 membros (célula)" decoration primary />
                <TitleComponent title="- 10 membros (culto)" decoration primary />
                <TitleComponent title="- 3 Visitantes (célula)" decoration primary />
                <TitleComponent title="- 1 Visitantes (culto)" decoration primary />
            </S.ListModal>

            <S.ObservationModal>
                <TitleComponent title={`Observações: ${state.observations}`} decoration primary />
            </S.ObservationModal>

            <ButtonComponent title="Confirmar" onPress={handleCloseModal} />
        </S.ContentModal>
    )
}
