'use client';
import styles from '../management-page.module.scss';
import React, { useState } from 'react';
import UserList from './use-list';
import { Breadcrumb, Button, Cascader, ConfigProvider, Flex, Tooltip } from 'antd';
import {
  SearchOutlined,
  HomeOutlined,
  ImportOutlined,
  ExportOutlined,
  PlusOutlined
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import HomeButtonA from '@/components/HomeButton/home-button';
import AddUser from './add/modalAdd';

const { Search } = Input;

const { SHOW_CHILD } = Cascader;

type Props = {};

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
const options: Option[] = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20)
      .fill(null)
      .map((_, index) => ({ label: `Number ${index}`, value: index }))
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish'
          },
          {
            label: 'Toy Cards',
            value: 'cards'
          },
          {
            label: 'Toy Bird',
            value: 'bird'
          }
        ]
      }
    ]
  }
];

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value);

const UserManagement = (props: Props) => {
  const cx = classNames.bind(styles);

  const [createState, setCreateState] = useState<boolean>(false);

  const onChange = (value: String[][]): void => {
    console.log(value);
  };
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

      <Breadcrumb style={{ margin: '0px 24px' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb>
      <Flex
        justify={'center'}
        align={'flex-start'}
        vertical
        className={cx('filter-box')}
      >
        <Flex
          justify={'center'}
          align={'center'}
          className={cx('label-icon')}
        >
          <HomeOutlined />
          <span>Filter</span>
        </Flex>
        <Flex
          justify={'center'}
          align={'center'}
          className={cx('flex-space')}
          style={{ width: '100%' }}
        >
          <Cascader
            style={{ width: '40%' }}
            options={options}
            multiple
            maxTagCount='responsive'
            showCheckedStrategy={SHOW_CHILD}
            defaultValue={[
              ['bamboo', 'little', 'fish'],
              ['bamboo', 'little', 'cards'],
              ['bamboo', 'little', 'bird']
            ]}
          />
          <span>Created At: </span>

          <RangePicker
            defaultValue={[
              dayjs('2015/01/01', dateFormat),
              dayjs('2015/01/01', dateFormat)
            ]}
            format={dateFormat}
          />
          <Button
            className={cx('bg-btn')}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </Flex>
      </Flex>

      <Flex
        justify={'space-between'}
        align={'center'}
        className={cx('flex-outline-space')}
      >
        <Search
          placeholder='Input search text'
          onSearch={onSearch}
          style={{ width: '50%' }}
          enterButton
          className={cx('search-btn-box')}
        />
        <Flex
          justify={'flex-end'}
          align={'center'}
          className={cx('flex-space')}
        >
          <Tooltip title='Import'>
            <Button
              className={cx('bg-btn')}
              icon={<ImportOutlined />}
            />
          </Tooltip>
          <Tooltip title='Export'>
            <Button
              className={cx('bg-btn')}
              icon={<ExportOutlined />}
            />
          </Tooltip>
          <Tooltip title='Add new'>
            <Button
              onClick={() => setCreateState(true)}
              className={cx('bg-btn')}
              icon={<PlusOutlined />}
            />
            <AddUser
              params={{ visible: createState, onCancel: () => setCreateState(false) }}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <UserList />
    </>
  );
};

export default UserManagement;
