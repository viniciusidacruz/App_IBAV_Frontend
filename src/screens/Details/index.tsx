import React, { Fragment, useState } from 'react'

import MenuNavigation from '../../common/constants/navigation'

import { HeaderComponent } from '../../components/Header'
import { ComeBackComponent } from '../../components/ComeBack'
import { NotificationComponent } from '../../components/Notification'

const loadingGif = require("../../assets/loader-two.gif");

import * as S from './styles'
import { ButtonComponent } from '../../components/Button'

export function DetailsScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      <HeaderComponent>
        <S.ComeBack>
          <ComeBackComponent />
          <S.TitlePage>
            {MenuNavigation.DETAILS}
          </S.TitlePage>
        </S.ComeBack>

        <NotificationComponent />
      </HeaderComponent>

      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <S.Container>
          <S.HeaderButtons>
            <ButtonComponent title="Rejeitar" width='150' icon={thumbs} />
            <ButtonComponent title="Aprovar" width='150' />
          </S.HeaderButtons>
        </S.Container>
      )
      }
    </Fragment>
  )
}
