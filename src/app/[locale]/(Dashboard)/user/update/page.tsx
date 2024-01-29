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
  Radio,
  Row,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload
} from 'antd';
import React, { useState } from 'react';

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

const UpdateUser = ({
  params
}: {
  params: { id: string; visible: boolean; onCancel: () => void };
}) => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const t = useTranslations('UserManagement');
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
        >
          <HomeOutlined />
          Farm Name
        </Button>
      </ConfigProvider>

      <Flex align='center' justify='space-between'>
      <label>{t('PROFILE')}</label>
      <Checkbox
        checked={componentDisabled}
        onChange={e => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      </Flex>
      
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        disabled={componentDisabled}
        // style={{ maxWidth: 600 }}
      >
        <Row>
          <Col span={12}>
            <label>{t('PROFILE_IMAGE')}</label>
            <Form.Item
              valuePropName='fileList'
              getValueFromEvent={normFile}
            >
              <Upload
                action='/upload.do'
                listType='picture-card'
              >
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
