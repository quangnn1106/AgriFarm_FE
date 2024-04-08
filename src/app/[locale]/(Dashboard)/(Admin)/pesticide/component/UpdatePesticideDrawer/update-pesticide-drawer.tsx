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
  Image
} from 'antd';
import {
  BorderlessTableOutlined,
  CloseOutlined,
  DownCircleOutlined,
  FormOutlined,
  FileOutlined,
  BarsOutlined,
  PlusOutlined,
  HomeOutlined
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
import { Pesticide } from '../../models/pesticide-models';
import getPesticideDetailApi from '@/services/Admin/Pesticide/getPesticideDetailApi';
import {
  updatePesticideApi,
  updatePesticidePropertyApi
} from '@/services/Admin/Pesticide/updatePesticideApi';
import AddPesticideSupplyModal from '../UpdatePesticideSupplyModal/add-supply-modal';

const UpdatePesticideFormDrawer = ({
  params
}: {
  params: {
    pesticideId: string;
  };
}) => {
  const cx = classNames.bind(styles);

  const t = useTranslations('Common');
  const p = useTranslations('Pesticide');
  const tM = useTranslations('Message');

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [formInfoCommon] = Form.useForm();
  const http = UseAxiosAuth();
  const [pesticideDetail, setPesticideDetail] = useState<Pesticide>();

  const getPesticideDetailData = async (
    http: AxiosInstance,
    pesticideId?: string,
    formInfoCommon?: FormInstance
  ) => {
    try {
      const responseData = await getPesticideDetailApi(pesticideId, http);
      if (responseData?.status === STATUS_OK) {
        setPesticideDetail(responseData?.data as Pesticide);
        console.log('Data', pesticideDetail);
        formInfoCommon?.setFieldsValue({
          ...responseData?.data
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

  const onFinish = async (props: Pesticide) => {
    console.log(props);
    setIsFetching(true);
    try {
      await updatePesticideApi(params.pesticideId, http, {
        name: props.name,
        description: props.description,
        notes: props.notes
      }).then(async res => {
        await updatePesticidePropertyApi(params.pesticideId, http, props.properties)
          .then(resProps => {
            if (resProps.data && res.data) {
              openNotification('top', `${tM('update_susses')}`, 'success');
              setIsFetching(false);
              console.log('update staff success', resProps.status);
            } else {
              openNotification('top', `${tM('update_error')}`, 'error');
              setIsFetching(false);
              console.log('update staff fail', resProps.status);
            }
          })
          .finally(() => {});
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
    getPesticideDetailData(http, params.pesticideId, formInfoCommon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [http, params.pesticideId, formInfoCommon, showAddSupply]);

  return (
    <>
      {contextHolder}
      <Spin spinning={isFetching}>
        <Tooltip title={p('Add_more_pesticide')}>
          <Button
            size='middle'
            className={cx('bg-btn')}
            icon={<PlusOutlined />}
            onClick={showAddSupplyModal}
          >
            {p('Add_more_pesticide')}
          </Button>
        </Tooltip>
        <AddPesticideSupplyModal
          params={{
            pesticideId: params.pesticideId,
            visible: showAddSupply,
            onCancel: () => {
              setShowAddSupply(false);
            }
          }}
        ></AddPesticideSupplyModal>
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
                  addonAfter='chai'
                ></InputNumber>
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
                    <DownCircleOutlined style={{ marginRight: '0.5rem' }} /> {t('Measure_Unit')}
                  </>
                }
              >
                <Select
                  size={'middle'}
                  options={[
                    {
                      value: 'chai',
                      label: 'chai'
                    }
                  ]}
                  placeholder={t('Select_value')}
                ></Select>
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
                <BorderlessTableOutlined style={{ marginRight: '0.5rem' }} /> {t('Unit_Price')}
              </>
            }
          >
            <InputNumber addonAfter='VND'></InputNumber>
          </Form.Item>
            </Flex>
            <Flex style={{ width: '30%' }}>
            <Image
              style={{ borderRadius: '10px' }}
              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
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
                      style={{ display: 'flex', marginBottom: '4px' }}
                      align='baseline'
                      title={t('Properties')}
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
          <Form.Item
            noStyle
            shouldUpdate
          >
            {() => (
              <Typography>
                <pre>{JSON.stringify(formInfoCommon.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
export default UpdatePesticideFormDrawer;
