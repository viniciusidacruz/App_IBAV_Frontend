import React, { useState } from 'react';

import * as S from './styles';

import { IContentProps } from './types';

export function InputFieldComponent({
  icon,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  onChangeText,
  autoCorrect,
}: IContentProps) {
  const [show, setShow] = useState(false);

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <S.Field>
      {secureTextEntry ? (
        <S.Input
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={show ? false : true}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
        />
      ) : (
        <S.Input
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
        />
      )}

      {icon && (
        <S.Icons onPress={handleShowPassword}>
          {show ? <S.Hide name="eye-with-line" /> : <S.Show name="eye" />}
        </S.Icons>
      )}
    </S.Field>
  );
}
