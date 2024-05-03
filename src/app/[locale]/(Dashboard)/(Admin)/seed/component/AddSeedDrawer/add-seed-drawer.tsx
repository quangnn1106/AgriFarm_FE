/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
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
  SelectProps,
  Flex,
  AutoComplete
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { constants } from 'buffer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  BorderlessTableOutlined,
  CloseOutlined,
  DownCircleOutlined,
  FormOutlined,
  FileOutlined,
  BarsOutlined
} from '@ant-design/icons';
import { CreateAllInfoOfSeedDto, CreateSeedDto, Seed } from '../../models/seed-models';
import { createSeedApi } from '@/services/Admin/Seed/createSeedApi';
import { useSession } from 'next-auth/react';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { SupplierResponse } from '../../../(supply)/models/supplier-models';
import getSuppliersApi from '@/services/Admin/Supply/getSuppliersApi';
import { AxiosInstance } from 'axios';
import { createSupplyInfoApi } from '@/services/Admin/Seed/createSupplyInfoApi';
import getSupplierDetailApi from '@/services/Admin/Supply/getSupplierDetails';
import { useDebounceSearch } from '@/utils/debounceSearch';

const AddSeedFormDrawer: React.FC = () => {
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

  const initialFormValues = {
    name: '',
    description: '',
    notes: '',
    defaultUnit: 'kg',
    properties: [{ name: '', value: 0, unit: '' }], // Default value for the properties field
    quantity: 0,
    unitPrice: 0,
    measureUnit: 'kg',
    content: '',
    supplierId: '', // Default value for supplierId field
    supplierName: '',
    address: ''
  };

  //Set selection supplier
  const [listSupplier, setListSupplier] = useState<SupplierResponse[]>([]);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');

  const onSelectSupplier = async (value: string) => {
    setSelectedSupplierId(value);
    try {
      await getSupplierDetailApi(value, http).then(res => {
        let selected = res?.data as SupplierResponse;
        form.setFieldValue('supplierId', selected?.id);
        form.setFieldValue('supplierName', selected?.name);
        form.setFieldValue('address', selected?.address);
      });
    } catch (error) {
      console.error('Error occurred while get details supplier:', error);
    }
  };

  useEffect(() => {
    getListSupplier(http);
  }, [http, isFetching]);

  //get list suppliers
  const getListSupplier = async (http: AxiosInstance) => {
    try {
      await getSuppliersApi(http).then(res => {
        console.log('supplier: ', res?.data);
        setListSupplier(res?.data as SupplierResponse[]);
        setSupplierOptions(res?.data as SupplierResponse[]);
      });
    } catch (error) {
      console.error('Error occurred while get list supplier:', error);
    }
  };

  const setSupplierOptions = (suppliers: SupplierResponse[] | undefined) => {
    const updatedOptions: SelectProps['options'] = [];
    suppliers?.map((item, idx) => {
      updatedOptions?.push({
        value: item.id,
        label: item.name
      });
    });
    setOptions(updatedOptions);
    console.log('Options: ', options);
    setIsFetching(false);
  };

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
        const seedNew = res?.data as Seed;
        // setCreatedSeed(res.data as Seed);
        if (
          form.getFieldValue('quantity') > 0 &&
          form.getFieldValue('quantity') < 10000
        ) {
          await createSupplyInfoApi(seedNew.id, http, {
            quantity: value.quantity,
            unitPrice: value.unitPrice,
            measureUnit: value.measureUnit,
            content: value.content,
            supplier: {
              id: value.supplierId,
              name: value.supplierName,
              address: value.address
            }
          }).then(resSupplier => {
            if (res.data && resSupplier.data) {
              openNotification('top', t('Create_successfully'), 'success');
              console.log('create success', res.status);
            } else {
              openNotification('top', t('Create_fail') + res?.message, 'error');
              console.log('create fail', res.status);
            }
            form.resetFields();
          });
        } else {
          if (res.data) {
            openNotification('top', t('Create_successfully'), 'success');
            console.log('create success', res.status);
          } else {
            openNotification('top', t('Create_fail') + res?.message, 'error');
            console.log('create fail', res.status);
          }
          form.resetFields();
        }
      });
    } catch (error) {
      openNotification('top', t('Create_fail'), 'error');
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
          onFinish={onSubmit}
          layout={'horizontal'}
          labelCol={{ span: 10 }}
          labelWrap
          wrapperCol={{ span: 18 }}
          initialValues={initialFormValues}
        >
          <Form.Item
            name='name'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Name')}
              </>
            }
            rules={[{ required: true, message: t('Please_enter_data') }]}
          >
            <Input placeholder={t('Type_data')} />
          </Form.Item>
          <Form.Item
            name='description'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Description')}
              </>
            }
          >
            <TextArea
              autoSize={{ minRows: 1, maxRows: 6 }}
              placeholder={t('Type_data')}
            />
          </Form.Item>
          <Form.Item
            name='notes'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Notes')}
              </>
            }
          >
            <TextArea
              autoSize={{ minRows: 1, maxRows: 6 }}
              placeholder={t('Type_data')}
            />
          </Form.Item>
          <Form.Item
            name='defaultUnit'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <DownCircleOutlined style={{ marginRight: '0.5rem' }} /> Unit
              </>
            }
          >
            <Select
              size={'middle'}
              options={[
                {
                  value: 'kg',
                  label: 'kg'
                }
              ]}
              placeholder={t('Select_value')}
            ></Select>
          </Form.Item>
          <Flex
            gap={'0.5rem'}
            vertical
            style={{ paddingBottom: '1rem' }}
          >
            <label>
              <BarsOutlined style={{ marginRight: '0.5rem' }} />
              {t('Properties')}
            </label>
            <Form.List name='properties'>
              {(fields, { add, remove }) => (
                <div>
                  {fields.map(field => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: '0.5rem' }}
                      align='baseline'
                    >
                      <Form.Item name={[field.name, 'name']}>
                        <Input placeholder={t('Name')} />
                      </Form.Item>
                      <Form.Item name={[field.name, 'value']}>
                        <InputNumber placeholder={t('Value')} />
                      </Form.Item>
                      <Form.Item name={[field.name, 'unit']}>
                        <Input placeholder={t('Unit')} />
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button
                    size='middle'
                    type='dashed'
                    onClick={() => add()}
                    block
                  >
                    {t('add_new_property')}
                  </Button>
                </div>
              )}
            </Form.List>
          </Flex>
          <Form.Item
            name='quantity'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <BorderlessTableOutlined style={{ marginRight: '0.5rem' }} />{' '}
                {t('Quantity')}
              </>
            }
          >
            <InputNumber placeholder={t('Quantity')} />
          </Form.Item>
          <Form.Item
            name='unitPrice'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <BorderlessTableOutlined style={{ marginRight: '0.5rem' }} />{' '}
                {t('Unit_Price')}
              </>
            }
          >
            <InputNumber placeholder={t('Unit_Price')} />
          </Form.Item>
          <Form.Item
            name='measureUnit'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <DownCircleOutlined style={{ marginRight: '0.5rem' }} />{' '}
                {t('Measure_Unit')}
              </>
            }
          >
            <Select
              size='middle'
              placeholder={t('Select_value')}
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
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Content')}
              </>
            }
          >
            <TextArea
              autoSize={{ minRows: 1, maxRows: 6 }}
              placeholder={t('Type_data')}
            />
          </Form.Item>
          <Form.Item
            hidden
            name='supplierId'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <DownCircleOutlined style={{ marginRight: '0.5rem' }} /> {t('Supplier')}
              </>
            }
          >
            <Select
              onChange={onSelectSupplier}
              showSearch
              optionFilterProp='label'
              filterOption={(input, option) =>
                (option?.label?.toString().toLowerCase() ?? '').includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label?.toString() ?? '')
                  .toLowerCase()
                  .localeCompare(
                    (optionB?.label?.toString().toLowerCase() ?? '').toLowerCase()
                  )
              }
              placeholder={t('Select_value')}
              optionLabelProp='label'
              options={options}
              value={selectedSupplierId}
              size={'middle'}
            ></Select>
          </Form.Item>
          <Form.Item
            name='supplierName'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Supplier_Name')}
              </>
            }
          >
            {/* <Input placeholder={t('Type_data')} /> */}
            <AutoComplete
              onSelect={onSelectSupplier}
              showSearch
              optionFilterProp='label'
              filterOption={(input, option) =>
                (option?.label?.toString().toLowerCase() ?? '').includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label?.toString() ?? '')
                  .toLowerCase()
                  .localeCompare(
                    (optionB?.label?.toString().toLowerCase() ?? '').toLowerCase()
                  )
              }
              placeholder={t('Select_value')}
              options={options}
              value={selectedSupplierId}
            ></AutoComplete>
          </Form.Item>
          <Form.Item
            name='address'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} />
                {t('Address')}
              </>
            }
          >
            <TextArea
              autoSize={{ minRows: 1, maxRows: 4 }}
              placeholder={t('Type_data')}
            />
          </Form.Item>

          {/* <Form.Item
            noStyle
            shouldUpdate
          >
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item> */}
          <Flex
            style={{ width: '100%' }}
            justify='end'
          >
            <Button
              htmlType='submit'
              type='primary'
              loading={isFetching}
              icon={<FileOutlined />}
            >
              {t('Save')}
            </Button>
          </Flex>
        </Form>
      </Spin>
    </>
  );
};
export default AddSeedFormDrawer;
