import UseAxiosAuth from '@/utils/axiosClient';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  SelectProps,
  notification
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SupplierResponse } from '../../../supply/models/supplier-models';
import getSuppliersApi from '@/services/Admin/Supply/getSuppliersApi';
import { AxiosInstance } from 'axios';
import { CreateSupplierMapper } from '../../models/seed-models';
import { createSupplyInfoApi } from '@/services/Admin/Seed/createSupplyInfoApi';

const AddSeedSupplyModal = ({
  params
}: {
  params: {
    seedId: string | undefined;
    visible: boolean;
    onCancel: () => void;
  };
}) => {
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

  //Set selection supplier
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');

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
      await createSupplyInfoApi(params.seedId, http, {
        quanlity: value.quantity,
        unitPrice: value.unitPrice,
        measureUnit: value.measureUnit,
        content: value.content,
        supplier: {
          id: value.supplierId,
          name: value.supplierName,
          address: value.address
        }
      }).then(resSupplier => {
        if (resSupplier.data) {
          openNotification('top', t('Create_successfully'), 'success');
          console.log('create staff success', resSupplier.status);
        } else {
          openNotification('top', t('Create_fail'), 'error');
          console.log('create staff fail', resSupplier.status);
        }
      });
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
          title='Nhập thêm giống'
          open={params.visible}
          onCancel={params.onCancel}
          cancelText={t('Cancel')}
          centered={true}
          width={'fit-content'}
        >
          <Form
            form={form}
            colon={false}
            layout='vertical'
            onFinish={onSubmit}
          >
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
              <TextArea
                placeholder='Content'
                rows={4}
              />
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
                // onChange={(value: string) => {
                //   setSelectedSupplier(value);
                // }}
                placeholder='select one country'
                optionLabelProp='label'
                options={options}
                value={selectedSupplier}
              ></Select>
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
            <Button
              htmlType='submit'
              type='primary'
            >
              Save
            </Button>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};
export default AddSeedSupplyModal;