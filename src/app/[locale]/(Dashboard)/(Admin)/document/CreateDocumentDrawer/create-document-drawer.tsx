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
  Upload,
  UploadFile
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
import getDocumentsApi from '@/services/Admin/Document/getDocumentsApi';
import {
  createDocumentApi
} from '@/services/Admin/Document/createDocumentApi';
import { RcFile } from 'antd/es/upload';
import { FileType } from '@/components/Upload/uploadAvatar';
import { UploadFileApi } from '@/services/Admin/Media/uploadFileApi';


interface FileResponse {
  data: string;
  status: number;
  message: string | null;
}


const AddDocumentDrawer: React.FC = () => {
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
    title: '',
    url: '',
    description: ''
  };

  //Set selection document
  const [options, setOptions] = useState<SelectProps['options']>([]);

  useEffect(() => {
    getListDocument(siteId, http);
  }, [http, isFetching]);

  //get list documents
  const getListDocument = async (siteId: string | undefined, http: AxiosInstance) => {
    try {
      await getDocumentsApi(siteId, http).then(res => {
        console.log('document: ', res?.data);
        setDocumentOptions(res?.data as DocumentResponse[]);
      });
    } catch (error) {
      console.error('Error occurred while get list document:', error);
    }
  };

  const setDocumentOptions = (documents: DocumentResponse[] | undefined) => {
    const updatedOptions: SelectProps['options'] = [];
    documents?.map((item, idx) => {
      updatedOptions?.push({
        value: item.id,
        label: item.title
      });
    });
    setOptions(updatedOptions);
    console.log('Options: ', options);
    setIsFetching(false);
  };

  // const [file, setFile] = useState<File>();
  const [file, setFile] = useState<UploadFile>();

  const [url, setUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = ({ file: newFile }) => {
    setFile(newFile);
  };

  const uploadFileApi = async (http: AxiosInstance) => {
    try {
      const formData = new FormData();
      formData?.append('file', file?.originFileObj as FileType);
      console.log(file);
      const response = await UploadFileApi(http, formData);
      let data = response.data as FileResponse;
      setUrl(data.data);
      console.log('url:', data);
      return data.data;
    } catch (error) {
      console.error('Error calling API getListDocumentsApi:', error);
    }
  };
  const onSubmit = async (value: CreateDocumentDto) => {
    try {
      const formData = new FormData();
      formData?.append('file', file?.originFileObj as FileType);
      console.log(file);
      await UploadFileApi(http, formData).then(async res => {
        let data = res.data;
        setUrl(data);
        await createDocumentApi(http, {
          title: value.title,
          description: value.description,
          url: data
        }).then(res => {
          if (res.data) {
            openNotification('top', t('Create_successfully'), 'success');
            console.log('create success', res.status);
            
          } else {
            openNotification('top', t('Create_fail') + res?.message, 'error');
            console.log('create fail', res.status);
          }
          form.resetFields();
        });
      });
      // uploadFileApi(http)
    } catch (error) {
      openNotification('top', t('Create_fail'), 'error');
      console.error('Error occurred while updating season:', error);
    }
  };

  // useEffect (() => {
  //   uploadFileApi(http)
  // }, [file])

  return (
    <>
      {contextHolder}
      <Spin spinning={isFetching}>
        <Form
          disabled={!componentDisabled}
          form={form}
          initialValues={initialFormValues}
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
            name='title'
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
            name='url'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <LinkOutlined style={{ marginRight: '0.5rem' }} /> Đường dẫn (url)
              </>
            }
          >
            <Input
              placeholder={t('Type_data')}
              value={url}
            />
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
                <CalendarOutlined style={{ marginRight: '0.5rem' }} /> Mô tả
              </>
            }
          >
            <Input placeholder={t('Type_data')} />
          </Form.Item>
          {/* <input type="file" onChange={(e)=>{
              setFile(e.target.files?.[0]);
          }}></input> */}
          <Upload onChange={handleChange}>
            <Button icon={<UploadOutlined />}>Tải tệp lên</Button>
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
              style={{marginTop: '1rem'}}
            >
              {t('Save')}
            </Button>
          </Flex>
        </Form>
      </Spin>
    </>
  );
};
export default AddDocumentDrawer;
