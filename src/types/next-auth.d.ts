import { ROLES } from '@/constants/roles';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken: string;
      userInfo: UserInfo;
    } & DefaultSession['user'];
  }

  interface User {
    Data: Contents;
    Status: number;
    Message: null;
  }
}

export type Contents = {
  Token: string;
  UserInfo: UserInfo;
  IsSuccess: boolean;
};

export type UserInfo = {
  UserName: string;
  FullName: string;
  Email: string;
  SiteId: string;
  SiteCode: string;
  Role: string;
};
