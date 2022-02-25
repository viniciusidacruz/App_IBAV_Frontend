import React, { useState } from 'react';
import { Text } from 'react-native';
import { ModalComponent } from '../Modal';
import NotificationContentModalComponent from '../Modal/Notifications';

import * as S from './styles';

export function NotificationComponent() {
  const [showNotification, setShowNotification] = useState(false);

  const handleOpenNotification = () => {
    setShowNotification(!showNotification)
  }
  return (
    <>
      <S.Notification onPress={handleOpenNotification}>
        <S.Icon name="notifications" />
      </S.Notification>

      <ModalComponent
        onBackdropPress={() => setShowNotification(false)}
        isVisible={showNotification}
      >
        <NotificationContentModalComponent setShowNotification={setShowNotification} />
      </ModalComponent>
    </>
  );
}
