'use client';
import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from '@/navigation';
import { HOME_PATH } from '@/constants/routes';
import { useSession } from 'next-auth/react';
import { renderPath } from '../../(Auth)/login/loginform';
type Props = {};

const DeniedPage = (props: Props) => {
  const { data: session } = useSession();
  const role = session?.user.userInfo.role || '';
  const router = useRouter();

  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button
          type='primary'
          onClick={() => {
            router.push(renderPath(role));
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default DeniedPage;
