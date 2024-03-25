import UseAxiosAuth from '@/utils/axiosClient';
import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  Spin,
  Space,
  Button,
  Typography,
  notification,
  Select,
  SelectProps
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { constants } from 'buffer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { CreateAllInfoOfSeedDto, CreateSeedDto, Seed } from '../../models/seed-models';
import { createSeedApi } from '@/services/Admin/Seed/createSeedApi';
import { useSession } from 'next-auth/react';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { SupplierResponse } from '../../../supply/models/supplier-models';
import getSuppliersApi from '@/services/Admin/Supply/getSuppliersApi';
import { AxiosInstance } from 'axios';
import { createSupplyInfoApi } from '@/services/Admin/Seed/createSupplyInfoApi';

const AddSeedFormDrawer = () => {
  const t = useTranslations('Common');

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  const http = UseAxiosAuth();
  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;

  //notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `${status}`,
      placement,
      duration: 2
    });
  };

    //Set selection supplier
    let options: SelectProps['options'] = [];

    const setSupplierOptions = (suppliers: SupplierResponse[] | undefined) => {
      options = [];
      suppliers?.map((item, idx) => {
        options?.push({
            label: item.name,
            value: item.id
          });
        });
        console.log('Options: ', options);
        setIsFetching(false);
    }

  //get list suppliers
  const getListSupplier = async (http: AxiosInstance) => {
      try {
          await getSuppliersApi(http).then((res)=> {

            console.log('supplier: ', res?.data);
            setSupplierOptions(res?.data as SupplierResponse[])
          });
          
      } catch (error) {
        console.error('Error occurred while get list supplier:', error);
      }
  }



  const [selectedSupplier, setSelectedSupplier] = useState<string>('');

  //Setup create seed info

  // const onSubmit = async (value: CreateSeedDto) => {
  //   try {
  //     const res = await createSeedApi(siteId, http, value);
  //     if (res.data) {
  //       openNotification('top', t('Create_successfully'), 'success');
  //       console.log('create staff success', res.status);
  //     } else {
  //       openNotification('top', t('Create_fail'), 'error');
  //       console.log('create staff fail', res.status);
  //     }
  //   } catch (error) {
  //     console.error('Error occurred while updating season:', error);
  //   }
  // };

  useEffect(()=>{
    getListSupplier(http);
  },[http, isFetching])

  const [createdSeed, setCreatedSeed] = useState<Seed>();

  const onSubmit = async (value: CreateAllInfoOfSeedDto) => {
    try {
      await createSeedApi(siteId, http, {
        name: value.name,
        description: value.description,
        notes: value.notes,
        defaultUnit: value.defaultUnit,
        properties: value.properties
      }).then(async res => {
        setCreatedSeed(res.data as Seed);
        await createSupplyInfoApi(createdSeed?.id, http, {
          quantity: value.quantity,
          unitPrice: value.unitPrice,
          measureUnit: value.measureUnit,
          content: value.content,
          supplier: {
            id: value.supplier.id,
            name: value.supplierName,
            address: value.address
          }
        }).then(resSupplier => {
          if (res.data && resSupplier.data) {
            openNotification('top', t('Create_successfully'), 'success');
            console.log('create staff success', res.status);
          } else {
            openNotification('top', t('Create_fail'), 'error');
            console.log('create staff fail', res.status);
          }
        })  
      });
    } catch (error) {
      console.error('Error occurred while updating season:', error);
    }
  };

  // const InputUnit = (
  //   <Form.Item
  //     name='measureUnit'
  //     style={{
  //       maxWidth: '100%',
  //       margin: '0px 0px 8px 0px',
  //       padding: '0px 0px'
  //     }}
  //     label='Unit'
  //   >
  //     <Input />
  //   </Form.Item>
  // );

  return (
    <>
      {contextHolder}
      <Spin spinning={isFetching}>
      <Form
        disabled={!componentDisabled}
        form={form}
        colon={false}
        layout='vertical'
        onFinish={onSubmit}
      >
        <Form.Item
          name='name'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Name'
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label={t('Description')}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name='notes'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Notes'
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name='defaultUnit'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Unit'
        >
          <Select
            options={[
              {
                value: 'kg',
                label: 'kg'
              }
            ]}
          ></Select>
        </Form.Item>
        <label>Properties</label>
        <Form.List name='properties'>
          {(fields, { add, remove }) => (
            <div>
              {fields.map(field => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: '4px' }}
                  align='baseline'
                >
                  <Form.Item
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: 'Missing name' }]}
                  >
                    <Input placeholder='Name' />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'value']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <InputNumber placeholder='Value' />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'unit']}
                    rules={[{ required: true, message: 'Missing unit' }]}
                  >
                    <Input placeholder='Unit' />
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}
              <Button
                type='dashed'
                onClick={() => add()}
                block
              >
                + Add new property
              </Button>
            </div>
          )}
        </Form.List>
        <Form.Item
          name='quantity'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Quantity'
        >
          <InputNumber placeholder='Quantity' />
        </Form.Item>
        <Form.Item
          name='unitPrice'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='UnitPrice'
        >
          <InputNumber placeholder='UnitPrice' />
        </Form.Item>
        <Form.Item
          name='measureUnit'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='MeasureUnit'
        >
          <Select
            options={[
              {
                value: 'kg',
                label: 'kg'
              }
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          name='content'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Content'
        >
          <TextArea placeholder='Content' rows={4} />
        </Form.Item>
        <Form.Item
          name='supplier'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='Supplier'
        >
          <Select
           onChange={(value: string) => {
             setSelectedSupplier(value);
           }}
           placeholder="select one country"
           optionLabelProp="label"
           options={options} 
          >
          </Select>
          <Form.Item
          noStyle
          shouldUpdate
        >
          {() => (
            <Typography>
              <pre>{JSON.stringify(options)}</pre>
            </Typography>
          )}
        </Form.Item>
        </Form.Item>
        <Form.Item
          name='supplierName'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='supplierName'
        >
          <Input placeholder='supplierName' />
        </Form.Item>
        <Form.Item
          name='address'
          style={{
            maxWidth: '100%',
            margin: '0px 0px 8px 0px',
            padding: '0px 0px'
          }}
          label='address'
        >
          <Input placeholder='address' />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate
        >
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
        <Button
          htmlType='submit'
          type='primary'
          loading={isFetching}
        >
          Save
        </Button>
      </Form>
      </Spin>
    </>
  );
};
export default AddSeedFormDrawer;
