'use client';
import React, { useState } from 'react';
import { Input, Button, Cascader, Flex, Tooltip } from 'antd';
import { ImportOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import styles from '../../../../(SuperAdmin)/sa/management-page.module.scss';

import AddUser from '../../add/modalAdd';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value);

type Props = {
  children: React.ReactNode;
};

const ActionBox = ({ children }: Props) => {
  const [createState, setCreateState] = useState<boolean>(false);
  return (
    <>
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
            {/* <Button
              onClick={() => setCreateState(true)}
              className={cx('bg-btn')}
              icon={<PlusOutlined />}
            />
            <AddUser
              params={{
                visible: createState,
                onCancel: () => setCreateState(false)
              }}
            /> */}
            {children}
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
};

export default ActionBox;
