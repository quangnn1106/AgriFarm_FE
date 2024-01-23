'use client';
// client component vs server component
import { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Row, Col, ConfigProvider } from 'antd';
import styles from '../auth.module.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginAsyncApi, resetState } from '@/redux/features/common-slice';

import classNames from 'classnames/bind';
import { loginModel } from '../models/login-model';
import Loading from '@/components/LoadingBtn/Loading';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DASH_BOARD_PATH, REGISTER_PATH } from '@/constants/routes';
import { usePathname } from '@/navigation';

const cx = classNames.bind(styles);

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { userLogin } = useAppSelector(state => state.authReducer);

  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  // useEffect(() => {
  //   if (userLogin?.access as string) {
  //     router.push('/dashboard');
  //   }
  // }, [userLogin, router]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  console.log('searchParams: ', searchParams);

  const callbackUrl = searchParams.get('callbackUrl') || DASH_BOARD_PATH;
  console.log('callbackUrl: ', callbackUrl);

  const handleLogin = async (data: loginModel) => {
    // const actionAsyncThunk = loginAsyncApi(data);
    // dispatch(actionAsyncThunk);
    try {
      console.log('data: ', data.siteCode);
      setLoading(true);
      const res = await signIn('credentials', {
        sideCode: data?.siteCode as string,
        userName: data?.userName as string,
        password: data?.password as string,
        redirect: false,
        callbackUrl
      });
      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('Invalid User or password');
        console.log(error);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error?.message);
    }
  };

  return (
    <>
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
              <h1 className={cx('auth__title')}>Login {session?.user?.email} </h1>
              <p className={cx('auth_subtitle')}>Access to your farm</p>
            </Form.Item>

            <Form.Item
              name='siteId'
              label='SiteId'
              rules={[{ required: true }]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              name='userName'
              label='UserName'
              rules={[
                { required: true },
                {
                  type: 'email',
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
                <Col span={12}>
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
                <Col span={12}>
                  <a
                    className={cx('login_form_forgot')}
                    href=''
                  >
                    Forgot password
                  </a>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <p>
                Have an account yet? <a href={REGISTER_PATH}>Click here</a>{' '}
              </p>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
};

export default LoginForm;
