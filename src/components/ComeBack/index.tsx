import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ArrowLeft } from './styles';
import { IBackActionProps } from './types';

export function ComeBackComponent({ onPress }: IBackActionProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowLeft name="arrow-back-ios" />
    </TouchableOpacity>
  );
}
