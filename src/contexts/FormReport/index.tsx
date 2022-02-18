import { createContext, useReducer } from "react";
import { IActions, IContextType, IProvider, IState } from "./types";

const initialData: IState = {
  offer: "",
  date: new Date(),
  textDate: "Selecione uma data",
  observations: "",
  membersCL: 'F',
  membersCT: 'F',
  visitorsCL: false,
  visitorsCT: false,
  nameVisitor: "",
  phoneVisitor: "",
};

export const FormReportContext = createContext<IContextType | undefined>(
  undefined
);

//Reducer
export enum FormReportActions {
  setOffer,
  setDate,
  setTextDate,
  setObservations,
  setMembersCL,
  setMembersCT,
  setVisitorsCL,
  setVisitorsCT,
  setNameVisitor,
  setPhoneVisitor,
}

const formReportReducer = (state: IState, action: IActions) => {
  switch (action.type) {
    case FormReportActions.setOffer:
      return { ...state, offer: action.payload };

    case FormReportActions.setDate:
      return { ...state, date: action.payload };

    case FormReportActions.setTextDate:
      return { ...state, textDate: action.payload };

    case FormReportActions.setObservations:
      return { ...state, observations: action.payload };

    case FormReportActions.setMembersCL:
      return { ...state, membersCL: action.payload };

    case FormReportActions.setMembersCT:
      return { ...state, membersCT: action.payload };

    case FormReportActions.setVisitorsCL:
      return { ...state, visitorsCL: action.payload };

    case FormReportActions.setVisitorsCT:
      return { ...state, visitorsCT: action.payload };

    case FormReportActions.setNameVisitor:
      return { ...state, nameVisitor: action.payload };

    case FormReportActions.setPhoneVisitor:
      return { ...state, phoneVisitor: action.payload };

    default:
      return state;
  }
};

export const FormProvider = ({ children }: IProvider) => {
  const [state, dispatch] = useReducer(formReportReducer, initialData);
  const value = { state, dispatch };

  return (
    <FormReportContext.Provider value={value}>
      {children}
    </FormReportContext.Provider>
  );
};
