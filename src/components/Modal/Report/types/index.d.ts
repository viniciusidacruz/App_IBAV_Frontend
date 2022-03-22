export interface IContentModal {
  handleCloseModal: any;
  data?: any;
  onPressIn?: () => void;
  membersPresent?: IMemberOrVisitor[] | undefined;
  visitorsPresent?: IMemberOrVisitor[] | undefined;
}

export type IMemberOrVisitor = {
  celula: string;
  culto: string;
  nome: string;
  status: string;
};
