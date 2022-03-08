import React, { useState } from "react";

import * as S from "./styles";

import { IContentProps } from "./types";

export function InputFieldComponent({
  icon,
  primary,
  placeholder,
  autoCorrect,
  iconPassword,
  onChangeText,
  secureTextEntry,
  placeholderTextColor,
}: IContentProps) {
  const [show, setShow] = useState(false);

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <S.Field primary={primary}>
      {secureTextEntry ? (
        <S.Input
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={show ? false : true}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          primary={primary}
        />
      ) : (
        <S.Input
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          primary={primary}
        />
      )}

      {iconPassword && (
        <S.Icons onPress={handleShowPassword}>
          {show ? <S.Hide name="eye-with-line" /> : <S.Show name="eye" />}
        </S.Icons>
      )}

      {icon && <S.Icon>{icon}</S.Icon>}
    </S.Field>
  );
}
