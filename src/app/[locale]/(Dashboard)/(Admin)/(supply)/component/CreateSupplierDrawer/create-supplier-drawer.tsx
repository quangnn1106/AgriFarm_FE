/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import UseAxiosAuth from '@/utils/axiosClient';
import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  Spin,
  Space,
  Button,
  Typography,
  notification,
  Select,
  SelectProps,
  Flex
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { constants } from 'buffer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  BorderlessTableOutlined,
  CloseOutlined,
  DownCircleOutlined,
  FormOutlined,
  FileOutlined,
  BarsOutlined,
  MailOutlined,
  PhoneOutlined,
  AimOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { CreateSupplierDto, SupplierResponse } from '../../../(supply)/models/supplier-models';
import getSuppliersApi from '@/services/Admin/Supply/getSuppliersApi';
import { AxiosInstance } from 'axios';
import getSupplierDetailApi from '@/services/Admin/Supply/getSupplierDetails';
import { createSupplierApi } from '@/services/Admin/Supply/createSupplierApi';

const AddSupplierDrawer: React.FC = () => {
  const t = useTranslations('Common');

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  const http = UseAxiosAuth();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;

  //notification
  const [api, contextHolder] = notification.useNotification();
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

  const initialFormValues = {
    name: '',
    description: '',
    notes: '',
    address: '',
    phone: '',
  };

  //Set selection supplier
  const [options, setOptions] = useState<SelectProps['options']>([]);

  useEffect(() => {
    getListSupplier(http);
  }, [http, isFetching]);

  //get list suppliers
  const getListSupplier = async (http: AxiosInstance) => {
    try {
      await getSuppliersApi(http).then(res => {
        console.log('supplier: ', res?.data);
        setSupplierOptions(res?.data as SupplierResponse[]);
      });
    } catch (error) {
      console.error('Error occurred while get list supplier:', error);
    }
  };

  const setSupplierOptions = (suppliers: SupplierResponse[] | undefined) => {
    const updatedOptions: SelectProps['options'] = [];
    suppliers?.map((item, idx) => {
      updatedOptions?.push({
        value: item.id,
        label: item.name
      });
    });
    setOptions(updatedOptions);
    console.log('Options: ', options);
    setIsFetching(false);
  };


  const onSubmit = async (value: CreateSupplierDto) => {
    try {
      await createSupplierApi(http, value).then(res => {
            if (res.data) {
              openNotification('top', t('Create_successfully'), 'success');
              console.log('create success', res.status);
            } else {
              openNotification('top', t('Create_fail')+ res?.message , 'error');
              console.log('create fail', res.status);
            }
            form.resetFields();
          });
    } catch (error) {
      openNotification('top', t('Create_fail') , 'error');
      console.error('Error occurred while updating season:', error);
    }
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={isFetching}>
      <Form
          disabled={!componentDisabled}
          form={form}
          colon={false}
          layout={'horizontal'}
          labelCol={{ span: 10 }}
          labelWrap
          wrapperCol={{ span: 18 }}
          onFinish={onSubmit}
          style={{ paddingTop: '1rem' }}
          size='middle'
        >
          <Form.Item
            name='name'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Name')}
              </>
            }
          >
            <Input placeholder='Nhập dữ liệu' />
          </Form.Item>
          <Form.Item
            name='email'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <MailOutlined style={{ marginRight: '0.5rem' }} /> Email
              </>
            }
          >
            <Input placeholder='Nhập dữ liệu' />
          </Form.Item>
          <Form.Item
            name='phone'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <PhoneOutlined style={{ marginRight: '0.5rem' }} /> Phone
              </>
            }
          >
            <Input placeholder='Nhập dữ liệu' />
          </Form.Item>
          <Form.Item
            name='address'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <EnvironmentOutlined style={{ marginRight: '0.5rem' }} /> Address
              </>
            }
          >
            <Input placeholder='Nhập dữ liệu' />
          </Form.Item>
          <Form.Item
            name='description'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Description')}{' '}
              </>
            }
          >
            <TextArea
              autoSize={{ minRows: 1, maxRows: 6 }}
              placeholder='Nhập dữ liệu'
            />
          </Form.Item>
          <Form.Item
            name='notes'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} /> Notes
              </>
            }
          >
            <TextArea
              autoSize={{ minRows: 1, maxRows: 6 }}
              placeholder='Nhập dữ liệu'
            />
          </Form.Item>
          <Flex
            style={{ width: '100%' }}
            justify='end'
          >
            <Button
              htmlType='submit'
              type='primary'
              loading={isFetching}
              icon={<FileOutlined />}
              className='bg-btn'
            >
              Save
            </Button>
            </Flex>
        </Form>
      </Spin>
    </>
  );
};
export default AddSupplierDrawer;
