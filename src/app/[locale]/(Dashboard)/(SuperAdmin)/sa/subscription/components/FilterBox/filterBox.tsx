'use client';
import React from 'react';
import styles from '../../../management-page.module.scss';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Cascader, Flex, Input, DatePicker } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
import { options } from '../Options/optionfilter';

const { SHOW_CHILD } = Cascader;

type Props = {};

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const FilterBox = (props: Props) => {
  // const onChange = (value: String[][]): void => {
  //   console.log(value);
  // };
  return (
    <>
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
          <span>Bộ lọc</span>
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
            // showCheckedStrategy={SHOW_CHILD}
            // defaultValue={[
            //   ['bamboo', 'little', 'fish'],
            //   ['bamboo', 'little', 'cards'],
            //   ['bamboo', 'little', 'bird']
            // ]}
          />
          <span>Tạo từ ngày: </span>

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
            Tìm kiếm
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default FilterBox;
