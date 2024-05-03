import { ROLES } from '@/constants/roles';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

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

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string;
  }
}

export type Contents = {
  token: string;
  userInfo: UserInfo;
  isSuccess: boolean;
};

export type UserInfo = {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  siteId: string;
  siteCode: string;
  role: string;
  siteName: string;
};
