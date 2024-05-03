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
import { verifyTokenService } from '@/services/Common/ResetPassword/resetPassService';
import UseAxiosAuth from '@/utils/axiosClient';
import { VerifyTokenRequest } from '@/services/Common/ResetPassword/request/reset.pass.request';

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

interface IProps{
  email: string
}

const VerifyForm: React.FC<IProps> = ({email}) => {
  const http = UseAxiosAuth()
  const router = useRouter();

  const { data: session, status } = useSession();
  const userRole = session?.user?.userInfo?.role as ROLES;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || renderPath(userRole);

  const handleLogin = async (data: VerifyTokenRequest) => {
    try {
      setLoading(true);
      data.email = email
      console.log("send data: ", data)
      const res = await verifyTokenService(http, data)
      
      if (res.status ===202 && res.data && res.data.length>0) {
        // setError('');
        console.log('data: ',res.data);
        router.push(RESET_PASS_PATH+"?id="+btoa(res.data as string));
      } else throw new Error()
    } catch (err) {
      // setError(error?.message);
      router.push("/forgot")
      console.log('Error: ',err);
    }finally{
      
      setLoading(false);
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
              <h1 className={cx('auth__title')}>Nhập mã xác nhận</h1>
              <p className={cx('auth_subtitle')}>
                Nhập mã đã được gửi qua email của bạn để cài lài mật khẩu
              </p>
            </Form.Item>

            <Form.Item
              name='token'
              label='Mã xác nhận'
              rules={[
                { required: true },
                {
                  type: 'string',
                  message: 'Code is not valid'
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
                  {loading ? <Loading userState={status} /> : 'Xác nhận'}
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
};

export default VerifyForm;
