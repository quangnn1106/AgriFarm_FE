'use client';
import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import { LOGIN_PATH, REGISTER_PATH } from '@/constants/routes';

const SuccessPage: React.FC = () => {
  const router = useRouter();
  return (
    <Result
      status='success'
      title='Đăng ký thành công'
      subTitle='Bạn đã có tài khoản, hệ thống sẽ tự động duyệt trong vòng 5 phút'
      extra={[
        <Button
          type='primary'
          key='console'
          onClick={() => {
            router.push(LOGIN_PATH);
          }}
        >
          Đi đến trang đăng nhập
        </Button>,
        <Button
          key='buy'
          onClick={() => {
            router.push(REGISTER_PATH);
          }}
        >
          Trở lại trang đăng ký
        </Button>
      ]}
    />
  );
};

export default SuccessPage;
