/* eslint-disable react-hooks/exhaustive-deps */
import UseAxiosAuth from '@/utils/axiosClient';
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  SelectProps,
  Typography,
  notification
} from 'antd';
import {
  BorderlessTableOutlined,
  CloseOutlined,
  DownCircleOutlined,
  FormOutlined,
  FileOutlined,
  BarsOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SupplierResponse } from '../../../(supply)/models/supplier-models';
import getSuppliersApi from '@/services/Admin/Supply/getSuppliersApi';
import { AxiosInstance } from 'axios';

import classNames from 'classnames/bind';
import stylesEquipmentManagement from '../../equipmentStyle.module.scss'
import getSupplierDetailApi from '@/services/Admin/Supply/getSupplierDetails';
import { CreateSupplierMapper } from '../../models/equipment-models';
import { createSupplyInfoApi } from '@/services/Admin/Equipment/createSuppyInfoApi';


const AddEquipmentSupplyModal = ({
  params
}: {
  params: {
    equipmentId: string | undefined;
    visible: boolean;
    onCancel: () => void;
  };
}) => {
  const styleEquipmentManagement = classNames.bind(stylesEquipmentManagement);

  const { data: session } = useSession();
  const siteId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();
  const tM = useTranslations('Message');
  const t = useTranslations('Common');
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const openNotification = (
    placement: NotificationPlacement,
    status: string,
    type: 'success' | 'error'
  ) => {
    api[type]({
      message: `Admin ${status}`,
      placement,
      duration: 2
    });
  };

  const dateFormat = 'DD/MM/YYYY';
  //handle change date picker
  const handleChangeValidFrom: DatePickerProps['onChange'] = (date, dateString) => {
  };
  const handleChangeValidTo: DatePickerProps['onChange'] = (date, dateString) => {
  };

  const initialFormValues = {
    price: 0,
    content: '',
    supplierId: '', // Default value for supplierId field
    supplierName: '',
    address: '',
    validFrom: '',
    validTo: ''
  };

  //Set selection supplier
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');

  const onSelectSupplier = async (value: string) => {
    setSelectedSupplierId(value);
    try {
      await getSupplierDetailApi(value, http).then(res => {
        let selected = res?.data as SupplierResponse
        form.setFieldValue('supplierName', selected?.name);
        form.setFieldValue('address', selected?.address);
      });
    } catch (error) {
      console.error('Error occurred while get details supplier:', error);
    }
  };

  useEffect(() => {
    getListSupplier(http);
  }, [http]);

  //get list suppliers
  const getListSupplier = async (http: AxiosInstance) => {
    try {
      await getSuppliersApi(http).then(res => {
        console.log('supplier: ', res?.data);
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
  };

  const onSubmit = async (value: CreateSupplierMapper) => {
    try {
      await createSupplyInfoApi(params.equipmentId, http, {
        price: value.price,
        content: value.content,
        supplier: {
          id: value.supplierId,
          name: value.supplierName,
          address: value.address
        },
        validFrom: value.validFrom,
        validTo: value.validTo
      }).then(resSupplier => {
        if (resSupplier.data) {
          openNotification('top', t('Create_successfully'), 'success');
          console.log('create staff success', resSupplier.status);
          form.resetFields();
        } else {
          openNotification('top', t('Create_fail'), 'error');
          console.log('create staff fail', resSupplier.status);
        }
      });
      params.onCancel();
    } catch (error) {
      console.error('Error occurred while updating season:', error);
    }
  };

  return (
    <>
      {contextHolder}
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
        <Modal
          title='Thêm thiết bị'
          open={params.visible}
          onCancel={params.onCancel}
          cancelText={t('Cancel')}
          centered={true}
          width={'50%'}
          footer={null}
          className= {styleEquipmentManagement('add-supply-modal')}
        >
          <Form
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
                name='price'
                style={{
                  maxWidth: '100%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 0px'
                }}
                label={
                  <>
                    <BorderlessTableOutlined style={{ marginRight: '0.5rem' }} />{' '}
                    Giá thuê
                  </>
                }
              >
                <InputNumber placeholder={t('Type_data')} />
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
              placeholder= {t('Select_value')}
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
              <Input placeholder={t('Type_data')} />
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
                  <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Address')} 
                </>
              }
            >
              <Input placeholder={t('Type_data')} />
            </Form.Item>

            <Form.Item
              style={{
                maxWidth: '100%',
                margin: '0px 0px 8px 0px',
                padding: '0px 0px'
              }}
              name='validFrom'
              label={<><CalendarOutlined style={{ marginRight: '0.5rem' }}/>Ngày thuê</>}
              rules={[{ required: true, message: 'Vui lòng nhập ngày thuê!' }]} 
            >
                <DatePicker onChange={handleChangeValidFrom} format={dateFormat}/>
             
            </Form.Item>
            <Form.Item
              style={{
                maxWidth: '100%',
                margin: '0px 0px 8px 0px',
                padding: '0px 0px'
              }}
              name='validTo'
              label={<><CalendarOutlined style={{ marginRight: '0.5rem' }}/>Ngày trả</>}
              rules={[{ required: true, message: 'Vui lòng nhập ngày trả!' }]} 
            >
                <DatePicker onChange={handleChangeValidTo} format={dateFormat}/>
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
              icon={<FileOutlined />}
            >
              {t('Save')}
            </Button>
          </Flex>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};
export default AddEquipmentSupplyModal;