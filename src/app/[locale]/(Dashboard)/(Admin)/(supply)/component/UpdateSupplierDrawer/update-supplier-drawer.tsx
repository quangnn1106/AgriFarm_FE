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
  Tooltip,
  Select,
  Flex
} from 'antd';
import {
  BorderlessTableOutlined,
  CloseOutlined,
  DownCircleOutlined,
  FormOutlined,
  FileOutlined,
  BarsOutlined,
  PlusOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  AimOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { constants } from 'buffer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Axios, AxiosInstance } from 'axios';
import { STATUS_OK } from '@/constants/https';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import classNames from 'classnames/bind';
import styles from '../../../adminStyle.module.scss';
import { SupplierResponse, UpdateSupplierDto } from '../../models/supplier-models';
import getSupplierDetailApi from '@/services/Admin/Supply/getSupplierDetails';
import { updateSupplierApi } from '@/services/Admin/Supply/updateSupplierApi';

const UpdateSupplierDrawer = ({
  params
}: {
  params: {
    supplierId: string;
  };
}) => {
  const cx = classNames.bind(styles);

  const t = useTranslations('Common');
  const tM = useTranslations('Message');

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  const http = UseAxiosAuth();
  const [supplierDetail, setSupplierDetail] = useState<SupplierResponse>();

  const getSupplierDetailData = async (
    http: AxiosInstance,
    supplierId?: string,
    form?: FormInstance
  ) => {
    try {
      const responseData = await getSupplierDetailApi(supplierId as string, http);
      if (responseData?.status === STATUS_OK) {
        setSupplierDetail(responseData?.data as SupplierResponse);
        console.log('Data', supplierDetail);
        form?.setFieldsValue({
          ...responseData?.data
        });
        console.log(form?.getFieldsValue);
      }
      setIsFetching(false);
    } catch (error) {
      console.log('Error: :  ', error);
    }
  };

  const [api, contextHolder] = notification.useNotification();
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

  const onFinish = async (props: UpdateSupplierDto) => {
    console.log(props);
    setIsFetching(true);
    try {
      await updateSupplierApi(params.supplierId, http, props).then(resProps => {
            if (resProps.data) {
              setIsFetching(false);
              openNotification('top', `${tM('update_susses')}`, 'success');

              console.log('update staff success', resProps.status);
            } else {
              openNotification('top', `${tM('update_error')}`, 'error');

              console.log('update staff fail', resProps.status);
            }
          });
    } catch (error) {
      console.log('Error: :  ', error);
    }
  };

  //handle update supply
  const [showAddSupply, setShowAddSupply] = useState(false);
  const showAddSupplyModal = () => {
    setShowAddSupply(true);
  };

  useEffect(() => {
    getSupplierDetailData(http, params.supplierId, form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [http, params.supplierId, form, showAddSupply]);

  return (
    <>
      {contextHolder}
      <Spin spinning={isFetching}>
        <Form
          disabled={!componentDisabled}
          form={form}
          colon={false}
          layout={'horizontal'}
          labelCol={{ span: 10 }}
          labelWrap
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          style={{ paddingTop: '1rem' }}
          size='middle'
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
          >
            <Input placeholder={t('Type_data')} />
          </Form.Item>
          <Form.Item
            name='email'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <MailOutlined style={{ marginRight: '0.5rem' }} /> Email
              </>
            }
          >
            <Input placeholder={t('Type_data')} />
          </Form.Item>
          <Form.Item
            name='phone'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <PhoneOutlined style={{ marginRight: '0.5rem' }} /> Số điện thoại
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
                <EnvironmentOutlined style={{ marginRight: '0.5rem' }} /> {t('Address')}
              </>
            }
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
                <FormOutlined style={{ marginRight: '0.5rem' }} /> {t('Description')}{' '}
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
          <Flex
            style={{ width: '100%' }}
            justify='end'
          >
            <Button
              htmlType='submit'
              type='primary'
              loading={isFetching}
              icon={<FileOutlined />}
              className='bg-btn'
            >
              {t('Save')}
            </Button>
          </Flex>
        </Form>
      </Spin>
    </>
  );
};
export default UpdateSupplierDrawer;
