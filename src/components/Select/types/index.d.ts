export interface IContentProps {
  label?: string;
  onChange: (option: string) => void;
  selectedOption: (option: string) => void;
  labelSelect: string;
}
