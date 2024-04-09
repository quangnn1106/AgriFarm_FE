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
  HomeOutlined
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { constants } from 'buffer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Axios, AxiosInstance } from 'axios';
import getSeedDetailApi from '@/services/Admin/Seed/getSeedDetailApi';
import { STATUS_OK } from '@/constants/https';
import { CreateSeedDto, Property, Seed, UpdateSeedDto } from '../../models/seed-models';
import {
  updateSeedApi,
  updateSeedPropertyApi
} from '@/services/Admin/Seed/updateSeedApi';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import classNames from 'classnames/bind';
import styles from '../../../adminStyle.module.scss';

import AddSeedSupplyModal from '../UpdateSeedSupplyModal/add-supply-modal';

const UpdateSeedFormDrawer = ({
  params
}: {
  params: {
    seedId: string;
  };
}) => {
  const cx = classNames.bind(styles);

  const t = useTranslations('Common');
  const tM = useTranslations('Message');

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [formInfoCommon] = Form.useForm();
  const http = UseAxiosAuth();
  const [seedDetail, setSeedDetail] = useState<Seed>();

  const getSeedDetailData = async (
    http: AxiosInstance,
    seedId?: string,
    formInfoCommon?: FormInstance
  ) => {
    try {
      const responseData = await getSeedDetailApi(seedId, http);
      if (responseData?.status === STATUS_OK) {
        setSeedDetail(responseData?.data as Seed);
        console.log('Data', seedDetail);
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

  const onFinish = async (props: Seed) => {
    console.log(props);
    setIsFetching(true);
    try {
      await updateSeedApi(params.seedId, http, {
        name: props.name,
        description: props.description,
        notes: props.notes
      }).then(async res => {
        await updateSeedPropertyApi(params.seedId, http, props.properties)
          .then(resProps => {
            if (resProps.data && res.data) {
              setIsFetching(false);
              openNotification('top', `${tM('update_susses')}`, 'success');

              console.log('update staff success', resProps.status);
            } else {
              openNotification('top', `${tM('update_error')}`, 'error');

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
    getSeedDetailData(http, params.seedId, formInfoCommon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [http, params.seedId, formInfoCommon, showAddSupply]);

  return (
    <>
      {contextHolder}
      <Spin spinning={isFetching}>
        <Tooltip title='Add More Supply'>
          <Button
            size='middle'
            className={cx('bg-btn')}
            icon={<PlusOutlined />}
            onClick={showAddSupplyModal}
          >
            Nhập thêm giống
          </Button>
        </Tooltip>
        <AddSeedSupplyModal
          params={{
            seedId: params.seedId,
            visible: showAddSupply,
            onCancel: () => {
              setShowAddSupply(false);
            }
          }}
        ></AddSeedSupplyModal>
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
              addonAfter='kg'
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
                  value: 'kg',
                  label: 'kg'
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
        </Form>
      </Spin>
    </>
  );
};
export default UpdateSeedFormDrawer;
