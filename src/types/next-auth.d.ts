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
    data: Contents;
    status: number;
    message: null;
  }
}

export type Contents = {
  token: string;
  userInfo: UserInfo;
  isSuccess: boolean;
};

export type UserInfo = {
  userName: string;
  fullName: string;
  email: string;
  siteId: string;
  siteCode: string;
  role: string;
};
