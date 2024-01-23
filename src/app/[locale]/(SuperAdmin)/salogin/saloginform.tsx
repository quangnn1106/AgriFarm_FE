'use client';
// client component vs server component
import { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Row, Col, ConfigProvider, Flex } from 'antd';
import styles from '@/app/[locale]/(SuperAdmin)/salogin/sa-auth.module.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginAsyncApi, resetState } from '@/redux/features/common-slice';

import classNames from 'classnames/bind';
import { loginModel } from '@/app/[locale]/(Auth)/models/login-model';
import Loading from '@/components/LoadingBtn/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LogoImage from '@/components/Logo/LogoImage';

const cx = classNames.bind(styles);

const SaLoginForm: React.FC = () => {
  const router = useRouter();
  const { userLogin } = useAppSelector(state => state.authReducer);

  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  // useEffect(() => {
  //   if (userLogin?.access as string) {
  //     router.push('/dashboard');
  //   }
  // }, [userLogin, router]);

  const handleLogin = async (data: loginModel) => {
    const actionAsyncThunk = loginAsyncApi(data);
    dispatch(actionAsyncThunk);
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
              name='email'
              label='Email'
              rules={[
                { required: true },
                {
                  type: 'email',
                  message: 'Email is not valid'
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
                  <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    className={cx('auth__btn')}
                  >
                    Login
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
