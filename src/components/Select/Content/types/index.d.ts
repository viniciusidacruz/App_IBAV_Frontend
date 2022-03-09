export interface IContentSelect {
  changeModalVisibility: (state: boolean) => void;
  onChange: (option: string) => void;
  selectedOption: (option: string) => void;
}
