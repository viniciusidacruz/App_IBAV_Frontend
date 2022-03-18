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
  onEndEditing,
  editable,
  value,
  label
}: IContentProps) {
  const [show, setShow] = useState(false);

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <>
      {label && <S.Label>{label}</S.Label>}
    <S.Field primary={primary}>
      {secureTextEntry ? (
        <S.Input
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={show ? false : true}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          primary={primary}
          onEndEditing={onEndEditing}
          editable={editable}
          value={value}
        />
      ) : (
        <S.Input
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          primary={primary}
          onEndEditing={onEndEditing}
          editable={editable}
          value={value}
        />
      )}

      {iconPassword && (
        <S.Icons onPress={handleShowPassword}>
          {show ? <S.Hide name="eye-with-line" /> : <S.Show name="eye" />}
        </S.Icons>
      )}

      {icon && <S.Icon>{icon}</S.Icon>}
    </S.Field>
    </>
  );
}
