import { ReactNode } from "react";

export type IAuthenticatedProps = {
  User: {
    _redirectEventId: any;
    apiKey: string;
    appName: [];
    createdAt: number;
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    lastLoginAt: number;
    phoneNumber: number | string;
    photoURL: string;
    providerData: IProviderDataProps;
    stsTokenManager: {
      accessToken: string;
      expirationTime: number;
      refreshToken: string;
    };
    tenantId: string;
    uid: string;
  };
};

type IProviderDataProps = {
  displayName: string;
  email: string;
  phoneNumber: number | string;
  photoURL: string;
  providerId: string;
  uid: string;
};

type IProviderProps = {
  children: ReactNode;
};
