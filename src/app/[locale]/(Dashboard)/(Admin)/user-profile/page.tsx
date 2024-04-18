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
import { getStaffsServiceDetails } from '@/services/Admin/Staffs/getStaffsService';

dayjs.extend(customParseFormat);
import UseAxiosAuth from '@/utils/axiosClient';
import { useSession } from 'next-auth/react';
import { STATUS_OK } from '@/constants/https';
import Image from 'next/image';
import { updateStaffService } from '@/services/Admin/Staffs/updateStaffService';

import { formItemLayout } from '@/components/FormItemLayout/formItemLayout';
import TitleLabelFormItem from '@/components/TitleLabel/TitleLabelFormItem';
import { NotificationPlacement } from 'antd/es/notification/interface';
import StaffsDetails from '@/services/Admin/Staffs/Payload/response/staffs-detail';
import { updateStaffPayLoad } from '@/services/Admin/Staffs/Payload/request/update-staff';
import Link from 'next/link';
import AddCertificate from './components/AddCertiModal/modalAdd';
import { CerTableColumns } from '../user-certificate/components/Table/column-type';
import { deleteCerApi } from '@/services/Admin/Certificates/deleteCer';
import { CertificationResponse } from '@/services/Admin/Certificates/payload/response/certificate';
import { getMemCertsService } from '@/services/Admin/Certificates/getAllCertificates';
import { CerTableColumnsProfile } from './components/Table/column-type';
import { changePassService } from '@/services/Admin/Staffs/changepass';

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
      message: `Admin ${status}`,
      placement,
      duration: 2
    });
  };

  const breadCrumb = [
    {
      title: <Link href={`/`}>{t('home')}</Link>
    },
    {
      title: <Link href={`/user-profile`}>Profile</Link>
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
        const responseData = await getStaffsServiceDetails(siteId, http, userId);
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
    const res = await updateStaffService(http, userId, value);
    const resPass = await changePassService(http, value.changePassObject);
    if (res.data) {
      setIsFetching(false);
      openNotification('top', `${tM('update_susses')}`, 'success');

      console.log('update staff success', res.status);
    } else {
      openNotification('top', `${tM('update_error')}`, 'error');

      console.log('update staff fail', res.status);
    }
    // setUserId(id);
    // setUpdateState(true);
  };

  const [certificate, setCertificate] = useState<CertificationResponse[] | []>([]);
  const [createState, setCreateState] = useState<boolean>(false);
  const getListCertsApi = async (http: AxiosInstance, userId: string | undefined) => {
    try {
      const responseData = await getMemCertsService(undefined, http);
      setCertificate(responseData.data as CertificationResponse[]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API getListCerApi:', error);
    }
  };

  //handle delete
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [deleteBtnState, setDeleteBtnState] = useState<boolean>(true);
  const [deletedCertificates, setDeletedCertificates] = useState<React.Key[]>([]);
  const deletedCert = async (http: AxiosInstance, seasonId?: string) => {
    try {
      const res = await deleteCerApi(http, seasonId);
      getListCertsApi(http, params.id);
    } catch (error) {
      console.error('Error calling API Delete Season:', error);
    }
  };
  const checkRowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: CertificationResponse[]) => {
      if (selectedRowKeys.length > 0) {
        setDeleteBtnState(false);
        setDeletedCertificates(selectedRowKeys);
      } else {
        setDeleteBtnState(true);
      }
    }
  };

  const handleDelete = (id: string) => {
    deletedCert(http, id);
  };
  const deleteMultiple = () => {
    deletedCertificates.map(function (item) {
      deletedCert(http, item.toString());
    });
    setDeleteState(false);
    setDeleteBtnState(true);
  };

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

  useEffect(() => {
    getListCertsApi(http, params.id);
  }, [http, params.id, createState]);

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
                    margin: '0px 0px 40px 0px',
                    padding: '0px 20px'
                  }}
                >
                  <DatePicker
                    disabled
                    format={dateFormat}
                  />
                </Form.Item>

                <Form.Item
                  // name='onboarding'
                  label={<TitleLabelFormItem name='Đổi mật khẩu'></TitleLabelFormItem>}
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                ></Form.Item>

                <Form.Item
                  name='oldPassWord'
                  label='Mật khẩu cũ'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name='newPassWord'
                  label='Mật khẩu mới'
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  className={cx('color-input-disable')}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name='confirmPassWord'
                  label='Xác nhận mật khẩu'
                  dependencies={['newPassWord']}
                  style={{
                    maxWidth: '90%',
                    margin: '0px 0px 8px 0px',
                    padding: '0px 20px'
                  }}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassWord') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu mới không khớp'));
                      }
                    })
                  ]}
                  hasFeedback
                  className={cx('color-input-disable')}
                >
                  <Input.Password />
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
                  label='Họ'
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
                  label='Tên'
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

        <Tooltip
          title='Thêm chứng chỉ mới'
          className={cx('btn-right')}
        >
          <Button
            style={{ marginBottom: 12 }}
            className={cx('bg-btn')}
            icon={<PlusOutlined />}
            onClick={() => setCreateState(true)}
          />
        </Tooltip>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                cellPaddingBlock: 8,
                headerSortHoverBg: '#F2F3F5',
                borderColor: '#F2F3F5',
                headerBg: '#F2F3F5',
                rowHoverBg: '#F2F3F5'
              }
            }
          }}
        >
          <AddCertificate
            params={{
              visible: createState,
              onCancel: () => setCreateState(false),
              // userId: params.id,
              loading: isFetching || false
            }}
          />
          <Table
            loading={isFetching}
            rowKey={'id'}
            bordered
            rowSelection={{
              type: 'checkbox',
              ...checkRowSelection
            }}
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: event => {
            //       //    console.log('record row onCLick: ', record);
            //       //console.log('event row onCLick: ', event);
            //       const target = event.target as HTMLElement;
            //       const isWithinLink = target.tagName === 'A' || target.closest('a');

            //       const isWithinAction =
            //         target.closest('td')?.classList.contains('ant-table-cell') &&
            //         !target
            //           .closest('td')
            //           ?.classList.contains('ant-table-selection-column') &&
            //         !target.closest('td')?.classList.contains('ant-table-cell-fix-right');

            //       if (isWithinAction && !isWithinLink) {
            //         handleDetails(record);
            //       }
            //     } // click row
            //   };
            // }}
            columns={CerTableColumnsProfile()}
            dataSource={certificate?.map(cer => ({
              ...cer,
              // onDetails: () => handleDetails(cer.id!),
              onDelete: () => handleDelete(cer.id!)
              // onViewHistory: () => onViewHistory(cer.id!)
            }))}
            // onChange={onChange}
            pagination={{
              showTotal: total => `Total ${total} Items`,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30'],
              total: certificate?.length
            }}
            scroll={{ x: 'max-content' }}
            className='table-style'
          />
        </ConfigProvider>
      </Content>
    </>
  );
};
export default UpdateUser;
