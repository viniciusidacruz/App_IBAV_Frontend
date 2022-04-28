import { TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
export interface IContentProps extends TouchableOpacityProps {
  title: string;
  small?: boolean;
  icon?: React.ComponentProps<typeof Feather>["name"];
  isLoading?: boolean;
  width?: string;
  heigth?: string;
  size?: string;
  colorIcon?: string;
}

export interface ISizeProps {
  width?: string;
  heigth?: string;
  size?: string;
  icon?: string;
}

export interface ISvgProps {
  icon?: boolean;
}
