'use client';

import { useState } from 'react';
import { Form, Input, Button, Row, Col, ConfigProvider } from 'antd';
import styles from '../auth.module.scss';

import classNames from 'classnames/bind';
import { loginModel } from '../models/login-model';
import Loading from '@/components/LoadingBtn/Loading';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  DASHBOARD_ADMIN,
  DASH_BOARD_PATH,
  HOME_PATH,
  REGISTER_PATH,
  TIME_TABLE_PATH
} from '@/constants/routes';
import { Link } from '@/navigation';
import { hasDuplicate } from '@/utils/checkUrl';
import { ROLES } from '@/constants/roles';
import Loader from '@/components/Loader/Loader';

const cx = classNames.bind(styles);
export const renderPath: (role: string) => string = (role: string): string => {
  if (role === ROLES.SUPER_ADMIN) {
    return DASH_BOARD_PATH;
  }
  if (role === ROLES.ADMIN || ROLES.MANAGER) {
    return DASHBOARD_ADMIN;
  }
  if (role === ROLES.MEMBER) {
    return TIME_TABLE_PATH;
  }
  console.log(' return HOME_PATH');

  // Add a default return value in case the role doesn't match any condition
  return HOME_PATH; // You need to define DEFAULT_PATH according to your application logic
};
const LoginForm: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || renderPath(userRole);

  const handleLogin = async (data: loginModel) => {
    try {
      console.log('data: ', data.siteCode);
      setLoading(true);
      const res = await signIn('credentials', {
        // siteCode: data?.siteCode as string,
        userName: data?.userName as string,
        password: data?.password as string,
        redirect: false,
        callbackUrl
      });
      setLoading(false);

      if (!res?.error) {
        setError('');
        if (status === 'loading') {
          return (
            <Loader
              fullScreen
              spinning={true}
            />
          );
        }
        router.push(callbackUrl as string);
      } else {
        setError('Sai mật khẩu hoặc email');
        console.log(error);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error?.message);
    }
  };
  if (status === 'loading') {
    return (
      <Loader
        fullScreen
        spinning={true}
      />
    );
  }

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
              <h1 className={cx('auth__title')}>Đăng nhập {session?.user?.email} </h1>
              <p className={cx('auth_subtitle')}>Truy cập vào nông trại của bạn</p>
            </Form.Item>

            <Form.Item
              name='siteId'
              label='Mã số nông trại'
              rules={[{ required: false }]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              name='userName'
              label='Email'
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
              label='Mật khẩu'
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
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
                    {loading ? <Loading userState={status} /> : 'Đăng nhập'}
                  </Button>
                </Col>
                <Col span={12}>
                  <a
                    className={cx('login_form_forgot')}
                    href=''
                  >
                    Quên mật khẩu
                  </a>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <p>
                Chưa có tài khoản? <Link href={REGISTER_PATH}>Ấn vào đây</Link>{' '}
              </p>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
};

export default LoginForm;
