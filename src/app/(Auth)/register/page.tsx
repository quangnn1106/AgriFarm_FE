import React, { Suspense } from 'react';
import RegisterForm from './registerform';
import LoadingAll from '@/app/loading';

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
