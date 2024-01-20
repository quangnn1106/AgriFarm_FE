'use client';
import { Form, Input, Button, Row, Col, ConfigProvider, Checkbox } from 'antd';
import styles from '../auth.module.scss';

import classNames from 'classnames/bind';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { registerModel } from '../models/register-model';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registerAsyncApi, resetState } from '@/redux/features/common-slice';
import { useEffect } from 'react';

import Loading from '@/components/LoadingBtn/Loading';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(styles);

const RegisterForm: React.FC = () => {
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
        <Form.Item
          style={{
            marginBottom: '5px'
          }}
        >
          <h1 className={cx('auth__title')}>Register Farm</h1>
          <p className={cx('auth_subtitle')}>
            Register information to receive a farm management account
          </p>
        </Form.Item>

        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 10,
                verticalLabelPadding: '0 0 0',
                labelFontSize: 12,
                labelColor: 'rgb(133, 133, 133)'
              }
            }
          }}
        >
          <Form
            onFinish={handleRegister}
            layout='vertical'
            autoComplete='off'
          >
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
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='provinceCity'
              label='Province/City'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='FarmCode'
              label='Farm code'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='farmName'
              label='Farm Name'
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='fullName'
              label='Your full name'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='phone'
              label='Phone'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item>
              <Row
                align='middle'
                className={cx('form_btn')}
              >
                <Col span={24}>
                  <Form.Item
                    name='agreement'
                    valuePropName='checked'
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error('Should accept agreement'))
                      }
                    ]}
                  >
                    <Checkbox>
                      Agree to our{' '}
                      <a
                        href=''
                        target=''
                      >
                        Terms
                      </a>{' '}
                      of use and{' '}
                      <a
                        href=''
                        target=''
                      >
                        Privacy Policy
                      </a>{' '}
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    className={cx('auth__btn_regis')}
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <p style={{ marginTop: '0', marginBottom: '5px' }}>Have an account yet</p>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                className={cx('regis__btn')}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
};

export default RegisterForm;
