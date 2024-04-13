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
  ConfigProvider,
  CheckboxProps,
  FormProps,
  Space,
  TablePaginationConfig
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

import styles from '../../../adminStyle.module.scss';
import seasonStyle from '../../../../(Admin)/season/seasonStyle.module.scss';

import classNames from 'classnames/bind';
import Search from 'antd/es/input/Search';
import { ReactElement, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SearchConditionDef } from '../../models';

const cx = classNames.bind(styles);
const st = classNames.bind(seasonStyle);

const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value);

type Props = {
  searchAction: (searchCondition: SearchConditionDef, pagination: TablePaginationConfig) => void;
  setSearchCondition: (condition: SearchConditionDef) => void;
};

type FieldType = {
  keyword?: string;
  dateRange?: string[];
  status?: number[];
};

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

const CheckboxGroup = Checkbox.Group;


const FilterSection: React.FC<Props> = ({ searchAction , setSearchCondition }: Props): ReactElement => {
  const tCom = useTranslations('common');
  const tLbl = useTranslations('Services.Checklist.label');
  const tMsg = useTranslations('Services.Checklist.message');
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [searchDate, setSearchDate] = useState<string[]>([]);
  const onChange = (list: CheckboxValueType[]) => {
    console.log(list);
    setCheckedList(list);
  };
  const plainOptions = [
    {
      label: tLbl('not_yet'),
      value: 0
    },
    {
      label: tLbl('in_progress'),
      value: 1
    },
    {
      label: tLbl('done'),
      value: 2
    }
  ];

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const keyword = values.keyword ?? "";
    const searchByDate = searchDate;
    const status = checkedList as number[];
    setSearchCondition(
      {
        keyword: keyword,
        searchByDate: searchByDate,
        status: status
      }
    );
    searchAction(
      {
        keyword,
        searchByDate,
        status
      },
      {
        pageSize: 10,
        current: 1
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleSelectDate = (dates: any, dateStrings: string[]) => {
    setSearchDate(dateStrings);
  }
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
            label={tCom('keyword')}
            name='keyword'
          >
            <Input
              placeholder={tLbl('keyword_placeholder')}
              style={{ width: '50%' }}
            ></Input>
          </Form.Item>
          <Form.Item
            label={tLbl('date_execution')}
            name='dateRange'
          >
            <RangePicker allowEmpty={[true, true]} placeholder={[tCom('start_date'),tCom('end_date')]} onChange={handleSelectDate} format={dateFormat} />
          </Form.Item>
          <Form.Item
            label={tLbl('status')}
            name='status'
          >
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item 
            wrapperCol={{offset: 9}}
          >
            <Button
              className={cx('bg-btn')}
              icon={<SearchOutlined />}
              htmlType='submit'
            >
              {tCom('btn_search')}
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
};
export default FilterSection;
