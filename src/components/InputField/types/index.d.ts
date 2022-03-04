export interface IContentProps {
  icon?: any;
  iconPassword?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderTextColor?: 'white' | 'grey';
  onChangeText: (value) => void;
  autoCorrect?: boolean;
  primary?: boolean;
  value: string | undefined;
}

export interface IColorsProps {
  primary?: boolean;
}
