'use client';
// client component vs server component
import { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Row, Col, ConfigProvider, Flex } from 'antd';
import styles from '@/app/[locale]/(SuperAdmin)/salogin/sa-auth.module.scss';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DASH_BOARD_PATH, REGISTER_PATH } from '@/constants/routes';

import classNames from 'classnames/bind';
import { SuperAdminLogin, loginModel } from '@/app/[locale]/(Auth)/models/login-model';
import Loading from '@/components/LoadingBtn/Loading';

import LogoImage from '@/components/Logo/LogoImage';

const cx = classNames.bind(styles);

const SaLoginForm: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || DASH_BOARD_PATH;

  const handleLogin = async (data: SuperAdminLogin) => {
    try {
      setLoading(true);
      const res = await signIn('credentials', {
        userName: data?.userName as string,
        password: data?.password as string,
        redirect: false,
        callbackUrl
      });
      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('Invalid User or passwords');
        console.log(error);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error?.message);
    }
  };

  return (
    <>
      <LogoImage />
      <div className={cx('auth__form')}>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 10,
                // verticalLabelPadding: '0 0 0',
                labelFontSize: 12,
                labelColor: 'rgb(133, 133, 133)'
              }
            }
          }}
        >
          <Form
            onFinish={handleLogin}
            layout='vertical'
            autoComplete='off'
          >
            <Form.Item>
              <Flex vertical>
                <h1 className={cx('auth__title')}>Login {session?.user?.email} </h1>
                <p className={cx('auth_subtitle')}>Super admin login</p>
              </Flex>
            </Form.Item>

            <Form.Item
              name='userName'
              label='userName'
              rules={[
                { required: true },
                {
                  type: 'string',
                  message: 'UserName is not valid'
                }
              ]}
            >
              <Input size='large' />
            </Form.Item>

            <Form.Item
              name='password'
              label='Password'
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password size='large' />
            </Form.Item>

            <Form.Item>
              <Row className={cx('form_btn')}>
                <Col span={24}>
                  {error && <p className={cx('auth__error')}>{error}</p>}

                  <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    className={cx('auth__btn')}
                    disabled={loading ? true : false}
                  >
                    {loading ? <Loading userState={status} /> : 'Login'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
};

export default SaLoginForm;
