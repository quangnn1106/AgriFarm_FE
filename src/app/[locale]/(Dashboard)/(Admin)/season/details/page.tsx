'use client';
import { Content } from 'antd/es/layout/layout';
import {
  Breadcrumb,
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  Table,
  TableProps,
  Tooltip,
  theme
} from 'antd';
import { HomeOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from '../../adminStyle.module.scss';
import classNames from 'classnames/bind';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';

import { useTranslations } from 'next-intl';
import TextArea from 'antd/es/input/TextArea';
import TitleHeader from '../component/TitleHeader/tiltle-header';

type Props = {};
const SeaSonDetails = (props: Props) => {
  const t = useTranslations('UserManagement');
  const cx = classNames.bind(styles);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <Content style={{ padding: '20px 24px' }}>
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
                paddingInlineLG: 0,
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
        <Breadcrumb style={{ margin: '0px 24px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Season</Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>
        <TitleHeader title={'Spring Details'}></TitleHeader>

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
        <Form disabled={!componentDisabled}>
          <Form.Item
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            className={cx('color-input-disable')}
          >
            <label>Name</label>
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
          >
            <label>Description</label>
            <TextArea rows={4} />
          </Form.Item>

          <label>Period</label>
          <Flex
            align='center'
            justify='space-between'
          >
            <Form.Item
              style={{
                maxWidth: '40%',
                margin: '0px 0px 8px 0px',
                padding: '0px 24px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <label>Start:</label>
              <DatePicker onChange={onChange} />
            </Form.Item>

            <Form.Item
              style={{
                maxWidth: '40%',
                margin: '0px 0px 8px 0px',
                padding: '0px 0px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <label>End:</label>
              <DatePicker onChange={onChange} />
            </Form.Item>
          </Flex>

          <label>Land & Rice variety</label>
          <Button
            type='primary'
            icon={<PlusOutlined />}
          >
            Add
          </Button>
          <Button
            type='primary'
            danger
            icon={<MinusOutlined />}
          >
            Delete
          </Button>
        </Form>
      </Content>
    </>
  );
};
export default SeaSonDetails;
