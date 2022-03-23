import { createContext, useReducer } from "react";
import { IActions, IContextType, IProvider, IState } from "./types";

const initialData: IState = {
  offer: "",
  members: [],
  visitors: [],
  nameVisitor: "",
  date: new Date(),
  phoneVisitor: "",
  observations: "",
  stateSelect: "Selecione",
  celulaSelect: "Selecione",
  dateRegister: new Date(),
  categorySelect: "Selecione",
  textSelectState: "Selecione",
  textSelectCelula: "Selecione",
  textDate: "Selecione uma data",
  civilStatusSelect: "Selecione",
  textSelectCategory: "Selecione",
  textSelectCivilStatus: "Selecione",
  textRegister: "Selecione uma data",
};

export const FormReportContext = createContext<IContextType | undefined>(
  undefined
);

//Reducer
export enum FormReportActions {
  setDate,
  setOffer,
  setMembers,
  setVisitors,
  setTextDate,
  setStateSelect,
  setNameVisitor,
  setCelulaSelect,
  setTextRegister,
  setObservations,
  setPhoneVisitor,
  setDateRegister,
  setCategorySelect,
  setTextSelectState,
  setTextSelectCelula,
  setCivilStatusSelect,
  setTextSelectCategory,
  setTextSelectCivilStatus,
}

const formReportReducer = (state: IState, action: IActions) => {
  switch (action.type) {
    case FormReportActions.setOffer:
      return { ...state, offer: action.payload };

    case FormReportActions.setDate:
      return { ...state, date: action.payload };

    case FormReportActions.setDateRegister:
      return { ...state, dateRegister: action.payload };

    case FormReportActions.setTextDate:
      return { ...state, textDate: action.payload };

    case FormReportActions.setTextRegister:
      return { ...state, textRegister: action.payload };

    case FormReportActions.setObservations:
      return { ...state, observations: action.payload };

    case FormReportActions.setCategorySelect:
      return { ...state, categorySelect: action.payload };

    case FormReportActions.setCivilStatusSelect:
      return { ...state, civilStatusSelect: action.payload };

    case FormReportActions.setStateSelect:
      return { ...state, stateSelect: action.payload };

    case FormReportActions.setNameVisitor:
      return { ...state, nameVisitor: action.payload };

    case FormReportActions.setPhoneVisitor:
      return { ...state, phoneVisitor: action.payload };

    case FormReportActions.setMembers:
      return { ...state, members: action.payload };

    case FormReportActions.setVisitors:
      return { ...state, visitors: action.payload };

    case FormReportActions.setTextSelectState:
      return { ...state, textSelectState: action.payload };

    case FormReportActions.setTextSelectCivilStatus:
      return { ...state, textSelectCivilStatus: action.payload };

    case FormReportActions.setTextSelectCategory:
      return { ...state, textSelectCategory: action.payload };

    case FormReportActions.setTextSelectCelula:
      return { ...state, textSelectCelula: action.payload };

    case FormReportActions.setCelulaSelect:
      return { ...state, celulaSelect: action.payload };

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
