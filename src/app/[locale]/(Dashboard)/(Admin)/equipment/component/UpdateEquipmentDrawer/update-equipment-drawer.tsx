/* eslint-disable jsx-a11y/alt-text */
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
  Flex,
  Image,
  DatePicker,
  DatePickerProps
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
  CalendarOutlined
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
import getEquipmentDetailApi from '@/services/Admin/Equipment/getEquipmentDetailApi';
import { Equipment } from '../../models/equipment-models';
import { updateEquipmentApi } from '@/services/Admin/Equipment/updateEquipmentApi';
import AddEquipmentSupplyModal from '../UpdateEquipmentSupplyModal/add-supply-modal';
import dayjs from 'dayjs';

const UpdateEquipmentFormDrawer = ({
  params
}: {
  params: {
    equipmentId: string;
  };
}) => {
  const cx = classNames.bind(styles);

  const t = useTranslations('Common');
  const tM = useTranslations('Message');

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [formInfoCommon] = Form.useForm();
  const http = UseAxiosAuth();
  const [equipmentDetail, setEquipmentDetail] = useState<Equipment>();

  const dateFormat = 'YYYY/MM/DD';
  //handle change date picker
  const handleChangeExpiredIn: DatePickerProps['onChange'] = (date, dateString) => {
  };

  const getEquipmentDetailData = async (
    http: AxiosInstance,
    equipmentId?: string,
    formInfoCommon?: FormInstance
  ) => {
    try {
      const responseData = await getEquipmentDetailApi(equipmentId, http);
      if (responseData?.status === STATUS_OK) {
        setEquipmentDetail(responseData?.data as Equipment);
        console.log('Data', equipmentDetail);
        formInfoCommon?.setFieldsValue({
          ...responseData?.data,
          expiredIn: equipmentDetail?.expiredIn ? dayjs(`${equipmentDetail?.expiredIn}`, dateFormat): ''
        });
        console.log(formInfoCommon?.getFieldsValue);
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

  const onFinish = async (props: Equipment) => {
    console.log(props);
    setIsFetching(true);
    try {
      await updateEquipmentApi(params.equipmentId, http, {
        name: props.name,
        description: props.description,
        unitPrice: props.unitPrice,
        notes: props.notes
      });
      setIsFetching(false);
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
    getEquipmentDetailData(http, params.equipmentId, formInfoCommon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [http, params.equipmentId, formInfoCommon, showAddSupply]);

  return (
    <>
      {contextHolder}
      <Spin spinning={isFetching}>
        <Tooltip title='Thêm thiết bị'>
          <Button
            size='middle'
            className={cx('bg-btn')}
            icon={<PlusOutlined />}
            onClick={showAddSupplyModal}
          >
           Thêm thiết bị
          </Button>
        </Tooltip>
        <AddEquipmentSupplyModal
          params={{
            equipmentId: params.equipmentId,
            visible: showAddSupply,
            onCancel: () => {
              setShowAddSupply(false);
            }
          }}
        ></AddEquipmentSupplyModal>
        <Form
          disabled={!componentDisabled}
          form={formInfoCommon}
          colon={false}
          layout={'horizontal'}
          labelCol={{ span: 10 }}
          labelWrap
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          style={{ paddingTop: '1rem' }}
          size='middle'
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
              >
                <Input placeholder={t('Type_data')} />
              </Form.Item>
              <Form.Item
                name='stock'
                style={{
                  maxWidth: '100%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 0px'
                }}
                label={
                  <>
                    <HomeOutlined style={{ marginRight: '0.5rem' }} /> {t('Stock')}
                  </>
                }
              >
                <InputNumber
                  className='stock-input'
                  addonAfter='cái'
                ></InputNumber>
              </Form.Item>
              <Form.Item
                name='inUse'
                style={{
                  maxWidth: '100%',
                  margin: '0px 0px 8px 0px',
                  padding: '0px 0px'
                }}
                label={
                  <>
                    <HomeOutlined style={{ marginRight: '0.5rem' }} /> Đang được sử dụng
                  </>
                }
              >
                <InputNumber
                  className='stock-input'
                  addonAfter='cái'
                ></InputNumber>
              </Form.Item>
              <Form.Item
              hidden
            name='unitPrice'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label={
              <>
                <BorderlessTableOutlined style={{ marginRight: '0.5rem' }} /> Giá thuê
              </>
            }
          >
            <InputNumber addonAfter='VND'></InputNumber>
          </Form.Item>
            </Flex>
            <Flex style={{ width: '30%' }}>
            <Image
              style={{ borderRadius: '10px' }}
              src={equipmentDetail?.notes ? 'http://ec2-3-109-154-96.ap-south-1.compute.amazonaws.com/api/v1/files/get?path='+ equipmentDetail?.notes : 'http://ec2-3-109-154-96.ap-south-1.compute.amazonaws.com/api/v1/files/get?path=drafts/d1f1b219-6aa1_638488953544034389.png'}
            />
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
              style={{
                maxWidth: '100%',
                margin: '0px 0px 8px 0px',
                padding: '0px 0px'
              }}
              name='expiredIn'
              label={<><CalendarOutlined style={{ marginRight: '0.5rem' }}/>Ngày hết hạn</>}
              rules={[{ required: true, message: 'Vui lòng nhập ngày trả!' }]} 
            >
                <DatePicker onChange={handleChangeExpiredIn} format={dateFormat}/>
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
          {/* <Form.Item
            noStyle
            shouldUpdate
          >
            {() => (
              <Typography>
                <pre>{JSON.stringify(formInfoCommon.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item> */}
        </Form>
      </Spin>
    </>
  );
};
export default UpdateEquipmentFormDrawer;
