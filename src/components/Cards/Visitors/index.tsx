import React, { useState } from 'react'
import { CheckBox } from 'react-native-elements';

import * as S from './styles'

export function CardVisitorsComponent({ data }: any) {
    const [presentCelula, setPresentCelula] = useState(false);
    const [presentCulto, setPresentCulto] = useState(false);

    const maxName = data.nome.substring(0, 20);

    return (
        <S.Content>
            <S.ContentName>
                <S.InfoName>{maxName}...</S.InfoName>
            </S.ContentName>
            <S.ContentPresent>
                <S.CheckCelula>
                    <CheckBox
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor='green'
                        uncheckedColor='grey'
                        checked={presentCelula}
                        onPress={() => setPresentCelula(!presentCelula)}
                    />
                </S.CheckCelula>

                <S.CheckCulto>
                    <CheckBox
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor='green'
                        uncheckedColor='grey'
                        checked={presentCulto}
                        onPress={() => setPresentCulto(!presentCulto)}
                    />
                </S.CheckCulto>
            </S.ContentPresent>
        </S.Content>
    )
}
