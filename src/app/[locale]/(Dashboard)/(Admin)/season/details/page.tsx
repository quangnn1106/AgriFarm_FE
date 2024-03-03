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
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import TextArea from 'antd/es/input/TextArea';
import TitleHeader from '../component/TitleHeader/tiltle-header';
import { seasonTableColumns } from '../component/Table/column-types';
import { Land } from '../models/season-model';
import fetchListLandData from '@/services/Admin/Land/getLandsApi';
import { LandAndRiceVarietyColumns } from './LandAndRiceVarietyColumn/column-types';

type Props = {};
const SeaSonDetails = (props: Props) => {
  const t = useTranslations('UserManagement');
  const cx = classNames.bind(styles);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const checkRowSelection = {
    getCheckboxProps: (record: Land) => ({
      disabled: record.name === 'Disabled',
      name: record.name
    })
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Land[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetchListLandData();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Content style={{ padding: '20px 24px' }}>
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
                  maxWidth: '100%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 24px',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Flex
                  align='center'
                  justify='space-between'
                >
                  <label>Start:</label>
                  <DatePicker onChange={onChange} />
                </Flex>
              </Form.Item>

              <Form.Item
                style={{
                  maxWidth: '100%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 0px',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Flex
                  align='center'
                  justify='space-between'
                >
                  <label>End:</label>
                  <DatePicker onChange={onChange} />
                </Flex>
              </Form.Item>
            </Flex>

            <label>Land & Rice variety</label>
            <Flex
              align='center'
              justify='flex-start'
              gap={20}
              style={{ padding: '12px 0px' }}
            >
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
            </Flex>
            {/* <ConfigProvider
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
        > */}
            <Table
              loading={loading}
              rowKey={'id'}
              columns={LandAndRiceVarietyColumns}
              bordered
              rowSelection={{
                type: 'checkbox',
                ...checkRowSelection
              }}
              scroll={{ x: 'max-content' }}
              className={cx('table_style')}
              dataSource={data?.map(land => ({
                ...land
              }))}
            />

            {/* </ConfigProvider> */}
          </Form>
        </ConfigProvider>
      </Content>
    </>
  );
};
export default SeaSonDetails;
