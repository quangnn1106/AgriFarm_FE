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
  notification
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { constants } from 'buffer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Axios, AxiosInstance } from 'axios';
import getSeedDetailApi from '@/services/Admin/Seed/getSeedDetailApi';
import { STATUS_OK } from '@/constants/https';
import { Property, Seed, UpdateSeedDto } from '../../models/seed-models';
import { updateSeedApi, updateSeedPropertyApi } from '@/services/Admin/Seed/updateSeedApi';
import { NotificationPlacement } from 'antd/es/notification/interface';

const SeedDetailFormDrawer = ({
  params
}: {
  params: {
    seedId: string;
  };
}) => {
  const t = useTranslations('Common');
  const tM = useTranslations('Message');

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  

  const http = UseAxiosAuth();

  const [seedDetail, setSeedDetail] = useState<Seed>();
  const [updatedSeed, setUpdateSeed] = useState<UpdateSeedDto>()
  const [updatedSeedProps, setUpdateSeedProps] = useState<Property[]>([])

  useEffect(() => {
    getSeedDetailData(http, params.seedId, form)
  }, [http, params.seedId, form]);

  const getSeedDetailData = async (
    http: AxiosInstance,
    seedId?: string,
    form?: FormInstance
  ) => {
    try {
      const responseData = await getSeedDetailApi(seedId, http);
      if (responseData?.status === STATUS_OK) {
        setSeedDetail(responseData?.data as Seed);

        console.log(responseData.data);
        //form
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

  
  const onFinish = async(value : Seed) => {
    setIsFetching(true);
    try {
      setUpdateSeed({
        name: value?.name,
        description: value?.description,
        notes: value?.notes
      });

      setUpdateSeedProps(value?.properties);

      console.log(updatedSeed);

      const res = await updateSeedApi(params.seedId, http, updatedSeed);
      const resProps = await updateSeedPropertyApi(params.seedId, http, updatedSeedProps);
      if (res.data && resProps.data) {
        setIsFetching(false);
        openNotification('top', `${tM('update_susses')}`, 'success');
        
        console.log('update staff success', res.status);
      } else {
        openNotification('top', `${tM('update_error')}`, 'error');

        console.log('update staff fail', res.status);
      }
    } catch (error) {
      console.log('Error: :  ', error);
    }
  };

  const InputUnit = (
    <Form.Item
      name='measureUnit'
      style={{
        maxWidth: '100%',
        margin: '0px 0px 8px 0px',
        padding: '0px 0px'
      }}
      label='Unit'
    >
      <Input />
    </Form.Item>
  );

  return (
    <>
      <Spin spinning={isFetching}>
        <Form
          disabled={!componentDisabled}
          form={form}
          colon={false}
          layout='vertical'
          onFinish={onFinish}
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
            name='stock'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label='Stock'
          >
            <InputNumber addonAfter={InputUnit}></InputNumber>
          </Form.Item>
          <Form.Item
            name='unitPrice'
            style={{
              maxWidth: '100%',
              margin: '0px 0px 8px 0px',
              padding: '0px 0px'
            }}
            label='Unit Price'
          >
            <InputNumber addonAfter='VND'></InputNumber>
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
                    title='Properties'
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
          {/* <Button
            htmlType='submit'
            type='primary'
            loading={isFetching}
          >
            Save
          </Button> */}
        </Form>
      </Spin>
    </>
  );
};
export default SeedDetailFormDrawer;
