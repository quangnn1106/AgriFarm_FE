'use client';
import { Col, ConfigProvider, Form, Input, Modal, Row, notification } from 'antd';

import styles from './add.module.scss';

import { NotificationPlacement } from 'antd/es/notification/interface';

import ModalCustom from '@/components/ModalCustom/ModalCustom';

import classNames from 'classnames/bind';
import FormRegisterValues from '@/types/register';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import UseAxiosAuth from '@/utils/axiosClient';
import { useTranslations } from 'next-intl';
import { SolutionId } from '@/constants/requestConst';
import TextArea from 'antd/es/input/TextArea';
const cx = classNames.bind(styles);
const AddCertificate = ({
  params
}: {
  params: { visible: boolean; onCancel: () => void };
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const t = useTranslations('Common');
  const msg = useTranslations('Message');
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

  // useEffect(() => {
  //   // if (userRegister?.status === STATUS_ACCEPTED) {
  //   //   // Assuming 201 indicates successful creation
  //   //   console.log('userRegister?.status: ', userRegister?.status);

  //   //   console.log('susscess create admmin');

  //   //   openNotification('top', 'has been created successfully!', 'success');
  //   //   params.onCancel();
  //   //   form.resetFields();
  //   // } else {
  //   //   console.log('failed failed create admmin');

  //   //   openNotification('top', 'has been created failed! Please try again later', 'error');
  //   //   params.onCancel();
  //   //   form.resetFields();
  //   // }
  // }, [dispatch, form, params, userRegister]);

  const handleRegister = async (data: FormRegisterValues) => {
    console.log('data register: ', data);
    const createAccountBody: FormRegisterValues = {
      ...data,
      paymentDetail: '123',
      solutionId: SolutionId
    };
    http
      .post('/register/Registry/Post', createAccountBody)
      .then(data => {
        if (data) {
          console.log('test data status succsess', data);

          console.log('susscess create admmin');
          // Assuming 201 indicates successful creation
          openNotification('top', 'has been created successfully!', 'success');
          params.onCancel();
          form.resetFields();
        }
      })
      .catch(e => {
        console.error(e);
        console.log('test data status', e?.response?.message as string);

        openNotification(
          'top',
          'has been created failed! Please try again later',
          'error'
        );
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
        title='Add new Farm Admin'
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
              name='name'
              label='Name'
              rules={[
                { required: true }
                // {
                //   type: 'email',
                //   message: 'Email is not valid'
                // }
              ]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='provider'
              label='Đơn vị cấp'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='description'
              label='Mô tả'
              rules={[{ required: true }]}
            >
              <TextArea
                rows={4}
                placeholder={t('Type_data')}
              />
            </Form.Item>

            <Form.Item
              name='url'
              label='Dán đường dẫn chứng chỉ của bạn'
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
export default AddCertificate;
