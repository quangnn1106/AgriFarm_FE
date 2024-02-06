'use client';
import {
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  Col,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Slider,
  Switch,
  Table,
  Tooltip,
  TreeSelect,
  Upload
} from 'antd';
import React, { useState } from 'react';
import type { TableProps, UploadFile, UploadProps } from 'antd';

import { PlusOutlined, CameraOutlined, HomeOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
// import styles from '../management-page.module.scss';
import { useTranslations } from 'next-intl';
import styles from '../../adminStyle.module.scss';
import { Content } from 'antd/es/layout/layout';
import { certificationTableColumn } from './certificationColumnType';
import { CertificationModel } from '../models/certificationModel';

const { RangePicker } = DatePicker;
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
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const t = useTranslations('UserManagement');

  //Upload image
  const [previewOpen, setPreviewOpen] = useState(false);
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

  const [createState, setCreateState] = useState<Boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);

  const [users, setUsers] = useState<CertificationModel[]>([]);
  const [userId, setUserId] = useState<string>('');

  const handleDelete = (id: string) => {};
  const handleUpdate = async (id: string) => {
    setUserId(id);
    setUpdateState(true);
  };
  const handleDetails = async (id: string) => {
    setUserId(id);
    setUpdateState(true);
  };

  const onChange: TableProps<CertificationModel>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
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

  const data: CertificationModel[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      id: "example_id" + i,
      certification_name: "Test certification",
      expired_time: "20/10/2024",
      link_certification: "Example Link"
    });
  }

  // const uploadButton = (
  //   <button
  //     style={{ border: 0, background: 'none' }}
  //     type='button'
  //   >
  //     <PlusOutlined />
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </button>
  // );
  // end upload image

  return (
    <>
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
          Farm Name
        </Button>
      </ConfigProvider>

      <Breadcrumb style={{ margin: '0px 24px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb>

      <Content style={{ padding: '0 24px' }}>
        <Flex
          align='center'
          justify='end'
        >
          <Checkbox
            checked={componentDisabled}
            onChange={e => setComponentDisabled(e.target.checked)}
          >
            {t('edit_information')}
          </Checkbox>
        </Flex>

        <Form
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 14 }}
          disabled={!componentDisabled}
          // style={{ maxWidth: 600 }
        >
          <Row>
            <Col
              span={12}
              style={{ maxWidth: '100%' }}
            >
              <label className={cx('group-info-label')}>{t('PROFILE_IMAGE')}</label>
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
                    <img
                      alt='example'
                      style={{ width: '100%' }}
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
                    <div style={{ marginTop: 0 }}>{t('change_avatar')}</div>
                  </button>
                </Upload>
              </Form.Item>

              <label className={cx('group-info-label')}>{t('STATUS')}</label>
              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('padding-input', 'color-input-disable')}
              >
                <Select>
                  <Select.Option value='active'>{t('active')}</Select.Option>
                  <Select.Option value='suspended'>{t('suspended')}</Select.Option>
                  <Select.Option value='terminated'>{t('terminated')}</Select.Option>
                </Select>
              </Form.Item>

              <label className={cx('group-info-label')}>{t('ROLE')}</label>
              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('padding-input', 'color-input-disable')}
              >
                <Select>
                  <Select.Option value='admin'>{t('admin')}</Select.Option>
                  <Select.Option value='manager'>{t('manager')}</Select.Option>
                  <Select.Option value='member'>{t('member')}</Select.Option>
                </Select>
              </Form.Item>

              <label className={cx('group-info-label')}>{t('ONBOARDING')}</label>
              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
              >
                <DatePicker />
              </Form.Item>

              <label className={cx('group-info-label')}>{t('CHANGE_PASSWORD')}</label>
              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>{t('new_password')}</label>
                <Input />
              </Form.Item>

              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>{t('confirm_password')}</label>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label className={cx('group-info-label')}>{t('GENERAL_INFORMATION')}</label>

              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>ID</label>
                <Input />
              </Form.Item>
              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>{t('first_name')}</label>
                <Input />
              </Form.Item>
              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>{t('last_name')}</label>
                <Input />
              </Form.Item>

              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>{t('phone_number')}</label>
                <Input />
              </Form.Item>

              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>{t('email')}</label>
                <Input />
              </Form.Item>
              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>{t('date_of_birth')}</label>
                <DatePicker />
              </Form.Item>

              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
                className={cx('color-input-disable')}
              >
                <label>{t('gender')}</label>
                <Radio.Group>
                  <Radio value='male'>{t('male')}</Radio>
                  <Radio value='female'>{t('female')}</Radio>
                  <Radio value='other'> {t('other')} </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                style={{
                  maxWidth: '90%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 20px'
                }}
              >
                <label>{t('address')}</label>
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Button className={cx('bg-btn')} style={{marginBottom: 12}}>{t('save_change')}</Button>
        </Form>
        <Tooltip title='Add new certification'  className={cx('btn-right')}>
            <Button
              style={{marginBottom: 12}}
              className={cx('bg-btn')}
              icon={<PlusOutlined />}
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
          <Table
            columns={certificationTableColumn}
            dataSource={data.map(certification => ({
              ...certification,
              onDetails: () => handleDetails(certification.id),
              onDelete: () => handleDelete(certification.id),
              onUpdate: () => handleUpdate(certification.id)
            }))}
            onChange={onChange}
            pagination={{
              showTotal: total => `Total ${total} Items`,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30'],
              total: users.length
            }}
            scroll={{ x: 'max-content' }}
            className={cx('table_style')}
          />
        </ConfigProvider>
      </Content>
    </>
  );
};
export default UpdateUser;
