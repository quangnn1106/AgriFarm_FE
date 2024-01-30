'use client';
import {
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
  TreeSelect,
  Upload
} from 'antd';
import React, { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';

import { PlusOutlined, CameraOutlined, HomeOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
// import styles from '../management-page.module.scss';
import { useTranslations } from 'next-intl';
import styles from '../../management-page.module.scss';

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
          style={{ paddingLeft: 24 }}
        >
          <HomeOutlined />
          Farm Name
        </Button>
      </ConfigProvider>

      <Flex
        align='center'
        justify='space-between'
      >
        <label className={cx('group-info-label')}>{t('PROFILE')}</label>
        <Checkbox
          checked={componentDisabled}
          onChange={e => setComponentDisabled(e.target.checked)}
        >
          {t('edit_information')}
        </Checkbox>
      </Flex>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        disabled={componentDisabled}
        // style={{ maxWidth: 600 }}
      >
        <Row>
          <Col span={12}>
            <label className={cx('group-info-label')}>{t('PROFILE_IMAGE')}</label>
            <Form.Item
              valuePropName='fileList'
              getValueFromEvent={normFile}
              className={cx('padding-input')}
            >
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType='picture-card'
                onPreview={handlePreview}
                onChange={handleChange}
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
                  style={{ border: 0, background: 'none', display: 'flex', gap: '8px' }}
                  type='button'
                >
                  <CameraOutlined />
                  <div style={{ marginTop: 8 }}>{t('change_avatar')}</div>
                </button>
              </Upload>
            </Form.Item>
            <label>{t('GENERAL_INFORMATION')}</label>

            <Form.Item label='ID'>
              <Input />
            </Form.Item>
            <Form.Item label={t('first_name')}>
              <Input />
            </Form.Item>
            <Form.Item label={t('last_name')}>
              <Input />
            </Form.Item>
            <Form.Item label={t('phone_number')}>
              <Input />
            </Form.Item>
            <Form.Item label={t('email')}>
              <Input />
            </Form.Item>
            <Form.Item label={t('address')}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={t('date_of_birth')}>
              <DatePicker />
            </Form.Item>

            <Form.Item label={t('gender')}>
              <Radio.Group>
                <Radio value='male'>{t('male')}</Radio>
                <Radio value='female'>{t('female')}</Radio>
                <Radio value='other'> {t('other')} </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <label>{t('ROLE')}</label>
            <Form.Item>
              <Select>
                <Select.Option value='admin'>{t('Admin')}</Select.Option>
                <Select.Option value='manager'>{t('Manager')}</Select.Option>
                <Select.Option value='member'>{t('Member')}</Select.Option>
              </Select>
            </Form.Item>

            <label>{t('ONBOARDING')}</label>
            <Form.Item>
              <DatePicker />
            </Form.Item>

            <label>{t('CHANGE_PASSWORD')}</label>
            <Form.Item label={t('new_password')}>
              <Input />
            </Form.Item>

            <Form.Item label={t('confirm_password')}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default UpdateUser;
