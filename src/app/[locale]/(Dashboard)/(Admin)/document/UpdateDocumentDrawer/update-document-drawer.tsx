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
import { CreateDocumentDto, DocumentResponse, UpdateDocumentDto } from '../models/document-models';
import getDocumentsApi from '@/services/Admin/Document/getDocumentsApi';
import { FileType } from '@/components/Upload/uploadAvatar';
import { UploadFileApi } from '@/services/Admin/Document/createDocumentApi';
import { updateDocumentApi } from '@/services/Admin/Document/updateDocumentApi';
import getDocumentDetailApi from '@/services/Admin/Document/getDocumentDetailApi';
import dayjs from 'dayjs';

interface FileResponse {
  data: string;
  status: number;
  message: string | null;
}

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
  const dateFormat = 'DD/MM/YYYY';

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


  //Set selection document
  const [options, setOptions] = useState<SelectProps['options']>([]);


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

  const [documnetDetails, setDocumentDetails] = useState<DocumentResponse>();

  const getDocumentDetails = async (documentId: string, http: AxiosInstance) => {
    try {
        await getDocumentDetailApi(documentId, http).then(res => {
          setDocumentDetails(res.data as DocumentResponse);
          form?.setFieldsValue({
            ...res?.data,
            createdDate: documnetDetails?.createdDate
            ? dayjs(`${documnetDetails?.createdDate}`).format(dateFormat)
            : '',
          });
          console.log(form.getFieldsValue());
        })
    } catch (error) {
      console.error('Error occurred while get list document:', error);
    }
  }

  useEffect(() => {
    getListDocument(siteId,http);
    getDocumentDetails(params.documentId, http)
  }, [http, isFetching, componentDisabled, params.documentId]);

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


  const onSubmit = async (value: UpdateDocumentDto) => {
    try {
      const formData = new FormData();
      formData?.append('file', file?.originFileObj as FileType);
      console.log(file);
      await UploadFileApi(http, formData).then(async res => {
        let data = res.data;
        if(data == undefined) {
          data = form.getFieldValue('url');
        }
        setUrl(data);
        await updateDocumentApi(params.documentId ,http, {
          title: value.title,
          description: value.description,
          url: data
        }).then(res => {
          if (res.data) {
            openNotification('top', 'Cập nhật thành công!', 'success');
            console.log('create success', res.status);
            
          } else {
            openNotification('top', 'Cập nhật thất bại' + res?.message, 'error');
            console.log('create fail', res.status);
          }
        });
      });
      // uploadFileApi(http)
    } catch (error) {
      openNotification('top', 'Cập nhật thất bại', 'error');
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
                <LinkOutlined style={{ marginRight: '0.5rem' }} /> File link
              </>
            }
          >
            <Input placeholder={t('Type_data')} />
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
                <CalendarOutlined style={{ marginRight: '0.5rem' }} /> Description
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
                <CalendarOutlined style={{ marginRight: '0.5rem' }} /> Ngày tạo
              </>
            }
          >
            <Input placeholder={t('Type_data')} />
          </Form.Item>
          <Upload onChange={handleChange}>
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
