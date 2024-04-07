import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from '@/navigation';
import { HOME_PATH } from '@/constants/routes';
type Props = {};

const DeniedPage = (props: Props) => {
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
            router.push(HOME_PATH);
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default DeniedPage;
