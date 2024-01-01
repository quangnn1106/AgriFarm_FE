'use client';
import { Form, Input, Button } from 'antd';
import styles from '../auth.module.scss';
import Link from 'next/link';
import classNames from 'classnames/bind';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { registerModel } from '../models/register-model';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registerAsyncApi, resetState } from '@/redux/features/common-slice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/LoadingBtn/Loading';

const cx = classNames.bind(styles);

const Login: React.FC = () => {
  const router = useRouter();
  const { userRegister } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userRegister?.status === 'done') {
      dispatch(resetState());
      router.push('/auth/login');
    }
  }, [userRegister, router, dispatch]);

  const handleRegister = async (data: registerModel) => {
    const actionAsyncThunk = registerAsyncApi(data);
    dispatch(actionAsyncThunk);
  };

  return (
    <>
      <div className={cx('auth__form')}>
        <Form onFinish={handleRegister}>
          <h1 className={cx('auth__title')}>Register</h1>

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
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className={cx('auth__btn')}
              disabled={userRegister?.status === 'loading' ? true : false}
            >
              {userRegister?.status === 'loading' ? (
                <Loading userState={userRegister?.status} />
              ) : (
                'Register'
              )}
            </Button>
          </Form.Item>

          {userRegister?.status === 'error' && (
            <p className={cx('auth__error')}>The email has already been registered!</p>
          )}

          <p>
            Already have an account?{' '}
            <Link
              href='/auth/login'
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
