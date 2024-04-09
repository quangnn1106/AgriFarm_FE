'use client';

import { useState } from 'react';
import { Form, Input, Button, Row, Col, ConfigProvider, Flex } from 'antd';
import styles from './forgot.module.scss';

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
  RESET_PASS_PATH,
  TIME_TABLE_PATH
} from '@/constants/routes';
import { Link } from '@/navigation';

import { ROLES } from '@/constants/roles';

const cx = classNames.bind(styles);
export const renderPath: (role: string) => string = (role: string): string => {
  if (role === ROLES.SUPER_ADMIN) {
    return DASH_BOARD_PATH;
  }
  if (role === ROLES.ADMIN) {
    return DASHBOARD_ADMIN;
  }
  if (role === ROLES.MEMBER) {
    return TIME_TABLE_PATH;
  }
  console.log(' return HOME_PATH');

  // Add a default return value in case the role doesn't match any condition
  return HOME_PATH; // You need to define DEFAULT_PATH according to your application logic
};
const ForgotForm: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || renderPath(userRole);

  const handleLogin = async (data: loginModel) => {
    // try {
    //   console.log('data: ', data.siteCode);
    //   setLoading(true);
    //   const res = await signIn('credentials', {
    //     // siteCode: data?.siteCode as string,
    //     userName: data?.userName as string,
    //     password: data?.password as string,
    //     redirect: false,
    //     callbackUrl
    //   });
    //   setLoading(false);

    //   if (!res?.error) {
    //     setError('');
    //     router.push(callbackUrl as string);
    //   } else {
    //     setError('Invalid User or password');
    //     console.log(error);
    //   }
    // } catch (error: any) {
    //   setLoading(false);
    //   setError(error?.message);
    // }
    console.log('click confirm email to reset pass');
    router.push(RESET_PASS_PATH)
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
              <h1 className={cx('auth__title')}>Xác nhận email</h1>
              <p className={cx('auth_subtitle')}>
                Nhập email đăng ký của bạn để cài lại mật khẩu đã quên
              </p>
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

            <Form.Item>
              {/* <Row
                justify='end'
                className={cx('form_btn')}
              >
                <Col span={12}>
                  <a
                    className={cx('login_form_forgot')}
                    href=''
                  >
                    Forgot password
                  </a>
                </Col>
                <Col
                  className='d-flex jus-end'
                  span={24}
                >
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
              </Row> */}
              <Flex justify='end'>
                {error && <p className={cx('auth__error')}>{error}</p>}

                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  className={cx('auth__btn')}
                  disabled={loading ? true : false}
                >
                  {loading ? <Loading userState={status} /> : 'Confirm'}
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
};

export default ForgotForm;
