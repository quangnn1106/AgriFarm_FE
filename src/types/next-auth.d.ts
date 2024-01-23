import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      token: string;
      userInfo: UserInfo;
      isSuccess: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    token: string;
    userInfo: UserInfo;
    isSuccess: boolean;
  }
}

export interface UserInfo {
  userName: string;
  siteId: string;
  siteCode: string;
  roles: string[];
}
