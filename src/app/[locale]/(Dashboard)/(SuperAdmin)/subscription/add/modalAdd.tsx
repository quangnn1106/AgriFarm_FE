'use client';
import { Col, ConfigProvider, Form, Input, Modal, Row, notification } from 'antd';

import styles from '../add/add.module.scss';
import TextArea from 'antd/es/input/TextArea';
import { NotificationPlacement } from 'antd/es/notification/interface';
import LabelFormItem from '../components/LabelFormItem';
import ModalCustom from '@/components/ModalCustom/ModalCustom';
import { formItemLayout } from '@/components/FormItemLayout/formItemLayout';
import classNames from 'classnames/bind';
import FormRegisterValues from '@/types/register';
import { registerAsyncApi } from '@/redux/features/common-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import { STATUS_ACCEPTED } from '@/constants/https';
const cx = classNames.bind(styles);
const AddUser = ({ params }: { params: { visible: boolean; onCancel: () => void } }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { userRegister } = useAppSelector(state => state.authReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

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

  const handleRegister = async (data: FormRegisterValues) => {
    console.log('data register: ', data);
    const actionAsyncThunk = registerAsyncApi(data);
    dispatch(actionAsyncThunk);
    if (userRegister?.status === STATUS_ACCEPTED) {
      // Assuming 201 indicates successful creation
      console.log('susscess create admmin');

      openNotification('top', 'has been created successfully!', 'success');
      params.onCancel();
      form.resetFields();
    } else {
      openNotification('top', 'has been created failed! Please try again later', 'error');
      params.onCancel();
      form.resetFields();
    }
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
        {/* <Form
        {...formItemLayout}
        form={form}
        colon={false}
        scrollToFirstError
        style={{ overflowY: 'auto', maxHeight: 'calc(63vh)', marginTop: '50px' }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name='firstName'
              label={<LabelFormItem name='First Name' />}
              rules={[
                {
                  required: true,
                  message: 'Please input First Name!'
                }
              ]}
            >
              <Input className={styles.bigblue} />
            </Form.Item>

            <Form.Item
              name='lastName'
              label={<LabelFormItem name='Last Name' />}
              rules={[
                {
                  required: true,
                  message: 'Please input Last Name!'
                }
              ]}
            >
              <Input className={styles.bigblue} />
            </Form.Item>
            <Form.Item
              name='userName'
              label={<LabelFormItem name='User Name' />}
              rules={[
                {
                  required: true,
                  message: 'Please input User Name!'
                }
              ]}
            >
              <Input className={styles.bigblue} />
            </Form.Item>

            <Form.Item
              name='password'
              label={<LabelFormItem name='Password' />}
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              label={<LabelFormItem name='Confirm Password' />}
              rules={[{ required: true, message: 'Confirm Password is required' }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form> */}

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
              label='Address'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='siteCode'
              label='Farm code'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='siteName'
              label='Farm Name'
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='firstName'
              label='First Name'
              rules={[{ required: true }]}
            >
              <Input size='middle' />
            </Form.Item>

            <Form.Item
              name='lastName'
              label='Last name'
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
          </Form>
        </ConfigProvider>
      </ModalCustom>
    </>
  );
};
export default AddUser;
