'use client';
// client component vs server component
import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import styles from '../auth.module.scss';
import Link from 'next/link';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginAsyncApi, resetState } from '@/redux/features/common-slice';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import { loginModel } from '../models/login-model';
import Loading from '@/components/LoadingBtn/Loading';
import { useSession } from 'next-auth/react';
import LoginBtn from '@/components/GoogleLoginButton/LoginBtn';

const cx = classNames.bind(styles);

const Login: React.FC = () => {
  const router = useRouter();
  const { userLogin } = useAppSelector(state => state.authReducer);

  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  useEffect(() => {
    if (userLogin?.access as string) {
      router.push('/dashboard');
    }
  }, [userLogin, router]);

  const handleLogin = async (data: loginModel) => {
    const actionAsyncThunk = loginAsyncApi(data);
    dispatch(actionAsyncThunk);
  };

  return (
    <>
      <div className={cx('auth__form')}>
        <Form onFinish={handleLogin}>
          <h1 className={cx('auth__title')}>Login {session?.user?.email} </h1>

          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Email is required'
              },
              {
                type: 'email',
                message: 'Email is not valid'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            ></Input>
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Password'
              autoComplete='password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className={cx('auth__btn')}
              disabled={userLogin?.status === 'loading' ? true : false}
            >
              {userLogin?.status === 'loading' ? (
                <Loading userState={userLogin?.status} />
              ) : (
                'Login'
              )}
            </Button>
            {/* <Button
              className={cx('')}
              onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}
            >
              Sign in with Google
            </Button> */}
            <LoginBtn />
          </Form.Item>

          {userLogin?.status === 'error' && (
            <p className={cx('auth__error')}>
              Authentication failed, either email or password is not correct
            </p>
          )}

          <p>
            Don&apos;t have an account?{' '}
            <Link
              href='/auth/register'
              onClick={() => dispatch(resetState())}
            >
              Click here
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
