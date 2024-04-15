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
  Flex,
  UploadProps,
  Upload
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
  LinkOutlined,
  PhoneOutlined,
  AimOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  UploadOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { NotificationPlacement } from 'antd/es/notification/interface';

import { AxiosInstance } from 'axios';
import { CreateDocumentDto, DocumentResponse } from '../models/document-models';

const props: UploadProps = {
  action: 'ec2-3-109-154-96.ap-south-1.compute.amazonaws.com/api/v1/files/upload',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'uploading',
      url: 'http://www.baidu.com/xxx.png',
      percent: 33,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
};

const UpdateDocumentDrawer = ({
  params
}: {
  params: {
    documentId: string;
  };
}) => {
  const t = useTranslations('Common');

  const [isFetching, setIsFetching] = useState<boolean>(false);
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
    name: 'Tài liệu',
    fileLink: 'http://www.baidu.com/yyy.png',
    createdDate: '20-10-2024',
  };

  //Set selection document
  const [options, setOptions] = useState<SelectProps['options']>([]);

  useEffect(() => {
    getListDocument(http);
  }, [http, isFetching]);

  //get list documents
  const getListDocument = async (http: AxiosInstance) => {
    // try {
    //   await getDocumentsApi(http).then(res => {
    //     console.log('document: ', res?.data);
    //     setDocumentOptions(res?.data as DocumentResponse[]);
    //   });
    // } catch (error) {
    //   console.error('Error occurred while get list document:', error);
    // }
  };

  const setDocumentOptions = (documents: DocumentResponse[] | undefined) => {
    const updatedOptions: SelectProps['options'] = [];
    documents?.map((item, idx) => {
      updatedOptions?.push({
        value: item.id,
        label: item.name
      });
    });
    setOptions(updatedOptions);
    console.log('Options: ', options);
    setIsFetching(false);
  };


  const onSubmit = async (value: CreateDocumentDto) => {
    // try {
    //   await createDocumentApi(http, value).then(res => {
    //         if (res.data) {
    //           openNotification('top', t('Create_successfully'), 'success');
    //           console.log('create success', res.status);
    //         } else {
    //           openNotification('top', t('Create_fail')+ res?.message , 'error');
    //           console.log('create fail', res.status);
    //         }
    //         form.resetFields();
    //       });
    // } catch (error) {
    //   openNotification('top', t('Create_fail') , 'error');
    //   console.error('Error occurred while updating season:', error);
    // }
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
          initialValues={initialFormValues}
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
            <Input placeholder={t('Type_data')} />
          </Form.Item>
          <Form.Item
            name='fileLink'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <LinkOutlined style={{ marginRight: '0.5rem' }} /> File link
              </>
            }
          >
            <Input placeholder={t('Type_data')} />
          </Form.Item>
          <Form.Item
            name='createdDate'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <CalendarOutlined style={{ marginRight: '0.5rem' }} /> Create date
              </>
            }
          >
            <Input placeholder={t('Type_data')} />
          </Form.Item>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
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
              {t('Save')}
            </Button>
          </Flex>
        </Form>
      </Spin>
    </>
  );
};
export default UpdateDocumentDrawer;
