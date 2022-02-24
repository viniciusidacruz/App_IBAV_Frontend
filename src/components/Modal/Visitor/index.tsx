import React, { useEffect } from 'react'

import { useFormReport } from '../../../hooks/useFormReport'
import { FormReportActions } from '../../../contexts/FormReport';

import * as S from './styles'

export function VisitorContentModalComponent({ setisAddVisible }: any) {

  const { state, dispatch } = useFormReport();

    useEffect(() => {
        setTimeout(() => {
            setisAddVisible(false)

            dispatch({
              type: FormReportActions.setNameVisitor,
              payload: '',
            });
        }, 3000)
    }, [])

    return (
        <S.ContentModal>
            <S.Description>
                Visitante <S.Name>{state.nameVisitor}</S.Name> adicionado com sucesso!
            </S.Description>
            <S.Success name="verified" />
        </S.ContentModal>
    )
}
