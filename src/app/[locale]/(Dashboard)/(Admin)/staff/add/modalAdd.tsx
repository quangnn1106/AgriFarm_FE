'use client';
import { ConfigProvider, Form, Input, notification } from 'antd';

import styles from '../add/add.module.scss';

import { NotificationPlacement } from 'antd/es/notification/interface';

import ModalCustom from '@/components/ModalCustom/ModalCustom';

import classNames from 'classnames/bind';
import FormRegisterValues from '@/types/register';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import UseAxiosAuth from '@/utils/axiosClient';
import { useTranslations } from 'next-intl';
import { addStaffService } from '@/services/Admin/Staffs/addStaffService';
import { STATUS_CREATED } from '@/constants/https';
import { AddStaffPayLoad } from '@/services/Admin/Staffs/Payload/request/add-staff';

const cx = classNames.bind(styles);
const AddUser = ({
  params
}: {
  params: { siteId: string | undefined; visible: boolean; onCancel: () => void };
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const t = useTranslations('AddStaff');
  const tM = useTranslations('Message');
  const { userRegister } = useAppSelector(state => state.authReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const http = UseAxiosAuth();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `New Admin ${status}`,
      placement,
      duration: 2
    });
  };

  const handleRegister = async (data: AddStaffPayLoad) => {
    console.log('data add staff: ', data);

    const res = await addStaffService(http, params.siteId, data);
    if (res?.data || res?.status === STATUS_CREATED) {
      openNotification('top', `${tM('update_susses')}`, 'success');
      params.onCancel();
      form.resetFields();
      console.log('update staff success', res?.status);
    } else {
      openNotification('top', `${tM('update_error')}`, 'error');
      params.onCancel();
      form.resetFields();
      console.log('update staff fail', res?.status);
    }
  };

  return (
    <>
      {contextHolder}
      <ModalCustom
        open={params.visible}
        title='Thêm mới nhân viên'
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
            onFinish={handleRegister}
          >
            <Form.Item
              name='userName'
              label='Email'
              rules={[
                { required: true, message: `${t('required_mess')}` },
                {
                  type: 'email',
                  message: `${t('email_valid')}`
                }
              ]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='firstName'
              label={t('first_name')}
              rules={[{ required: true, message: `${t('required_mess')}` }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='lastName'
              label={t('last_name')}
              rules={[{ required: true, message: `${t('required_mess')}` }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='password'
              label={t('password')}
              rules={[{ required: true, message: `${t('required_mess')}` }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              label={t('pass_confirm')}
              dependencies={['password']}
              validateTrigger='onBlur'
              hasFeedback
              rules={[
                {
                  required: true,
                  message: `${t('required_mess')}`
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(`${t('pass_confirmError')}`));
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </ModalCustom>
    </>
  );
};
export default AddUser;
