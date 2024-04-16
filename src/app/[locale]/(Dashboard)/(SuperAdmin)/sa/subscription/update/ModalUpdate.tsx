'use client';
import { Col, ConfigProvider, Form, Input, Modal, Row, notification } from 'antd';

import styles from './update.module.scss';

import { NotificationPlacement } from 'antd/es/notification/interface';

import ModalCustom from '@/components/ModalCustom/ModalCustom';

import classNames from 'classnames/bind';
import FormRegisterValues from '@/types/register';

import { useAppDispatch } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import UseAxiosAuth from '@/utils/axiosClient';
import { UserModel } from '../models/user-model';
import { useTranslations } from 'next-intl';
const cx = classNames.bind(styles);
const UpdateFormRegis = ({
  params
}: {
  params: { visible: boolean; onCancel: () => void; dataRow?: UserModel };
}) => {
  const [form] = Form.useForm();
  const t = useTranslations('FormRegister');
  const msg = useTranslations('Message');

  const [api, contextHolder] = notification.useNotification();

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const http = UseAxiosAuth();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `${status}`,
      placement,
      duration: 2
    });
  };
  useEffect(() => {
    form.setFieldsValue(params?.dataRow);
  }, [form, params?.dataRow]);

  const handleRegisterUpdate = async (data: FormRegisterValues) => {
    console.log('data register: ', data);
    const createAccountBody: FormRegisterValues = {
      ...data,
      paymentDetail: '123',
      solutionId: '45aa6629-5e67-4c70-aa9c-eed4e82e7da6'
    };
    http
      .post('/register/Registry/Post', createAccountBody)
      .then(data => {
        if (data) {
          //   console.log('test data status succsess', data);

          //   console.log('susscess create admmin');
          // Assuming 201 indicates successful creation
          openNotification('top', `${msg('update_susses')}`, 'success');
          params.onCancel();
          form.resetFields();
        }
      })
      .catch(e => {
        console.error(e);
        console.log('test data status', e?.response?.message as string);

        openNotification('top', `${msg('update_error')}`, 'error');
        params.onCancel();

        form.resetFields();
      });
    // const actionAsyncThunk = registerAsyncApi(data);
    // dispatch(actionAsyncThunk);

    // if (userRegister?.status === STATUS_OK) {
    //   // Assuming 201 indicates successful creation
    //   console.log('userRegister?.status: ', userRegister?.status);

    //   console.log('susscess create admmin');

    //   openNotification('top', 'has been created successfully!', 'success');
    //   params.onCancel();
    //   form.resetFields();
    // } else {
    //   console.log('failed failed create admmin');

    //   openNotification('top', 'has been created failed! Please try again later', 'error');
    //   params.onCancel();
    //   form.resetFields();
    // }
  };

  return (
    <>
      {contextHolder}
      <ModalCustom
        open={params.visible}
        title='Update Form'
        width='50%'
        style={{ top: 40, maxWidth: 1000 }}
        keyboard
        onOk={form.submit}
        onCancel={() => {
          params.onCancel();
          //openNotification('top', 'create process have been cancel!', 'error');
        }}
      >
        <hr style={{ border: '1px solid #eee' }}></hr>
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
            layout='vertical'
            autoComplete='off'
            form={form}
            onFinish={handleRegisterUpdate}
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
              name='address'
              label={t('address_form')}
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='siteCode'
              label={t('farm_code')}
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='siteName'
              label={t('farm_name')}
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='firstName'
              label={t('first_name')}
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='lastName'
              label={t('last_name')}
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='phone'
              label={t('phone_number')}
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </ModalCustom>
    </>
  );
};
export default UpdateFormRegis;
