import { IParamsRoutesAppProps } from './routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IParamsRoutesAppProps {}
  }
}
