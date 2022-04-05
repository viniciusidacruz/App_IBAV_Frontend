import { TouchableOpacityProps } from "react-native";

export interface IContentProps extends TouchableOpacityProps {
  title: string;
  small?: boolean;
  icon?: React.ComponentProps<typeof Feather>["name"];
  isLoading?: boolean;
}

export interface ISizeProps {
  small?: boolean;
}

export interface ISvgProps {
  icon?: boolean;
}
