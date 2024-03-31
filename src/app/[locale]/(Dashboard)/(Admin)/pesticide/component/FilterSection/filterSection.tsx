'use client'
import {
  Divider,
  DatePicker,
  Button,
  GetProp,
  Checkbox,
  Row,
  Col,
  Flex,
  Form,
  Input,
  ConfigProvider
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

import styles from '../../../adminStyle.module.scss';
import pesticideStyle from '../../pesticideStyle.module.scss';

import classNames from 'classnames/bind';
import Search from 'antd/es/input/Search';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  children: React.ReactNode;
};

const FilterSection = () => {
  const cx = classNames.bind(styles);
  const st = classNames.bind(pesticideStyle);
  const t = useTranslations('Common');

  const { RangePicker } = DatePicker;

  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

  const CheckboxGroup = Checkbox.Group;

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 8
            }
          }
        }}
      >
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          className={st('margin-form-item')}
          style={{padding: '0px 24px'}}
        >
          <Form.Item
            label={t('keyword')}
            name='keyword'
          >
            <Input
              placeholder={t('Input_search_text')}
              style={{ width: '50%' }}
            ></Input>
          </Form.Item>
          <Form.Item label=''>
            <Flex
              align='center'
              justify='center'
            >
              <Button
                className={cx('bg-btn')}
                icon={<SearchOutlined />}
              >
                {t('Search')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
};
export default FilterSection;
