import React from "react";
import { TouchableOpacity } from "react-native";

import { ArrowLeft } from "./styles";

interface IBackActionProps {
  onPress: () => void;
}

export function ComeBackComponent({ onPress }: IBackActionProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowLeft name="arrow-back-ios" />
    </TouchableOpacity>
  );
}
