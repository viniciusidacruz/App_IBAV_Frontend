export interface IContentProps {
  icon?: boolean;
  secureTextEntry?: boolean;
  placeholder: string;
  placeholderTextColor: 'white' | 'grey';
  onChangeText: (value) => void;
  autoCorrect?: boolean;
}
