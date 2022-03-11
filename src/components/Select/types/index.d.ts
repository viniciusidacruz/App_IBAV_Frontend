export interface IContentProps {
  label?: string;
  onChange: (option: string) => void;
  selectedOption: (option: string) => void;
  labelSelect: string;
  dataOptions: Array<string>;
  disabled?: boolean;
}

export interface IStyledDisabled {
  disabled?: boolean;
}
