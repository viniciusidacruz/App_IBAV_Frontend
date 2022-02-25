export interface IContentModal {
  handleCloseModal: () => void;
  data: {
    cargo: string;
    numero_celula: string;
    email: string;
    pastor: string;
    rede: string;
    usuario: string;
  };
}
