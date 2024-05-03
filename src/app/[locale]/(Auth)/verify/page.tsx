import React from 'react';
import VerifyForm from './verifyCode';
import { notFound } from 'next/navigation';

type Props = {};

const PageForgot = (props: any) => {
  const email = atob(props.searchParams.a??"");
  console.log('param: ', email);

  if(!email || email.trim().length === 0){
    return notFound()
  }

  return (
    <>
      {email && email.trim().length > 0 && <VerifyForm email={email} />}
    </>
  );
};

export default PageForgot;
