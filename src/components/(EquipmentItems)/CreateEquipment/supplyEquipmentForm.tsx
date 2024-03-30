import {
  AutoComplete,
  Col,
  Divider,
  Flex,
  Form,
  FormInstance,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Typography,
  DatePicker
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useDebounceSearch } from '@/utils/debounceSearch';
import { SupplierResponse } from '@/services/Admin/Equipments/Payload/response/equipmentResponses';

const { RangePicker } = DatePicker;

interface IProps {
  form: FormInstance;
}

export default function SupplyEquipmentForm(props: IProps) {
  const { form } = props;
  const [isRecom, setIsRecom] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierResponse[] | []>([]);
  const [total, setTotal] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  const fetchSuppliersRec = async (value?: string) => {
    //console.log('On Searching..,', value);
    if (value && value.length > 0) {
      setIsRecom(true);
      const list: SupplierResponse[] = [];
      for (let i = 0; i < 3; i++) {
        list.push({
          id: '123912313819-8128931923' + i,
          name: 's01 sdad' + i * 2,
          address: i * 3 + 'asndj asdasn ksajdksaj'
        });
      }
      list.push({
        id: 'c5b553a8-ac85-4206-931c-d06de69acbf5',
        name: 'Store 01',
        address: 'So 5 Can Tho'
      });
      setSuppliers(list);
    }
  };
  const [handleSearchTextChange] = useDebounceSearch(fetchSuppliersRec, 500);

  const onSelect = (data: any) => {
    form.setFieldValue(['supplier', 'name'], data.value);
    form.setFieldValue(['supplier', 'address'], data.address);
  };

  const renderExpireSection = () => {
    return (
      <>
        <Flex>
        <Form.Item
          label='Price per unit'
          name='validRange'
        >
          <RangePicker />
        </Form.Item>
        </Flex>
      </>
    );
  };

  return (
    <>
      <Form form={form}>
        <Row gutter={[16, 8]}>
          <Col span={16}>
            <Form.Item
              label='Quantity'
              name='quantity'
            >
              <Input
                type='number'
                defaultValue={0}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              //label='Unit'
              name='measureUnit'
            >
              <Select
                defaultValue={'item'}
                placeholder='unit'
              >
                <Select.Option value='item'>item</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label='Price per unit'
          name='unitPrice'
        >
          <Input
            type='number'
            defaultValue={0}
            placeholder='Price by VND'
          />
        </Form.Item>
        {/* <Switch
          defaultChecked={isExpired}
          onChange={() => setIsExpired(!isExpired)}
        />
        {isExpired && renderExpireSection()} */}

        {/* <Divider plain></Divider> */}
        {/* <Typography.Text mark>
          Total Count:{' '}
          {(form.getFieldValue('quantity') as number) * (form.getFieldValue('measureUnit') as number)}
        </Typography.Text> */}
        <Divider>Supplier Section</Divider>
        <Col span={24}>
          <Form.Item
            label='Supplier Name'
            name={['supplier', 'name']}
          >
            <AutoComplete
              options={suppliers.map(e => ({ value: e.name, address: e.address }))}
              //style={{ width: 200 }}
              onSelect={(_, item) => onSelect(item)}
              onSearch={text => handleSearchTextChange(text)}
              //placeholder='input here'
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label='Supplier Address'
            name={['supplier', 'address']}
          >
            <TextArea
              rows={4}
              maxLength={3000}
              showCount
              style={{ height: 120, resize: 'none' }}
            ></TextArea>
          </Form.Item>
        </Col>

        <Form.Item
          noStyle
          shouldUpdate
        >
          {/* {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue())}</pre>
            </Typography>
          )} */}
        </Form.Item>
      </Form>
    </>
  );
}

export const OptionalList = ({ val }: { val: string }) => {
  console.log('mount this');
  return (
    <>
      <div>Hello, search key is {val}</div>
    </>
  );
};
