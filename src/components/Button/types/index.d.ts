export interface IContentProps {
  title: string;
  onPress: () => void;
  small?: boolean;
  icon?: any;
  disabled?: boolean;
  onPressIn?: () => void;
}

export interface ISizeProps {
  small?: boolean;
}

export interface ISvgProps {
  icon?: any;
}
