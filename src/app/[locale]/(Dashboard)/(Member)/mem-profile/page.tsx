'use client';
import {
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
  Upload,
  notification
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import type {
  DatePickerProps,
  FormInstance,
  RadioChangeEvent,
  TableProps,
  UploadFile,
  UploadProps
} from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { PlusOutlined, CameraOutlined, HomeOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import { useTranslations } from 'next-intl';
import styles from '../../(SuperAdmin)/sa/management-page.module.scss';
import { Content } from 'antd/es/layout/layout';

import { AxiosInstance } from 'axios';
import {
  getMemProfileService,
  getStaffsServiceDetails
} from '@/services/Admin/Staffs/getStaffsService';

dayjs.extend(customParseFormat);
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { STATUS_OK } from '@/constants/https';
import Image from 'next/image';
import {
  updateMemProfileService,
  updateStaffService
} from '@/services/Admin/Staffs/updateStaffService';

import { formItemLayout } from '@/components/FormItemLayout/formItemLayout';
import TitleLabelFormItem from '@/components/TitleLabel/TitleLabelFormItem';
import { NotificationPlacement } from 'antd/es/notification/interface';
import StaffsDetails from '@/services/Admin/Staffs/Payload/response/staffs-detail';
import { updateStaffPayLoad } from '@/services/Admin/Staffs/Payload/request/update-staff';

import Link from 'next/link';
import MemCertificate from '../mem-certificate/mem-certiTable';
import { MEM_PROFILE_PATH } from '@/constants/routes';
// import { CertificationModel } from '../staff/models/certificationModel';
// import { certificationTableColumn } from '../staff/update/certificationColumnType';

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const cx = classNames.bind(styles);

//config upload image

type GetProps<T extends React.ComponentType<any> | object> =
  T extends React.ComponentType<infer P> ? P : T extends object ? T : never;
type GetProp<
  T extends React.ComponentType<any> | object,
  PropName extends keyof GetProps<T>
> = NonNullable<GetProps<T>[PropName]>;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const UpdateUser = ({
  params
}: {
  params: { id: string; visible: boolean; onCancel: () => void };
}) => {
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const userId = session?.user.userInfo.id;
  const siteName = session?.user.userInfo.siteName;
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const tU = useTranslations('UserManagement');
  const t = useTranslations('Common');
  const tM = useTranslations('Message');

  const http = UseAxiosAuth();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `Profile ${status}`,
      placement,
      duration: 2
    });
  };

  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={MEM_PROFILE_PATH}>Profile</Link>
    }
  ];

  //Upload image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error'
    }
  ]);

  const [staffsDetail, setStaffDetail] = useState<StaffsDetails | undefined>();
  // const [gender, setGender] = useState<number>(staffsDetail?.gender as number);
  // console.log('staffsDetail?.gender as number: ', staffsDetail?.gender as number);

  // const handleChangeGender = (e: RadioChangeEvent) => {
  //   console.log('radio checked', e.target.value);

  //   setGender(e.target.value);
  // };

  useEffect(() => {
    const fetchStaffsDetails = async (
      http: AxiosInstance,
      siteId?: string,
      userId?: string,
      form?: FormInstance
    ) => {
      try {
        const responseData = await getMemProfileService(null, http, null);
        if (responseData.status === STATUS_OK) {
          //  console.log('status ok: ', responseData?.data);
          setStaffDetail(responseData?.data as StaffsDetails);
          //  console.log('stafff detail: ', responseData?.data?.id) ;

          form?.setFieldsValue({
            ...responseData?.data,
            isLockout: staffsDetail?.isLockout == true ? 'Lockout' : 'Active',
            onboarding: dayjs(`${staffsDetail?.onboarding}`, dateFormat),
            dob: staffsDetail?.dob ? dayjs(`${staffsDetail?.dob}`, dateFormat) : ''
          });
        }
        setIsFetching(false);
      } catch (error) {
        console.error('Error calling API Staffs:', error);
      }
    };

    fetchStaffsDetails(http, siteId, userId, form);
  }, [
    form,
    http,
    userId,
    siteId,
    staffsDetail?.dob,
    staffsDetail?.isLockout,
    staffsDetail?.onboarding
  ]);

  const handleUpdateStaffs = async (value: updateStaffPayLoad) => {
    // const updatePayload: updateStaffPayLoad = {
    //   ...value
    // };
    //console.log('value update: ', updatePayload);
    setIsFetching(true);
    const res = await updateMemProfileService(http, null, value);
    if (res.data) {
      setIsFetching(false);
      openNotification('top', `${tM('update_susses')}`, 'success');

      console.log('update staff success', res.status);
    } else {
      openNotification('top', `${tM('update_error')}`, 'error');

      //console.log('update staff fail', res.status);
    }
    // setUserId(id);
    // setUpdateState(true);
  };

  // const onChange: TableProps<CertificationModel>['onChange'] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log('params', pagination, filters, sorter, extra);
  // };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  // const data: CertificationModel[] = [];
  // for (let i = 0; i < 10; i++) {
  //   data.push({
  //     id: 'example_id' + i,
  //     certification_name: 'Test certification',
  //     expired_time: '20/10/2024',
  //     link_certification: 'Example Link'
  //   });
  // }

  return (
    <>
      {contextHolder}

      <ConfigProvider
        theme={{
          components: {
            Button: {
              contentFontSizeLG: 24,
              fontWeight: 700,
              groupBorderColor: 'transparent',
              onlyIconSizeLG: 24,
              paddingBlockLG: 0,
              defaultBorderColor: 'transparent',
              defaultBg: 'transparent',
              defaultShadow: 'none',
              primaryShadow: 'none',
              linkHoverBg: 'transparent',
              paddingInlineLG: 24,
              defaultGhostBorderColor: 'transparent'
            }
          }
        }}
      >
        <Button
          className={cx('home-btn')}
          href='#'
          size={'large'}
          style={{ padding: 24 }}
        >
          <HomeOutlined />
          {siteName}
        </Button>
      </ConfigProvider>

      <Breadcrumb
        style={{ margin: '0px 24px' }}
        items={breadCrumb}
      ></Breadcrumb>

      <Content style={{ padding: '0 24px' }}>
        <Flex
          align='center'
          justify='end'
        >
          <Checkbox
            checked={componentDisabled}
            onChange={e => setComponentDisabled(e.target.checked)}
          >
            {tU('edit_information')}
          </Checkbox>
        </Flex>
        <Spin spinning={isFetching}>
          <Form
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 14 }}
            form={form}
            colon={false}
            layout='vertical'
            name='updateStaffs'
            {...formItemLayout}
            disabled={!componentDisabled}
            onFinish={handleUpdateStaffs}

            // style={{ maxWidth: 600 }
          >
            <Row>
              <Col
                xs={24}
                sm={12}
                style={{ maxWidth: '100%' }}
              >
                <label className={cx('group-info-label')}>{tU('PROFILE_IMAGE')}</label>
                <Form.Item
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  className={cx('padding-input', 'color-input-disable')}
                >
                  <Upload
                    action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                    listType='picture-card'
                    onPreview={handlePreview}
                    onChange={handleChange}
                    style={{ width: '100%', height: '100%', margin: 0 }}
                    className={cx('upload-image-btn')}
                  >
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <Image
                        alt='example'
                        width={100}
                        src={previewImage}
                      />
                    </Modal>
                    <button
                      style={{
                        border: 0,
                        background: 'none',
                        display: 'flex',
                        gap: '8px',
                        justifyItems: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        padding: '12px'
                      }}
                      type='button'
                    >
                      <CameraOutlined />
                      <div style={{ marginTop: 0 }}>{tU('change_avatar')}</div>
                    </button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label={<TitleLabelFormItem name={tU('STATUS')}></TitleLabelFormItem>}
                  name='isLockout'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('padding-input', 'color-input-disable')}
                >
                  <Input
                    disabled
                    //value={staffsDetail?.isLockout == true ? 'Lockout' : 'Active'}
                  />
                </Form.Item>

                <Form.Item
                  label={<TitleLabelFormItem name={tU('ROLE')}></TitleLabelFormItem>}
                  name='role'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('padding-input', 'color-input-disable')}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  name='onboarding'
                  label={
                    <TitleLabelFormItem name={tU('ONBOARDING')}></TitleLabelFormItem>
                  }
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                >
                  <DatePicker
                    disabled
                    format={dateFormat}
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    maxWidth: '90%',
                    margin: '30px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                >
                  <Button
                    className={cx('bg-btn')}
                    htmlType='submit'
                    type='primary'
                    loading={isFetching}
                  >
                    {tU('save_change')}
                  </Button>
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={12}
              >
                <TitleLabelFormItem name={tU('GENERAL_INFORMATION')} />

                <Form.Item
                  name='firstName'
                  label='First Name'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='lastName'
                  label='Last Name'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={tU('phone')}
                  name='phoneNumber'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  rules={[
                    {
                      pattern: /^(\+84|0)([0-9]{9,10})$/, // Vietnamese phone number pattern
                      message: 'Invalid phone number! Please enter a valid phone number.'
                    }
                  ]}
                  className={cx('color-input-disable')}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Email'
                  name='email'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  name='identificationCard'
                  label={tU('identity_card')}
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='education'
                  label={tU('education')}
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='dob'
                  label='Date of Birth'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>

                <Form.Item
                  label='Gender'
                  name='gender'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                >
                  <Radio.Group
                  //  onChange={handleChangeGender}
                  //value={staffsDetail?.gender}
                  >
                    <Radio value={2}>{tU('male')}</Radio>
                    <Radio value={1}>{tU('female')}</Radio>
                    <Radio value={0}> {tU('other')} </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label={tU('Addressed')}
                  name='address'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                >
                  <TextArea
                    // value={staffsDetail?.address}
                    rows={4}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>

        <MemCertificate />
      </Content>
    </>
  );
};
export default UpdateUser;
