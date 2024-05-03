'use client';
import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { LOGIN_PATH, REGISTER_PATH } from '@/constants/routes';
import { redirect, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

const { Paragraph, Text } = Typography;
type Props = {};

const ErrorPage = (props: Props) => {
  const router = useRouter();

  const t = useTranslations('Result');
  return (
    <Result
      status='error'
      title={t('regis_error')}
      subTitle={t('subTitle_error')}
      extra={[
        <Button
          type='primary'
          key='console'
          onClick={() => {
            router.push(LOGIN_PATH);
          }}
        >
          {t('btn_redToLogin')}
        </Button>,
        <Button
          key='buy'
          onClick={() => {
            router.push(REGISTER_PATH);
          }}
        >
          {t('btn_redToRegis')}
        </Button>
      ]}
    >
      <div className='desc'>
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16
            }}
          >
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className='site-result-demo-error-icon' /> Your account has
          been frozen. <a>Thaw immediately &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className='site-result-demo-error-icon' /> Your account is
          not yet eligible to apply. <a>Apply Unlock &gt;</a>
        </Paragraph>
      </div>
    </Result>
  );
};

export default ErrorPage;
