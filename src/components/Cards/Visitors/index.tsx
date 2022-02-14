import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

import * as S from './styles'

export function CardVisitorsComponent({ data }: any) {
    const [presentCelula, setCelulaPresent] = useState('F');
    const [presentCulto, setPresentCulto] = useState('F');

    const maxName = data.nome.substring(0, 20);

    return (
        <S.Content>
            <S.ContentName>
                <S.InfoName>{maxName}...</S.InfoName>
            </S.ContentName>
            <S.ContentPresent>
                <Picker
                    selectedValue={presentCelula}
                    onValueChange={(value, index) => {
                        setCelulaPresent(value)
                    }}
                >
                    <Picker.Item label="F" value='F' />
                    <Picker.Item label="P" value='P' />
                    <Picker.Item label="D" value='D' />
                    <Picker.Item label="T" value='T' />
                    <Picker.Item label="V" value='V' />
                </Picker>

                <Picker
                    style={{ width: 75, height: 50 }}
                    selectedValue={presentCulto}
                    onValueChange={(value, index) => {
                        setPresentCulto(value)
                    }}
                >
                    <Picker.Item label="F" value='F' />
                    <Picker.Item label="P" value='P' />
                    <Picker.Item label="D" value='D' />
                    <Picker.Item label="T" value='T' />
                    <Picker.Item label="V" value='V' />
                </Picker>
            </S.ContentPresent>
        </S.Content>
    )
}
