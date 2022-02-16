import { FormReportActions } from "..";

export interface IState {
  offer: string;
  date: any;
  textDate: string;
  observations: string;
  membersCL: boolean;
  membersCT: boolean;
  visitorsCL: boolean;
  visitorsCT: boolean;
  nameVisitor: string;
  phoneVisitor: string;
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