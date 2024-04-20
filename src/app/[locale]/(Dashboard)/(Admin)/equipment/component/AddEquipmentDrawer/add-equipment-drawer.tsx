/* eslint-disable jsx-a11y/alt-text */
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
  Image,
  GetProp,
  UploadProps,
  UploadFile,
  Upload,
  DatePicker,
  DatePickerProps
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
  BarsOutlined,
  PlusOutlined,
  CalendarOutlined
} from '@ant-design/icons';

import { useSession } from 'next-auth/react';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { AxiosInstance } from 'axios';

import { UploadFileApi } from '@/services/Admin/Media/uploadFileApi';
import { SupplierResponse } from '../../../(supply)/models/supplier-models';
import getSupplierDetailApi from '@/services/Admin/Supply/getSupplierDetails';
import { createEquipmentApi } from '@/services/Admin/Equipment/createEquipmentApi';
import { CreateAllInfoOfEquipmentMapperDto, Equipment } from '../../models/equipment-models';
import { createSupplyInfoApi } from '@/services/Admin/Equipment/createSuppyInfoApi';
import getSuppliersApi from '@/services/Admin/Supply/getSuppliersApi';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const AddEquipmentFormDrawer: React.FC = () => {
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
    price: 0,
    content: '',
    supplierId: '', // Default value for supplierId field
    supplierName: '',
    address: '',
    validFrom: '',
    validTo: ''
  };

  const dateFormat = 'DD/MM/YYYY';
    //handle change date picker
    const handleChangeValidFrom: DatePickerProps['onChange'] = (date, dateString) => {
    };
    const handleChangeValidTo: DatePickerProps['onChange'] = (date, dateString) => {
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState<UploadFile>();
  const [url, setUrl] = useState<string>();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ file: newFile }) => setFile(newFile);

  const uploadButton = (
    <button
      style={{ border: 0, background: 'none' }}
      type='button'
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </button>
  );

  const [createdEquipment, setCreatedEquipment] = useState<Equipment>();

  const onSubmit = async (value: CreateAllInfoOfEquipmentMapperDto) => {
    try {
      const formData = new FormData();
      formData?.append('file', file?.originFileObj as FileType);
      await UploadFileApi(http, formData).then(async res => {
        let data = res.data;
        setUrl(data);
        await createEquipmentApi(http, {
          name: value.name,
          description: value.description,
          notes: data
        }).then(async res => {
          const equipmentNew = res?.data as Equipment;
            await createSupplyInfoApi(equipmentNew.id, http, {
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
              if (res.data && resSupplier.data) {
                openNotification('top', t('Create_successfully'), 'success');
                console.log('create success', res.status);
              } else {
                openNotification('top', t('Create_fail') + res?.message, 'error');
                console.log('create fail', res.status);
              }
              form.resetFields();
            });
            form.resetFields();
        });
      });
    } catch (error) {
      openNotification('top', t('Create_fail'), 'error');
      console.error('Error occurred while updating equipment:', error);
    }
  };

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
          <Flex
            gap={16}
            style={{ width: '100%' }}
          >
            <Flex
              vertical
              style={{ width: '70%' }}
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
            </Flex>
            <Flex style={{ width: '30%' }}>
              <Upload
                listType='picture-card'
                onPreview={handlePreview}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                + Tải ảnh lên
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: visible => setPreviewOpen(visible),
                    afterOpenChange: visible => !visible && setPreviewImage('')
                  }}
                  src={previewImage}
                />
              )}
            </Flex>
          </Flex>

          <Form.Item
            name='description'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 19 }}
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
            hidden
            name='notes'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 19 }}
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
            name='content'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 19 }}
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 19 }}
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 19 }}
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
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 19 }}
            label={
              <>
                <FormOutlined style={{ marginRight: '0.5rem' }} />
                {t('Address')}
              </>
            }
          >
            <Input placeholder={t('Type_data')} />
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
export default AddEquipmentFormDrawer;
