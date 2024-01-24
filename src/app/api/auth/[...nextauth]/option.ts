import { AuthOptions } from 'next-auth';
import { http } from '@/utils/config';

import GoogleProvider from 'next-auth/providers/google';

import CredentialsProvider from 'next-auth/providers/credentials';
import { UserInfo } from '@/types/next-auth';
// import { loginUser, registerUser } from '@/services/authService';
export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Sign in',
      id: 'credentials',

      credentials: {
        siteCode: {
          label: 'SiteCode',
          type: 'text'
        },
        userName: {
          label: 'UserName',
          type: 'userName',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const response = await http.post('/user/auth/token', {
            siteCode: credentials?.siteCode as string,
            userName: credentials?.userName as string,
            password: credentials?.password as string
          });
          const user = response.data;
          console.log('return data user: ', user);

          // If no error and we have user data, return it
          if (response.status === 200 && user) {
            console.log('return data user 200: ', user);

            return user;
          }
        } catch (error: any) {
          console.log('error credential: ', error.message);
        }
        // Return null if user data could not be retrieved

        return null;
      }
    })
  ],

  callbacks: {
    signIn: async ({ user, account, profile }) => {
      //   if (account?.provider === 'google') {
      //     try {
      //       const registrationSuccess = await registerUser(profile?.email, user);

      //       if (registrationSuccess) {
      //         const loginSuccess = await loginUser(profile?.email, user);

      //         if (loginSuccess) {
      //           return true;
      //         }
      //       }
      //     } catch (error: any) {
      //       console.error('Error during Google account processing:', error.message);
      //     }
      //   }
      if (account?.provider === 'credentials') {
        console.log('login credentials', account?.provider);
        console.log('user credentials: ', user);

        return true;
      }
      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.access_token = user?.token;
        token.userInfo = user?.userInfo;

        // console.log('user.access jwttttttt: ', user);
        // console.log('token.access_token: ', token.profile);
      }

      return token;
    },

    session: async ({ session, token, user }) => {
      session.user.token = token.access_token as string;
      session.user.userInfo = token?.userInfo as UserInfo;
      // console.log('session: ', session?.user?.profile);
      // console.log('session user profile: ', token?.profile);

      return session;
    }
  },
  pages: {
    signIn: '/login' || '/salogin',
    newUser: '/register'
  },
  secret: process.env.NEXTAUTH_SECRET
};
