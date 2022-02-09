import { IParamsRoutesProps } from './routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IParamsRoutesProps {}
  }
}
