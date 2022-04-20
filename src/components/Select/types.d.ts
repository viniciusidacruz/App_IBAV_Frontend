export interface IContentProps {
  label?: string;
  onChange: (option: string) => void;
  selectedOption: (option: string) => void;
  labelSelect: string;
  dataOptions: Array<IOptions>;
  disabled?: boolean;
  small?: boolean;
}

export interface IStyledDisabled {
  disabled?: boolean;
}

export interface ISizeProps {
  small?: boolean;
}

interface IOptions {
  value: string
}
