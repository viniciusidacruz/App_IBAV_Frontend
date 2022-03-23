export interface IContentProps {
  label?: string;
  onChange: (option: string) => void;
  selectedOption: (option: string) => void;
  labelSelect: string;
  dataOptions: Array<IOptions>;
  disabled?: boolean;
}

export interface IStyledDisabled {
  disabled?: boolean;
}
interface IOptions {
  value: string
}
