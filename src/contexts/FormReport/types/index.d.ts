import { FormReportActions } from "..";

export interface IState {
  offer: string;
  date: any;
  textDate: string;
  observations: string;
  membersCL: 'F' | 'P' | 'D' | 'T' | 'V';
  membersCT:  'F' | 'P' | 'D' | 'T' | 'V';
  visitorsCL: boolean;
  visitorsCT: boolean;
  nameVisitor: string;
  phoneVisitor: string;
  members: IContentMembers[];
  visitors: IContentMembers[];
}

interface IContentMembers {
  nome: string;
  status: string;
  culto?: string;
  celula?: string;
}
export interface IActions {
    type: FormReportActions;
    payload: any;
}

export interface IContextType {
    state: IState;
    dispatch: (action: IActions) => void;
}

export interface IProvider {
    children: any
}
