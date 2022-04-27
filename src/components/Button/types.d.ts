import { TouchableOpacityProps } from "react-native";

export interface IContentProps extends TouchableOpacityProps {
  title: string;
  small?: boolean;
  icon?: React.ComponentProps<typeof Feather>["name"];
  isLoading?: boolean;
  width?: string;
  heigth?: string;
  size?: string;
}

export interface ISizeProps {
  small?: boolean;
  width?: string;
  heigth?: string;
  size?: string;
}

export interface ISvgProps {
  icon?: boolean;
}
