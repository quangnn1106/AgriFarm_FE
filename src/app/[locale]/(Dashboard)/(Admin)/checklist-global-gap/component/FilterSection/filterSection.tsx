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
import seasonStyle from '../../../../(Admin)/season/seasonStyle.module.scss';

import classNames from 'classnames/bind';
import Search from 'antd/es/input/Search';
import { useState } from 'react';

const cx = classNames.bind(styles);
const st = classNames.bind(seasonStyle);

const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value);

type Props = {
  children: React.ReactNode;
};

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['In progress', 'Done', 'Cancel', 'Pending'];

const FilterSection = () => {
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
        >
          <Form.Item
            label='Key word'
            name='keyword'
          >
            <Input
              placeholder='Input search text'
              style={{ width: '50%' }}
            ></Input>
          </Form.Item>
          <Form.Item
            label='Date of execution'
            name='dateRange'
          >
            <RangePicker
              defaultValue={[
                dayjs('2015/01/01', dateFormat),
                dayjs('2015/01/01', dateFormat)
              ]}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label='Status'
            name='status'
          >
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
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
                Search
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
};
export default FilterSection;
