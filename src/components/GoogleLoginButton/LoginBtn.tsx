import React from 'react';
import './loginBtn.scss';
import { signIn } from 'next-auth/react';
import { CALLBACK_URL } from '@/constants/routes';
type Props = {};

const LoginBtn = (props: Props) => {
  return (
    <button
      className='login-with-google-btn'
      onClick={() => {
        console.log(
          'process.env.NEXTAUTH_URL: ',
          `${process.env.NEXT_PUBLIC_API}` as string
        );
        signIn('google', { callbackUrl: CALLBACK_URL });
      }}
      type='button'
    >
      Sign in with Google
    </button>
  );
};

export default LoginBtn;
